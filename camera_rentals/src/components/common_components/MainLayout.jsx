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
import TopProgressBar from "./TopProgressBar";
// contact page.
import ContactUs from "../../pages/contact_pages/ContactUs";

// blog routes.
import AllBlogs from "../../pages/blog_pages/AllBlogs";
import SingleBlog from "../../pages/blog_pages/SingleBlog";

// shop pages
import Shop from "../../pages/shop_pages/Shop";
import SingleProduct from "../../pages/shop_pages/SingleProduct";

// wishlist page.
import Wishlist from "../../pages/wishlist_pages/Wishlist";

// cart page
import Cart from "../../pages/cart_pages/CartPage";

const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <TopProgressBar /> {/* Move here */}
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <PageTitle title="Homepage">
                <Homepage />
              </PageTitle>
            }
          />

          <Route
            path="/home"
            element={
              <PageTitle title="Homepage">
                <Homepage />
              </PageTitle>
            }
          />

          <Route
            path="/homepage"
            element={
              <PageTitle title="Homepage">
                <Homepage />
              </PageTitle>
            }
          />

          <Route
            path="/all-blogs"
            element={
              <PageTitle title="All Blogs">
                <AllBlogs />
              </PageTitle>
            }
          />

          <Route
            path="/single-blog/:id"
            element={
              <PageTitle title="Single Blog">
                <SingleBlog />
              </PageTitle>
            }
          />

          <Route
            path="/shop"
            element={
              <PageTitle title="Shop">
                <Shop />
              </PageTitle>
            }
          />

          <Route
            path="/single-product/:id"
            element={
              <PageTitle title="Single Product">
                <SingleProduct />
              </PageTitle>
            }
          />

          <Route
            path="/contact-us"
            element={
              <PageTitle title="Contact Us">
                <ContactUs />
              </PageTitle>
            }
          />

          <Route
            path="/wishlist"
            element={
              <PageTitle title="Wishlist">
                <Wishlist />
              </PageTitle>
            }
          />

          <Route
            path="/cart"
            element={
              <PageTitle title="Cart">
                <Cart />
              </PageTitle>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
