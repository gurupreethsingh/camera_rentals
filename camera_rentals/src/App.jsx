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

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
            <MainLayout />
          <TopArrow />         {/* Global Fixed */}
        </Router>
      </AuthProvider>

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
