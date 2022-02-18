import React, { useEffect } from "react";

function BackToTopButton() {
  useEffect(() => {
    const onScroll = (e) => {
      const mybutton = document.getElementById("myBtn");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      id="myBtn"
      className="back-to-top-button"
      onClick={() => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }}
    >
      Back to top
    </button>
  );
}

export default BackToTopButton;
