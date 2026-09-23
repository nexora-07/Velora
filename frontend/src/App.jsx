import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verifyemail from "./pages/Verifyemail";
// import LandingPage from "./pages/LandingPage";
import WishList from "./pages/WishList";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
// import Counter from "../src/hooks/Counter";
import Nav from "./components/Nav";
import Landingpage from "./pages/Landingpage";
import Createproduct from "./pages/Createproduct";
// import Counter from "./hooks/Counter";

import Products from "./pages/Products";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-product" element={<Createproduct />} />
            <Route path="/product" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/verify-email/:email/:verificationToken"
              element={<Verifyemail />}
            />
            <Route path="/WishList" element={<WishList />} />
            <Route path="Account" element={<Account />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="appToast"
            bodyClassName="appToastBody"
            progressClassName="appToastProgress"
          />
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
