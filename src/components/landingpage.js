import React, { useEffect, useRef } from "react";
import Img from "../images/attendance.png";
import Imgbg from "../images/darkbg.avif";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const fadeIn = () => {
      const container = containerRef.current;
      container.style.opacity = 0;

      const fadeInInterval = setInterval(() => {
        if (container.style.opacity < 1) {
          container.style.opacity = parseFloat(container.style.opacity) + 0.1;
        } else {
          clearInterval(fadeInInterval);
        }
      }, 100);

      return () => clearInterval(fadeInInterval);
    };

    fadeIn();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div
        ref={containerRef}
        className=" min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${Imgbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container  md:mb-10  mx-auto flex flex-col md:flex-row md:ml-8">
          <div className="md:w-1/2">
            <img
              className=" md:h-84 h-full  p-14 md:pr-20 rounded-md"
              src={Img}
              alt="Smart Attendance Management"
            />
          </div>
          <div className="md:w-fit md:pl-8 relative">
            <div
              className="md:p-20 m-4 md:mt-40 md:mr-8 rounded shadow-lg text-center md:text-left"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 25, 0, 0.3) 0%, rgba(255, 255, 0, 0) 120%)",
              }}
            >
              <h1 className="text-4xl text-gray-200 font-handwriting font-bold mb-4">
                Smart Attendance Management System
              </h1>
              <p className="text-gray-300 mb-6">
                Precision in attendance leads to excellence in performance.
              </p>
              <Link to="/takeimg">
                <button className="bg-gradient-to-r from-blue-500 to-blue-800 text-white m-2 rounded-full p-3 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
