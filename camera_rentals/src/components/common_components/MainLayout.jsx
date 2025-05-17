// components/common_components/MainLayout.jsx
import React from "react";
import Header from "../header_components/Header";
import Footer from "../footer_components/Footer";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../auth_components/AuthManager";
import PageTitle from "./PageTitle";

// user pages. 
import Homepage from "../../pages/common_pages/Homepage";
import PageNotFound from "../../pages/common_pages/PageNotFound";
import AboutUs from "../../pages/common_pages/AboutUs";
import Register from "../../pages/user_pages/Register";
import Login from "../../pages/user_pages/Login";
import Dashboard from "../../pages/user_pages/UserDashboard";
import Profile from "../../pages/user_pages/Profile";
import UpdateProfile from "../../pages/user_pages/UpdateProfile";
import ForgotPassword from "../../pages/user_pages/ForgotPassword";
import ResetPassword from "../../pages/user_pages/ResetPassword";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Homepage />

      <Footer />
    </div>
  )
}

export default MainLayout
