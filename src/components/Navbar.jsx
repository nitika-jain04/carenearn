import React, { useState, useEffect } from "react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { FiLogIn, FiUser, FiLogOut } from "react-icons/fi";
import { logout } from "../../store/actions";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.login);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showUserTypesDropdown, setShowUserTypesDropdown] = useState(false);

  // Synchronous initial state from localStorage to prevent re-render flicker
  const [userType, setUserType] = useState(() => {
    if (!isLoggedIn) return null;
    return localStorage.getItem("selectedUserType") || null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    if (!isLoggedIn) return false;
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData).role === "ADMIN";
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const [userTypes, setUserTypes] = useState(() => {
    if (!isLoggedIn) return [];
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData).userTypes || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (isLoggedIn) {
      const selectedUserType = localStorage.getItem("selectedUserType");
      setUserType(selectedUserType);

      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
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
      setIsAdmin(false);
    }
  }, [isLoggedIn]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleProfileDropdown = () =>
    setProfileDropdownOpen(!profileDropdownOpen);

  const handleProfileTypeChange = (newUserType) => {
    localStorage.setItem("selectedUserType", newUserType);
    setUserType(newUserType);
    setShowUserTypesDropdown(false);
    setProfileDropdownOpen(false);
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const linkClasses = (path) => {
    const isActive = pathname === path;
    return `relative px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-colors duration-150 ${
      isActive
        ? "text-rose-600 bg-rose-50/80 shadow-xs"
        : "text-gray-700 hover:text-rose-600 hover:bg-slate-50"
    }`;
  };

  // If user is ADMIN, show all links, otherwise use the role logic
  const shouldShowFindHelp =
    isAdmin || !isLoggedIn || userType === "Care Receiver";
  const shouldShowFindJob = isAdmin || !isLoggedIn || userType === "Care Giver";
  const shouldShowCareNurturers =
    isAdmin ||
    !isLoggedIn ||
    userType === "Business" ||
    userType === "Care Receiver";

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-8 lg:px-14">
        {/* Logo */}
        <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-2">
          <img src="/logo-navbar.png" alt="CareNearn Logo" className="h-10 sm:h-12 w-auto object-contain" />
        </Link>

        {/* Hamburger Mobile Toggle */}
        <button
          type="button"
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-slate-100 hover:text-rose-600 transition"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <IoIosClose size={30} /> : <IoIosMenu size={28} />}
        </button>

        {/* Desktop Nav */}
        <nav className="lg:flex gap-2 items-center hidden">
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>

          <Link to="/about-us" className={linkClasses("/about-us")}>
            About Us
          </Link>

          {shouldShowFindHelp && (
            <Link to="/find-help" className={linkClasses("/find-help")}>
              Find Help
            </Link>
          )}

          {shouldShowFindJob && (
            <Link to="/find-job" className={linkClasses("/find-job")}>
              Find a Job
            </Link>
          )}

          {shouldShowCareNurturers && (
            <Link
              to="/care-nurturers"
              className={linkClasses("/care-nurturers")}
            >
              Care Nurturers
            </Link>
          )}

          <Link to="/contact-us" className={linkClasses("/contact-us")}>
            Contact Us
          </Link>
        </nav>

        {/* Right CTA / Profile */}
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
                    profileDropdownOpen ? "transform rotate-180 text-rose-500" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl py-2 z-50 border border-gray-100 animate-fade-in">
                  {!isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setShowUserTypesDropdown(!showUserTypesDropdown)
                        }
                        className="flex justify-between items-center w-full px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
                      >
                        <span>Switch Role</span>
                        <FaChevronDown
                          size={10}
                          className={`transition-transform ${
                            showUserTypesDropdown ? "transform rotate-180 text-rose-500" : ""
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
                              className={`block w-full text-left px-5 py-2 text-xs font-semibold ${
                                userType === type
                                  ? "text-rose-600 bg-rose-100/60"
                                  : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                              }`}
                            >
                              ✓ {type}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="border-t border-gray-100 my-1" />

                      <Link
                        to="/my-profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
                      >
                        My Profile
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

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
            onClick={closeMenu}
          />
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white p-6 z-50 shadow-2xl flex flex-col justify-between text-base animate-slide-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <img src="/logo-navbar.png" alt="Logo" className="h-8 w-auto" />
                <button onClick={closeMenu} className="p-1 rounded-lg text-gray-500 hover:bg-slate-100">
                  <IoIosClose size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <Link to="/" onClick={closeMenu} className={linkClasses("/")}>
                  Home
                </Link>
                <Link to="/about-us" onClick={closeMenu} className={linkClasses("/about-us")}>
                  About Us
                </Link>
                {shouldShowFindHelp && (
                  <Link to="/find-help" onClick={closeMenu} className={linkClasses("/find-help")}>
                    Find Help
                  </Link>
                )}
                {shouldShowFindJob && (
                  <Link to="/find-job" onClick={closeMenu} className={linkClasses("/find-job")}>
                    Find a Job
                  </Link>
                )}
                {shouldShowCareNurturers && (
                  <Link to="/care-nurturers" onClick={closeMenu} className={linkClasses("/care-nurturers")}>
                    Care Nurturers
                  </Link>
                )}
                <Link to="/contact-us" onClick={closeMenu} className={linkClasses("/contact-us")}>
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/my-profile"
                    onClick={closeMenu}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 font-bold text-sm text-gray-800"
                  >
                    <FiUser />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm hover:bg-rose-100 transition"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25"
                >
                  <FiLogIn />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
