import { useState, useEffect } from "react";

const useScrollUtils = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Show scroll-to-top button condition
    setShowScrollTop(scrollTop > 100);

    // Scroll progress bar calculation
    const scrolled = (scrollTop / docHeight) * 100;
    setScrollProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { showScrollTop, scrollProgress };
};

export default useScrollUtils;
