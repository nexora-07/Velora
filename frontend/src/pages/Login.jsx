import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login, loading } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
    } catch {
      // Toast feedback is already handled inside AuthContext.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subText}>Log in to continue your product journey.</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={styles.form} noValidate>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                style={styles.input}
              />
              <ErrorMessage
                name="email"
                component="p"
                style={styles.errorText}
              />

              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                style={styles.input}
              />
              <ErrorMessage
                name="password"
                component="p"
                style={styles.errorText}
              />

              <button
                type="submit"
                style={styles.submitButton}
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Logging in..." : "Log in"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px 16px",
    position: "relative",
    overflow: "hidden",
  },
  glowOne: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    filter: "blur(46px)",
    top: "-70px",
    left: "-80px",
  },
  glowTwo: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    filter: "blur(42px)",
    bottom: "-60px",
    right: "-80px",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    padding: "28px",
    borderRadius: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 20px 46px rgba(35, 23, 8, 0.15)",
    zIndex: 1,
  },
  heading: {
    fontSize: "30px",
    color: "#1f1a17",
    margin: 0,
    letterSpacing: "0.2px",
  },
  subText: {
    marginTop: "8px",
    marginBottom: "18px",
    color: "#5b5046",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    marginTop: "8px",
    fontWeight: 600,
    color: "#2c2420",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    border: "1px solid #d8cbc0",
    borderRadius: "10px",
    padding: "12px 13px",
    fontSize: "15px",
    backgroundColor: "#fffdf9",
    outline: "none",
  },
  errorText: {
    color: "#c1361c",
    minHeight: "18px",
    fontSize: "13px",
    margin: "2px 0 0",
  },
  submitButton: {
    marginTop: "12px",
    border: "none",
    borderRadius: "12px",
    padding: "13px 16px",
    background: "#222222",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(219, 63, 53, 0.33)",
  },
};

export default Login;
