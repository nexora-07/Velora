const Users = require("../models/User");
const {
  validationUserSignup,
  validationUserLogin,
} = require("../validation/usersValidation");
const signJwt = require("../utils/signJWT");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const signUp = async (req, res, next) => {
  try {
    const validation = validationUserSignup(req.body);

    if (validation.error) {
      throw new AppError(validation?.error.message, 400);
    }

    const { firstname, lastname, email, password } = req.body;

    //check if user already exist

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      throw new AppError("User with email already exist", 400);
    }

    //Hashing of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await Users.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new AppError("Failed to create user", 500);
    }

    //Create and store the verification token before sending email so a mail failure
    //does not leave the account without a token.
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedVerficationToken = await bcrypt.hash(verificationToken, salt);
    user.verification_token = hashedVerficationToken;
    await user.save();

    //Send mail verification

    const options = {
      email: email,
      subject:
        "Welcome to SQI AUGUST Ecommerce platform, where product price get better",
      message:
        "Welcome onboard. We are pleased to have you. Shop Now, get better price.",
    };

    try {
      await sendEmail(options);

      //create verificationUrl

      const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
      const verificationUrl = `${clientUrl}/verify-email/${encodeURIComponent(
        user.email,
      )}/${verificationToken}`;

      //create verification message

      const verificationMessage = `Please click on the verification link to verify your email. \n ${verificationUrl}`;

      const verificationMailOptions = {
        email: email,
        subject: "Verify your email address",
        message: verificationMessage,
      };

      await sendEmail(verificationMailOptions);
    } catch (error) {
      throw new AppError(
        "Account created, but verification email could not be sent. Check the SMTP connection and try again.",
        503,
      );
    }

    const token = signJwt(user._id);

    res.status(201).json({
      status: "succesful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmailAddress = async (req, res, next) => {
  try {
    const { email, verificationToken } = req.params;

    if (!email || !verificationToken) {
      throw new AppError("Please provide email and token", 400);
    }

    //check if email exist

    const user = await Users.findOne({ email });

    if (!user) {
      throw new AppError("User Not Found!", 404);
    }

    const tokenValid = await bcrypt.compare(
      verificationToken,
      user.verification_token,
    );

    if (!tokenValid) {
      throw new AppError("Failed to verify user - Invalid token", 400);
    }

    user.email_verified = true;

    await user.save();

    res.status(201).json({
      status: "successful",
      message: "User verified succesfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Write login controller function, users must have been verified before they can login
const login = async (req, res, next) => {
  try {
    //validate login info
    const validation = validationUserLogin(req.body);

    if (validation.error) {
      throw new AppError(validation?.error.message, 400);
    }

    //collect email and password
    const { email, password } = req.body;

    //check email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("Incorrect email or password", 401);
    }

    if (!user.email_verified) {
      throw new AppError("kindly verify email", 401);
    }

    //check password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    //email verification
    if (!user.email_verified) {
      throw new AppError("Please verify your email before logging in", 403);
    }

    const token = signJwt(user._id);

    res.status(200).json({
      status: "successful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError("Please provide your email", 403);
    }

    const user = await Users.findOne({ email });

    if (!user) {
      throw new AppError("User with this email does not exist", 400);
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    const salt = await bcrypt.genSalt(10);
    const hashedResetToken = await bcrypt.hash(resetToken, salt);
    user.reset_password_token = hashedResetToken;
    user.reset_password_expires = resetTokenExpiry;

    await user.save();

    const resetUrl = `http://localhost:8000/api/v1/auth/resetpassword/${user.email}/${resetToken}`;

    const resetMessage = `Please click on the link below to reset your password. \n ${resetUrl}`;

    const resetMailOptions = {
      email: email,
      subject: "Reset your password",
      message: resetMessage,
    };

    await sendEmail(resetMailOptions);

    res.status(200).json({
      status: "success",
      message: "User found",
    });
  } catch (error) {
    next(error);
  }
};

const verifyResetToken = async (req, res, next) => {
  try {
    const { email, resetToken } = req.params;

    if (!email || !resetToken) {
      throw new AppError("Please provide email and reset token", 400);
    }

    const user = await Users.findOne({ email });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const tokenValid = await bcrypt.compare(
      resetToken,
      user.reset_password_token,
    );

    if (!tokenValid) {
      throw new AppError("Invalid reset token", 400);
    }

    if (user.reset_password_expires < Date.now()) {
      throw new AppError("Reset token has expired", 400);
    }

    res.status(200).json({
      status: "success",
      message: "Reset token is valid",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, resetToken } = req.params;
    const { password } = req.body;

    // Check that email and token were provided
    if (!email || !resetToken) {
      throw new AppError("Please provide email and reset token", 400);
    }

    // Check that a new password was provided
    if (!password) {
      throw new AppError("Please provide a new password", 400);
    }

    // Find the user
    const user = await Users.findOne({ email });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Check if the reset token is valid
    const tokenValid = await bcrypt.compare(
      resetToken,
      user.reset_password_token,
    );

    if (!tokenValid) {
      throw new AppError("Invalid reset token", 400);
    }

    // Check if the token has expired
    if (user.reset_password_expires < Date.now()) {
      throw new AppError("Reset token has expired", 400);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Replace the old password
    user.password = hashedPassword;

    // Remove the reset token so it cannot be used again
    user.reset_password_token = undefined;
    user.reset_password_expires = undefined;

    // Save everything to MongoDB
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
  forgetPassword,
  verifyResetToken,
  resetPassword,
  verifyEmailAddress,
};
