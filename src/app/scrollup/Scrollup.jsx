import React, { useEffect } from "react";
import "./scrollup.css";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-scroll";

const Scrollup = () => {
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
    <div className="scrollup">
   
       <Link to={"home"} smooth={true} duration={0}>
        <FaArrowUp className="text-2xl"/>
      </Link>
    </div>
  );
};

export default Scrollup;
