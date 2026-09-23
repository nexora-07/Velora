const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router
  .route("/verify/:email/:verificationToken")
  .get(authController.verifyEmailAddress);
router.route("/forgotpassword").post(authController.forgetPassword);
router
  .route("/resetpassword/:email/:resetToken")
  .get(authController.verifyResetToken)
  .patch(authController.resetPassword);

module.exports = router;
