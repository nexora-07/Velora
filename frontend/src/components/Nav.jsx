import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import Toggle from "../hooks/Toggle";
import { useAuth } from "../contexts/AuthContext";

import { Heart, LogOut, Package, Plus, ShoppingBag } from "lucide-react";
import AppButton from "./AppButton";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user, logout } = useAuth();

  const isAuthPage =
    ["/login", "/signup"].includes(location.pathname) ||
    location.pathname.startsWith("/verify-email/");

  if (isAuthPage) {
    const isSignupPage = location.pathname === "/signup";
    const isLoginPage = location.pathname === "/login";

    return (
      <header style={style.authHeader}>
        <Link to="/" style={style.logoLink}>
          <h1 style={style.logoTitle}>VELORA</h1>
          <p style={style.logoTagline}>THE ART OF YOUR FINGERTIPS</p>
        </Link>

        {isSignupPage && (
          <p style={style.authPrompt}>
            Already have an account?{" "}
            <Link to="/login" style={style.authLink}>
              Log in
            </Link>
          </p>
        )}

        {isLoginPage && (
          <p style={style.authPrompt}>
            Need an account?{" "}
            <Link to="/signup" style={style.authLink}>
              Sign up
            </Link>
          </p>
        )}
      </header>
    );
  }

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const isAuthenticated = Boolean(token && user);
  const firstName = user?.firstname || "User";
  const avatarInitial = firstName.charAt(0).toUpperCase();

  return (
    <header style={style.header}>
      <nav style={{ margin: "auto", width: "94%", padding: "10px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2em",
            alignItems: "center",
            flexWrap: "wrap",
            minWidth: 0,
          }}
        >
          {/* 1. LOGO */}
          <Link
            to={"/"}
            style={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}
          >
            <h1 style={{ margin: 0, fontFamily: '"Playfair Display", serif' }}>
              VELORA
            </h1>
            <p
              style={{
                color: "inherit",
                margin: 0,
                fontSize: "10px",
                letterSpacing: "1px",
              }}
            >
              THE ART OF YOUR FINGERTIPS
            </p>
          </Link>

          {/* 3. ACTION LINKS */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25em",
              padding: 0,
              margin: 0,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              flex: "1 1 0",
              minWidth: 0,
            }}
          >
            <li style={{ listStyle: "none" }}>
              <Link
                to={"/product"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Package size={16} strokeWidth={1.8} /> Products
              </Link>
            </li>

            <li style={{ listStyle: "none" }}>
              <Link
                to={"/create-product"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Plus size={16} strokeWidth={1.8} /> Sell
              </Link>
            </li>

            <li style={{ listStyle: "none" }}>
              <Link
                to={"/WishList"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Heart size={16} strokeWidth={1.8} /> Wishlist
              </Link>
            </li>

            <li style={{ listStyle: "none" }}>
              <Link
                to={"/Cart"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <ShoppingBag size={16} strokeWidth={1.8} /> Cart (3)
              </Link>
            </li>

            <li style={{ listStyle: "none", color: "inherit" }}>
              <Toggle />
            </li>

            {isAuthenticated ? (
              <li style={style.profileActions}>
                <Link to="/Account" style={style.profileLink}>
                  <span>Welcome, {firstName}</span>
                  <span style={style.avatar}>
                    {user.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt={`${firstName}'s profile`}
                        style={style.avatarImage}
                      />
                    ) : (
                      avatarInitial
                    )}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  style={style.logoutButton}
                  aria-label="Log out"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </li>
            ) : (
              <li style={style.authActions}>
                <AppButton
                  text="Login"
                  bgColor="transparent"
                  textColor="#222222"
                  border="1px solid #222222"
                  useBorder="5px"
                  handleClick={handleLogin}
                />

                <AppButton
                  text="Signup"
                  bgColor="#222222"
                  textColor="#ffffff"
                  useBorder="5px"
                  handleClick={handleSignUp}
                />
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* SECONDARY NAVIGATION (CATEGORIES) */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px 18px",
          listStyleType: "none",
          padding: "15px 0 10px 0",
          margin: "0 auto",
          width: "94%",
          minWidth: 0,
          fontSize: "14px",
          color: "inherit",
        }}
      >
        <li style={{ cursor: "pointer" }}>All Categories</li>
        <li style={{ cursor: "pointer" }}>Press-On Nails</li>
        <li style={{ cursor: "pointer" }}>False Nails</li>
        <li style={{ cursor: "pointer" }}>Nail Tools</li>
        <li style={{ cursor: "pointer" }}>Accessories</li>
        <li style={{ cursor: "pointer" }}>Nail Care</li>
        <li style={{ cursor: "pointer" }}>New In</li>
        <li style={{ cursor: "pointer" }}>Best Sellers</li>
        <li style={{ cursor: "pointer" }}>Sale</li>
      </ul>
    </header>
  );
};

const style = {
  authHeader: {
    width: "94%",
    margin: "0 auto",
    padding: "18px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #F5F5F5",
  },
  logoLink: {
    textDecoration: "none",
    color: "inherit",
  },
  logoTitle: {
    margin: 0,
    fontFamily: '"Playfair Display", serif',
  },
  logoTagline: {
    color: "inherit",
    margin: 0,
    fontSize: "10px",
    letterSpacing: "1px",
  },
  authPrompt: {
    margin: 0,
    color: "inherit",
    fontSize: "14px",
  },
  authLink: {
    color: "inherit",
    fontWeight: 600,
  },
  authActions: {
    listStyle: "none",
    display: "flex",
    gap: "0.6em",
    whiteSpace: "nowrap",
  },
  profileActions: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.8em",
    whiteSpace: "nowrap",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    color: "inherit",
    textDecoration: "none",
    fontWeight: 600,
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#F8EFEC",
    color: "#222222",
    fontSize: "14px",
    fontWeight: 700,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  logoutButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "8px 10px",
    border: "1px solid currentColor",
    borderRadius: "5px",
    backgroundColor: "transparent",
    color: "inherit",
    fontSize: "13px",
    cursor: "pointer",
  },
  header: {
    // backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #F5F5F5",
    paddingBottom: "10px",
  },
};

export default Nav;
