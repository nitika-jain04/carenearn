import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"; // ✅ FIXED: 'react-router' ➜ 'react-router-dom'
import { login } from "../../store/actions/index.js";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.login);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ menu toggle state

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const linkClasses = (path) =>
    `relative transition-all duration-300 ease-in-out ${
      pathname === path ? "text-rose-500" : "text-black"
    } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-500 after:transition-all after:duration-300
       ${pathname === path ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  const linkClasses2 = (path) =>
    `${linkClasses(path)} ${isLoggedIn ? "visible" : "hidden"}`;

  return (
    <div className="sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between py-2 lg:px-5 px-2">
        <Link to="/">
          <img src="/logo-navbar.png" alt="LOGO" />
        </Link>

        {/* Hamburger */}
        <IoIosMenu size={30} className="lg:hidden" onClick={toggleMenu} />

        {/* Desktop Nav */}
        <div className="lg:flex gap-7 text-lg hidden">
          <Link to="/about-us" className={linkClasses("/about-us")}>
            About Us
          </Link>
          {/* <Link to="/our-vision" className={linkClasses("/our-vision")}>
            Our Vision
          </Link> */}
          <Link to="/find-help" className={linkClasses2("/find-help")}>
            Find Help
          </Link>
          <Link to="/find-job" className={linkClasses2("/find-job")}>
            Find a Job
          </Link>
          <Link
            to="/care-nurturers"
            className={linkClasses2("/care-nurturers")}
          >
            Care Nurturers
          </Link>
          <Link to="/contact-us" className={linkClasses("/contact-us")}>
            Contact Us
          </Link>
          {isLoggedIn ? (
            <Link to="/my-profile">
              <div className="flex items-center gap-1 group relative">
                <FaUserCircle className="text-rose-500" size={20} />
                <span className="relative text-black after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-500 after:w-0 group-hover:after:w-full transition-all duration-300">
                  Profile
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <button
                className="flex items-center gap-1 group relative"
                onClick={() => dispatch(login())}
              >
                <FaUserCircle className="text-rose-500" size={20} />
                <span className="relative text-black after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-500 after:w-0 group-hover:after:w-full transition-all duration-300">
                  Login
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu + Backdrop */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={closeMenu}
          ></div>

          {/* Side Menu */}
          <div className="fixed top-0 right-0 h-full w-1/3 bg-white p-5 z-50 shadow-md flex flex-col gap-5 text-lg">
            <Link
              to="/about-us"
              onClick={closeMenu}
              className={linkClasses("/about-us")}
            >
              About Us
            </Link>
            <Link
              to="/our-vision"
              onClick={closeMenu}
              className={linkClasses("/our-vision")}
            >
              Our Vision
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/find-help"
                  onClick={closeMenu}
                  className={linkClasses("/find-help")}
                >
                  Find Help
                </Link>
                <Link
                  to="/find-job"
                  onClick={closeMenu}
                  className={linkClasses("/find-job")}
                >
                  Find a Job
                </Link>
                <Link
                  to="/care-nurturers"
                  onClick={closeMenu}
                  className={linkClasses("/care-nurturers")}
                >
                  Care Nurturers
                </Link>
              </>
            )}
            <Link
              to="/contact-us"
              onClick={closeMenu}
              className={linkClasses("/contact-us")}
            >
              Contact Us
            </Link>
            <Link
              to={isLoggedIn ? "/my-profile" : "/login"}
              onClick={closeMenu}
            >
              <div className="flex items-center gap-1">
                <FaUserCircle className="text-rose-500" size={20} />
                <span>{isLoggedIn ? "Profile" : "Login"}</span>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
