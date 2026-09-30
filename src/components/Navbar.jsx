import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import {
  FiLogIn,
  FiUser,
  FiLogOut,
  FiHome,
  FiInfo,
  FiSearch,
  FiBriefcase,
  FiHeart,
  FiMail,
  FiRepeat,
  FiShield
} from "react-icons/fi";
import { logout } from "../../store/actions";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.login);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showUserTypesDropdown, setShowUserTypesDropdown] = useState(false);
  const [mobileRoleSwitcherOpen, setMobileRoleSwitcherOpen] = useState(false);

  // Synchronous initial state from localStorage
  const [userData, setUserData] = useState(() => {
    if (!isLoggedIn) return null;
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  });

  const [userType, setUserType] = useState(() => {
    if (!isLoggedIn) return null;
    return localStorage.getItem("selectedUserType") || null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    if (!isLoggedIn) return false;
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        return JSON.parse(raw).role === "ADMIN";
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const [userTypes, setUserTypes] = useState(() => {
    if (!isLoggedIn) return [];
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        return JSON.parse(raw).userTypes || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (isLoggedIn) {
      const selectedUserType = localStorage.getItem("selectedUserType");
      setUserType(selectedUserType);

      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          const parsedUser = JSON.parse(raw);
          setUserData(parsedUser);
          setIsAdmin(parsedUser.role === "ADMIN");

          if (parsedUser.userTypes) {
            setUserTypes(parsedUser.userTypes);
            if (!selectedUserType && parsedUser.userTypes.length > 0) {
              const defaultType = parsedUser.userTypes[0];
              localStorage.setItem("selectedUserType", defaultType);
              setUserType(defaultType);
            }
          }
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    } else {
      setUserType(null);
      setUserTypes([]);
      setUserData(null);
      setIsAdmin(false);
    }
  }, [isLoggedIn]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setMobileRoleSwitcherOpen(false);
  };

  const toggleProfileDropdown = () =>
    setProfileDropdownOpen(!profileDropdownOpen);

  const handleProfileTypeChange = (newUserType) => {
    localStorage.setItem("selectedUserType", newUserType);
    setUserType(newUserType);
    setShowUserTypesDropdown(false);
    setMobileRoleSwitcherOpen(false);
    setProfileDropdownOpen(false);
    closeMenu();
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    closeMenu();
    navigate("/");
  };

  const desktopLinkClasses = (path) => {
    const isActive = pathname === path;
    return `relative px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-colors duration-150 ${
      isActive
        ? "text-rose-600 bg-rose-50/80 shadow-xs"
        : "text-gray-700 hover:text-rose-600 hover:bg-slate-50"
    }`;
  };

  const mobileLinkClasses = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-150 ${
      isActive
        ? "bg-rose-50 text-rose-600 border-l-4 border-rose-500 shadow-xs"
        : "text-gray-800 hover:bg-slate-50 hover:text-rose-600"
    }`;
  };

  // Visibility logic — fallback to showing links if userType is empty or null
  const shouldShowFindHelp =
    isAdmin || !isLoggedIn || !userType || userType === "Care Receiver";
  const shouldShowFindJob =
    isAdmin || !isLoggedIn || !userType || userType === "Care Giver";
  const shouldShowCareNurturers =
    isAdmin ||
    !isLoggedIn ||
    !userType ||
    userType === "Business" ||
    userType === "Care Receiver";

  // Formatted display name for user profile card
  const userNameDisplay = userData
    ? [userData.firstName, userData.lastName].filter(Boolean).join(" ") ||
      userData.email ||
      "Logged User"
    : "User Account";

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-8 lg:px-14">
        {/* Logo */}
        <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-2">
          <img
            src="/logo-navbar.png"
            alt="CareNearn Logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Small Screen Right Action Area (Active Role Pill + Hamburger) */}
        <div className="flex items-center gap-2 lg:hidden">
          {isLoggedIn && (
            <button
              type="button"
              onClick={toggleMenu}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-xs font-bold text-rose-600 hover:bg-rose-100 active:scale-95 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="max-w-[110px] truncate">
                {isAdmin ? "ADMIN" : userType || "Profile"}
              </span>
            </button>
          )}

          {/* Hamburger Mobile Toggle */}
          <button
            type="button"
            onClick={toggleMenu}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs border border-rose-100 active:scale-95 transition shadow-2xs"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <IoIosClose size={22} /> : <IoIosMenu size={20} />}
            <span>Menu</span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="lg:flex gap-2 items-center hidden">
          <Link to="/" className={desktopLinkClasses("/")}>
            Home
          </Link>

          <Link to="/about-us" className={desktopLinkClasses("/about-us")}>
            About Us
          </Link>

          {shouldShowFindHelp && (
            <Link to="/find-help" className={desktopLinkClasses("/find-help")}>
              Find Help
            </Link>
          )}

          {shouldShowFindJob && (
            <Link to="/find-job" className={desktopLinkClasses("/find-job")}>
              Find a Job
            </Link>
          )}

          {shouldShowCareNurturers && (
            <Link
              to="/care-nurturers"
              className={desktopLinkClasses("/care-nurturers")}
            >
              Care Nurturers
            </Link>
          )}

          <Link to="/contact-us" className={desktopLinkClasses("/contact-us")}>
            Contact Us
          </Link>
        </nav>

        {/* Desktop Right CTA / Profile Dropdown */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-gray-200/80 hover:border-rose-300 transition-all text-sm font-semibold text-gray-800"
              >
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">
                  <FiUser />
                </div>
                <span>{isAdmin ? "ADMIN" : userType || "Profile"}</span>
                <FaChevronDown
                  size={9}
                  className={`text-gray-400 transition-transform duration-200 ${
                    profileDropdownOpen
                      ? "transform rotate-180 text-rose-500"
                      : ""
                  }`}
                />
              </button>

              {/* Desktop Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-gray-100 animate-fade-in">
                  {!isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setShowUserTypesDropdown(!showUserTypesDropdown)
                        }
                        className="flex justify-between items-center w-full px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
                      >
                        <span className="flex items-center gap-2">
                          <FiRepeat className="text-rose-500" />
                          Switch Role
                        </span>
                        <FaChevronDown
                          size={10}
                          className={`transition-transform ${
                            showUserTypesDropdown
                              ? "transform rotate-180 text-rose-500"
                              : ""
                          }`}
                        />
                      </button>

                      {showUserTypesDropdown && (
                        <div className="bg-slate-50/80 my-1 py-1 border-y border-gray-100">
                          {userTypes.map((type) => (
                            <button
                              type="button"
                              key={type}
                              onClick={() => handleProfileTypeChange(type)}
                              className={`flex items-center justify-between w-full text-left px-5 py-2 text-xs font-semibold ${
                                userType === type
                                  ? "text-rose-600 bg-rose-100/60"
                                  : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                              }`}
                            >
                              <span>{type}</span>
                              {userType === type && <FaCheck className="text-rose-600 text-[10px]" />}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="border-t border-gray-100 my-1" />

                      <Link
                        to="/my-profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
                      >
                        <FiUser className="text-gray-400" />
                        <span>My Profile</span>
                      </Link>
                    </>
                  )}

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  >
                    <FiLogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/35 hover:scale-105 active:scale-100 transition-all duration-200"
              >
                <FiLogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation — Portaled directly to document.body for top z-index priority */}
      {menuOpen &&
        createPortal(
          <>
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[9998] lg:hidden transition-opacity duration-200"
              onClick={closeMenu}
            />

            {/* Side Drawer */}
            <aside className="fixed top-0 right-0 h-full w-[85%] max-w-xs sm:max-w-sm bg-white p-5 z-[9999] shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden text-gray-900 transition-transform duration-300">
              <div className="space-y-5">
                {/* Header inside Mobile Drawer */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <img
                    src="/logo-navbar.png"
                    alt="CareNearn Logo"
                    className="h-8 w-auto object-contain"
                  />
                  <button
                    onClick={closeMenu}
                    className="p-1.5 rounded-xl text-gray-500 hover:bg-slate-100 hover:text-rose-600 active:scale-95 transition"
                    aria-label="Close menu"
                  >
                    <IoIosClose size={30} />
                  </button>
                </div>

                {/* User Account & Role Card (Mobile) */}
                {isLoggedIn ? (
                  <div className="bg-gradient-to-br from-rose-50/80 via-slate-50 to-pink-50/50 rounded-2xl p-4 border border-rose-100 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-base shadow-xs">
                          {isAdmin ? (
                            <FiShield className="w-5 h-5" />
                          ) : (
                            userNameDisplay.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm leading-tight max-w-[140px] truncate">
                            {userNameDisplay}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-xs font-semibold text-rose-600">
                              {isAdmin ? "Administrator" : userType || "User"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {!isAdmin && userTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileRoleSwitcherOpen(!mobileRoleSwitcherOpen)
                          }
                          className="p-2 rounded-xl bg-white text-rose-600 border border-rose-200/60 shadow-2xs hover:bg-rose-50 active:scale-95 transition"
                          title="Switch Role"
                        >
                          <FiRepeat className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Collapsible Mobile Role Switcher */}
                    {!isAdmin && userTypes.length > 1 && mobileRoleSwitcherOpen && (
                      <div className="pt-2 border-t border-rose-100/80 space-y-1.5">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1">
                          Select Active Role
                        </p>
                        <div className="grid grid-cols-1 gap-1">
                          {userTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => handleProfileTypeChange(type)}
                              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                                userType === type
                                  ? "bg-rose-500 text-white shadow-xs"
                                  : "bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 border border-gray-100"
                              }`}
                            >
                              <span>{type}</span>
                              {userType === type && <FaCheck className="text-white text-xs" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Mobile Navigation Links */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">
                    Navigation
                  </p>

                  <Link
                    to="/"
                    onClick={closeMenu}
                    className={mobileLinkClasses("/")}
                  >
                    <FiHome className="w-5 h-5 text-rose-500" />
                    <span>Home</span>
                  </Link>

                  <Link
                    to="/about-us"
                    onClick={closeMenu}
                    className={mobileLinkClasses("/about-us")}
                  >
                    <FiInfo className="w-5 h-5 text-rose-500" />
                    <span>About Us</span>
                  </Link>

                  {shouldShowFindHelp && (
                    <Link
                      to="/find-help"
                      onClick={closeMenu}
                      className={mobileLinkClasses("/find-help")}
                    >
                      <FiSearch className="w-5 h-5 text-rose-500" />
                      <span>Find Help</span>
                    </Link>
                  )}

                  {shouldShowFindJob && (
                    <Link
                      to="/find-job"
                      onClick={closeMenu}
                      className={mobileLinkClasses("/find-job")}
                    >
                      <FiBriefcase className="w-5 h-5 text-rose-500" />
                      <span>Find a Job</span>
                    </Link>
                  )}

                  {shouldShowCareNurturers && (
                    <Link
                      to="/care-nurturers"
                      onClick={closeMenu}
                      className={mobileLinkClasses("/care-nurturers")}
                    >
                      <FiHeart className="w-5 h-5 text-rose-500" />
                      <span>Care Nurturers</span>
                    </Link>
                  )}

                  <Link
                    to="/contact-us"
                    onClick={closeMenu}
                    className={mobileLinkClasses("/contact-us")}
                  >
                    <FiMail className="w-5 h-5 text-rose-500" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>

              {/* Mobile Footer / Action Buttons */}
              <div className="pt-4 border-t border-gray-100 space-y-2 mt-4">
                {isLoggedIn ? (
                  <>
                    {!isAdmin && (
                      <Link
                        to="/my-profile"
                        onClick={closeMenu}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-sm text-gray-800 transition"
                      >
                        <FiUser className="w-4 h-4 text-gray-600" />
                        <span>My Profile</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-sm transition"
                    >
                      <FiLogOut className="w-4 h-4 text-rose-600" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 active:scale-[0.98] transition"
                  >
                    <FiLogIn className="w-4.5 h-4.5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </aside>
          </>,
          document.body
        )}
    </header>
  );
};

export default Navbar;
