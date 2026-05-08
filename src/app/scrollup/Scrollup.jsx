import React, { useEffect } from "react";
import "./scrollup.css";
import { FaArrowUp } from "react-icons/fa";

const Scrollup = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollUp = document.querySelector(".scrollup");
      if (window.scrollY >= 200) {
        scrollUp.classList.add("show");
      } else {
        scrollUp.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scrollup" role="presentation">
      <button
        type="button"
        className="flex items-center justify-center border-0 bg-transparent p-0 text-white cursor-pointer"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-2xl" aria-hidden />
      </button>
    </div>
  );
};

export default Scrollup;
