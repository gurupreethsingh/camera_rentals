import "./App.css";
import "./styles/global.css";
import "animate.css";
import { AuthProvider } from "./components/auth_components/AuthManager";
import MainLayout from "./components/common_components/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import TopArrow from "./components/common_components/TopArrow";
import TopProgressBar from "./components/common_components/TopProgressBar";
import { CartProvider } from "./components/cart_components/CartContext"; // ✅ Import here!
import { WishlistProvider } from "./components/wishlist_components/WishlistContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <MainLayout />
              <TopArrow /> {/* Global Fixed */}
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
