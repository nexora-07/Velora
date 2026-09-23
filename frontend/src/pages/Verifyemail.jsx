import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Verifyemail = () => {
  const { email, verificationToken } = useParams();
  const { verifyEmail, loading } = useAuth();
  const [failed, setFailed] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (!email || !verificationToken) {
      setFailed(true);
      return;
    }

    verifyEmail({ email, verificationToken }).catch(() => {
      setFailed(true);
    });
  }, [email, verificationToken, verifyEmail]);

  return (
    <main style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <section style={styles.card} aria-live="polite">
        <div style={failed ? styles.errorIcon : styles.icon} aria-hidden="true">
          {failed ? "!" : loading ? "..." : "✓"}
        </div>

        <p style={styles.eyebrow}>VELORA ACCOUNT</p>
        <h1 style={styles.heading}>
          {failed ? "Email verification failed" : "Verify your email"}
        </h1>
        <p style={styles.message}>
          {failed
            ? "This verification link is invalid or has expired. Please return to login and try again."
            : loading
              ? "We are confirming your email address."
              : "Your email has been verified successfully. Redirecting you to login."}
        </p>

        {failed && (
          <Link to="/login" style={styles.button}>
            Go to login
          </Link>
        )}
      </section>
    </main>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    position: "relative",
    overflow: "hidden",
  },
  glowOne: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(239, 109, 47, 0.12)",
    filter: "blur(46px)",
    top: "-90px",
    left: "-80px",
  },
  glowTwo: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "rgba(219, 63, 53, 0.1)",
    filter: "blur(42px)",
    bottom: "-70px",
    right: "-80px",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    padding: "40px 28px",
    borderRadius: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 20px 46px rgba(35, 23, 8, 0.15)",
    textAlign: "center",
    zIndex: 1,
  },
  icon: {
    width: "68px",
    height: "68px",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 18px",
    borderRadius: "50%",
    backgroundColor: "#fff0eb",
    color: "#c1361c",
    fontSize: "30px",
    fontWeight: 700,
  },
  errorIcon: {
    width: "68px",
    height: "68px",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 18px",
    borderRadius: "50%",
    backgroundColor: "#fde8e5",
    color: "#a72b18",
    fontSize: "30px",
    fontWeight: 700,
  },
  eyebrow: {
    margin: 0,
    color: "#b98270",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
  },
  heading: {
    margin: "10px 0 0",
    color: "#1f1a17",
    fontSize: "30px",
    letterSpacing: "0.2px",
  },
  message: {
    maxWidth: "390px",
    margin: "12px auto 0",
    color: "#5b5046",
    fontSize: "14px",
    lineHeight: 1.6,
  },
  button: {
    display: "inline-block",
    marginTop: "24px",
    padding: "13px 22px",
    borderRadius: "12px",
    background: "crimson",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 10px 22px rgba(219, 63, 53, 0.33)",
  },
};

export default Verifyemail;
