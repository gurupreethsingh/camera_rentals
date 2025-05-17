import React from "react";
import useScrollUtils from "./useScrollUtils";

const TopProgressBar = () => {
  const { scrollProgress } = useScrollUtils();

  return (
    <div
      className="fixed top-0 left-0 z-[100] transition-all duration-200"
      style={{
        width: `${scrollProgress}%`,
        height: "1px",  // 🔽 Slightly thinner than 5px
        background: "linear-gradient(to right, rgba(0, 217, 255, 0.32), rgba(0, 255, 255, 0.4), rgba(0, 255, 128, 0.32), rgba(255, 255, 0, 0.4), rgba(255, 81, 0, 0.48))",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)", // 🟡 Very subtle shadow
        backdropFilter: "blur(2px)",          // 🧊 Soft blurry overlay effect
      }}
    ></div>
  );
};

export default TopProgressBar;
