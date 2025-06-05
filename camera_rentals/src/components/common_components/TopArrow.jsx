import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const TopArrow = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    setShow(window.scrollY > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {show && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            animation: "floaty 2s ease-in-out infinite",
          }}
        >
          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: "#000000",
              color: "white",
              padding: "20px 12px", // 🟢 More padding vertically for pill shape
              borderRadius: "9999px", // Keeps it pill-oval shaped
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease-in-out",
              border: "none",
              flexDirection: "column", // Stack contents vertically
              aspectRatio: "1 / 1", // Forces vertical pill aspect
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaArrowUp
              style={{
                animation: "pulse 2s infinite",
                transform: "scaleY(2)", // ⬆️ Extra tall arrow
              }}
              size={8}
            />
          </button>
        </div>
      )}

      <style>
        {`
          @keyframes floaty {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default TopArrow;
