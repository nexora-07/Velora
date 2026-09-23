import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Camera,
  Eye,
  EyeOff,
  LockKeyhole,
  Save,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { token, user, updateUser } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const imageInputRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState({
    firstname: "",
    lastname: "",
    bio: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${apiUrl}/users/profile`, authConfig)
      .then((response) => {
        const fetchedUser = response.data.data.user;
        setProfile(fetchedUser);
        setProfileForm({
          firstname: fetchedUser.firstname || "",
          lastname: fetchedUser.lastname || "",
          bio: fetchedUser.bio || "",
        });
        updateUser(fetchedUser);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "Unable to load profile.",
        );
      })
      .finally(() => setLoading(false));
  }, [apiUrl, token]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((current) => ({ ...current, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((current) => ({ ...current, [name]: value }));
  };

  const togglePasswordVisibility = (fieldName) => {
    setVisiblePasswords((current) => ({
      ...current,
      [fieldName]: !current[fieldName],
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);

    try {
      const response = await axios.patch(
        `${apiUrl}/users/update-profile`,
        profileForm,
        authConfig,
      );
      const updatedUser = response.data.data.user;
      setProfile(updatedUser);
      updateUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to update profile.",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handleImageChange = async (event) => {
    const image = event.target.files?.[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("profile_image", image);
    setUploadingImage(true);

    try {
      const response = await axios.patch(
        `${apiUrl}/users/update-profile-picture`,
        formData,
        authConfig,
      );
      const updatedUser = response.data.data.user;
      setProfile(updatedUser);
      updateUser(updatedUser);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to update profile picture.",
      );
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await axios.patch(
        `${apiUrl}/users/updatepassword`,
        passwordForm,
        authConfig,
      );
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to update password.",
      );
    } finally {
      setSavingPassword(false);
    }
  };

  if (!token) {
    return (
      <main className="profile-page profile-empty">
        <h1>Sign in to view your profile</h1>
        <Link to="/login" className="profile-primary-link">
          Log in
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="profile-page profile-empty">
        <p>Loading your profile...</p>
      </main>
    );
  }

  const currentUser = profile || user || {};
  const initials =
    `${currentUser.firstname?.[0] || ""}${currentUser.lastname?.[0] || ""}`.toUpperCase();

  return (
    <main className="profile-page">
      <div className="profile-shell">
        <div className="profile-intro">
          <p className="profile-eyebrow">YOUR ACCOUNT</p>
          <h1>Profile settings</h1>
          <p>Keep your personal details and account security up to date.</p>
        </div>

        <section className="profile-hero">
          <div className="profile-avatar-large">
            {currentUser.profile_image ? (
              <img src={currentUser.profile_image} alt="Your profile" />
            ) : (
              initials || <UserRound size={44} strokeWidth={1.4} />
            )}
            <button
              type="button"
              className="profile-camera-button"
              onClick={() => imageInputRef.current?.click()}
              disabled={uploadingImage}
              aria-label="Change profile picture"
            >
              <Camera size={17} />
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              hidden
            />
          </div>
          <div>
            <h2>
              {currentUser.firstname || "Your profile"}{" "}
              {currentUser.lastname || ""}
            </h2>
            <p>{currentUser.email}</p>
          </div>
        </section>

        <div className="profile-grid">
          <form className="profile-panel" onSubmit={handleProfileSubmit}>
            <div className="profile-panel-heading">
              <div>
                <p className="profile-eyebrow">PERSONAL DETAILS</p>
                <h2>About you</h2>
              </div>
              <UserRound size={20} />
            </div>

            <div className="profile-fields-two">
              <label>
                First name
                <input
                  name="firstname"
                  value={profileForm.firstname}
                  onChange={handleProfileChange}
                  required
                />
              </label>
              <label>
                Last name
                <input
                  name="lastname"
                  value={profileForm.lastname}
                  onChange={handleProfileChange}
                  required
                />
              </label>
            </div>

            <label>
              Email address
              <input value={currentUser.email || ""} readOnly disabled />
              <span className="profile-field-note">
                Your email is used to identify your account and cannot be
                changed.
              </span>
            </label>

            <label>
              Bio
              <textarea
                name="bio"
                value={profileForm.bio}
                onChange={handleProfileChange}
                rows="5"
                placeholder="Tell us a little about yourself"
              />
            </label>

            <button
              className="profile-submit"
              type="submit"
              disabled={savingProfile}
            >
              <Save size={17} /> {savingProfile ? "Saving..." : "Save profile"}
            </button>
          </form>

          <form className="profile-panel" onSubmit={handlePasswordSubmit}>
            <div className="profile-panel-heading">
              <div>
                <p className="profile-eyebrow">ACCOUNT SECURITY</p>
                <h2>Update password</h2>
              </div>
              <LockKeyhole size={20} />
            </div>

            <label htmlFor="oldPassword">
              Current password
              <span className="password-input-wrap">
                <input
                  id="oldPassword"
                  type={visiblePasswords.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="password-visibility-button"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  aria-label={
                    visiblePasswords.oldPassword
                      ? "Hide current password"
                      : "Show current password"
                  }
                >
                  {visiblePasswords.oldPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </span>
            </label>
            <label htmlFor="newPassword">
              New password
              <span className="password-input-wrap">
                <input
                  id="newPassword"
                  type={visiblePasswords.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  minLength="8"
                  required
                />
                <button
                  type="button"
                  className="password-visibility-button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  aria-label={
                    visiblePasswords.newPassword
                      ? "Hide new password"
                      : "Show new password"
                  }
                >
                  {visiblePasswords.newPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </span>
            </label>
            <label htmlFor="confirmPassword">
              Confirm new password
              <span className="password-input-wrap">
                <input
                  id="confirmPassword"
                  type={visiblePasswords.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  minLength="8"
                  required
                />
                <button
                  type="button"
                  className="password-visibility-button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  aria-label={
                    visiblePasswords.confirmPassword
                      ? "Hide password confirmation"
                      : "Show password confirmation"
                  }
                >
                  {visiblePasswords.confirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </span>
            </label>

            <button
              className="profile-submit"
              type="submit"
              disabled={savingPassword}
            >
              <LockKeyhole size={17} />{" "}
              {savingPassword ? "Updating..." : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;
