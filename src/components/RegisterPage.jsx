import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FiUserPlus,
  FiLogIn,
  FiHome,
  FiUser,
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiCheck,
  FiUploadCloud,
  FiArrowRight,
  FiLock,
  FiPhone,
  FiMail,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiX,
  FiUserCheck
} from "react-icons/fi";
import { login, updateProfile } from "../../store/actions/index.js";
import Navbar from "./Navbar";

const QUALIFICATIONS = [
  "Select qualification",
  "High School / 10th",
  "Higher Secondary / 12th",
  "Diploma",
  "Bachelor's / Graduate",
  "Master's / Post Graduate",
  "Doctorate / Ph.D.",
  "Other"
];

const PROFESSIONS = [
  "Select profession",
  "Student",
  "Teacher / Tutor",
  "Nurse / Healthcare",
  "Caregiver / Elder Assistant",
  "Homemaker",
  "IT / Software Professional",
  "Business / Self-Employed",
  "Retired",
  "Other"
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const isSignInRequested =
    searchParams.get("mode") === "signin" || location.pathname === "/login";
  const initialTab = isSignInRequested ? "signin" : "register";

  const [activeTab, setActiveTab] = useState(initialTab);
  const fileInputRef = useRef(null);

  // Sync tab if query string or pathname changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    if (mode === "signin" || location.pathname === "/login") {
      setActiveTab("signin");
    } else if (mode === "register") {
      setActiveTab("register");
    }
  }, [location.pathname, location.search]);

  // ── Register Form State ──────────────────────────────────────────────
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    dob: "",
    userType: "Both",
    address: "",
    city: "",
    pincode: "",
    qualification: "",
    profession: ""
  });

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ── Sign In Form State ───────────────────────────────────────────────
  const [loginCredential, setLoginCredential] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginUserType, setLoginUserType] = useState("Both");
  const [loginErrors, setLoginErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Auto-fetch City from Indian Pincode
  useEffect(() => {
    const fetchPincode = async () => {
      const pin = formData.pincode.trim();
      if (pin.length === 6 && /^[1-9][0-9]{5}$/.test(pin)) {
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
          if (res.ok) {
            const data = await res.json();
            if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
              const district = data[0].PostOffice[0].District;
              setFormData((prev) => ({ ...prev, city: district }));
              setErrors((prev) => {
                const next = { ...prev };
                delete next.city;
                delete next.pincode;
                return next;
              });
            }
          }
        } catch (err) {
          console.warn("Could not fetch city for pincode:", err);
        }
      }
    };

    const timer = setTimeout(fetchPincode, 400);
    return () => clearTimeout(timer);
  }, [formData.pincode]);

  // ── Input Handlers ───────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });

    if (name === "mobileNumber") {
      const cleanNum = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, mobileNumber: cleanNum }));
      return;
    }

    if (name === "pincode") {
      const cleanPin = value.replace(/\D/g, "").slice(0, 6);
      setFormData((prev) => ({ ...prev, pincode: cleanPin }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAadhaarFile(file);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.aadhaarFile;
        return copy;
      });
    }
  };

  const removeAadhaarFile = (e) => {
    e.stopPropagation();
    setAadhaarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ── Validation for Register ──────────────────────────────────────────
  const validateRegister = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required";
    }

    if (!formData.mobileNumber) {
      errs.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9][0-9]{9}$/.test(formData.mobileNumber)) {
      errs.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    if (!formData.dob) {
      errs.dob = "Date of birth is required";
    }

    if (!formData.userType) {
      errs.userType = "Please select a user type";
    }

    if (!formData.address.trim()) {
      errs.address = "Address is mandatory";
    }

    if (!formData.city.trim()) {
      errs.city = "City is mandatory";
    }

    if (!formData.pincode) {
      errs.pincode = "Pincode is mandatory";
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      errs.pincode = "Must be 6 digits";
    }

    if (!aadhaarFile) {
      errs.aadhaarFile = "Aadhaar Card is required for verification";
    }

    if (!agreedToTerms) {
      errs.agreedToTerms = "Please agree to the Terms & Conditions";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Handle Register Submission ───────────────────────────────────────
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      let userTypesArray = [];
      let selectedRoleName = "Care Receiver";

      if (formData.userType === "Both") {
        userTypesArray = [
          { roleName: "Care Giver" },
          { roleName: "Care Receiver" },
          { roleName: "Both" }
        ];
        selectedRoleName = "Both";
      } else if (formData.userType === "Caregiver") {
        userTypesArray = [{ roleName: "Care Giver" }];
        selectedRoleName = "Care Giver";
      } else {
        userTypesArray = [{ roleName: "Care Receiver" }];
        selectedRoleName = "Care Receiver";
      }

      const storedUser = {
        id: Date.now(),
        name: formData.fullName.trim(),
        firstName: formData.fullName.trim().split(" ")[0] || formData.fullName.trim(),
        lastName: formData.fullName.trim().split(" ").slice(1).join(" ") || "",
        phoneNumber: formData.mobileNumber,
        dateOfBirth: formData.dob,
        userTypes: userTypesArray,
        selectedRole: selectedRoleName,
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        educationalQualifications: formData.qualification || "",
        profession: formData.profession || "",
        status: "VERIFIED",
        aadharUploaded: true,
        aadharFileName: aadhaarFile?.name || "aadhaar_card.pdf"
      };

      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      existingUsers.push(storedUser);
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

      localStorage.setItem("user", JSON.stringify(storedUser));
      localStorage.setItem("selectedUserType", selectedRoleName === "Both" ? "Care Receiver" : selectedRoleName);
      localStorage.setItem("loginTimestamp", String(Date.now()));

      dispatch(updateProfile(storedUser));
      dispatch(login());

      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/?fromRegister=true");
      }, 1200);
    } catch (err) {
      console.error("Register error:", err);
      setErrors((prev) => ({
        ...prev,
        form: err.message || "Failed to create account. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Handle Sign In Submission ────────────────────────────────────────
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    if (!loginCredential.trim()) {
      errs.login = "Mobile number or email is required";
    }

    if (!loginPassword) {
      errs.password = "Password is required";
    }

    if (Object.keys(errs).length > 0) {
      setLoginErrors(errs);
      return;
    }

    setIsLoggingIn(true);
    setLoginErrors({});

    try {
      const isDemo =
        (loginCredential === "7007755306" || loginCredential.toLowerCase() === "suntechglobal@gmail.com") &&
        loginPassword === "Suntech@123";

      let matchedUser = null;
      if (isDemo) {
        matchedUser = {
          id: 1,
          name: "Suntech User",
          phoneNumber: "7007755306",
          email: "suntechglobal@gmail.com",
          userTypes: [
            { roleName: "Care Giver" },
            { roleName: "Care Receiver" },
            { roleName: "Both" }
          ]
        };
      } else {
        const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        matchedUser = existingUsers.find(
          (u) =>
            u.phoneNumber === loginCredential ||
            (u.emailId && u.emailId.toLowerCase() === loginCredential.toLowerCase())
        );
      }

      if (!matchedUser && !isDemo) {
        setLoginErrors({
          server: "Account not found. Please verify details or create a new account."
        });
        setIsLoggingIn(false);
        return;
      }

      const activeUser = matchedUser || {
        name: "User",
        phoneNumber: loginCredential,
        userTypes: [{ roleName: "Care Receiver" }]
      };

      const finalRole =
        loginUserType === "Both"
          ? "Care Receiver"
          : loginUserType === "Caregiver"
            ? "Care Giver"
            : "Care Receiver";

      localStorage.setItem("user", JSON.stringify(activeUser));
      localStorage.setItem("selectedUserType", finalRole);
      localStorage.setItem("loginTimestamp", String(Date.now()));

      dispatch(updateProfile(activeUser));
      dispatch(login());

      navigate("/?fromLogin=true");
    } catch (err) {
      setLoginErrors({ server: "Login failed. Please try again." });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleQuickDemoFill = () => {
    setLoginCredential("7007755306");
    setLoginPassword("Suntech@123");
    setLoginErrors({});
  };

  return (
    <div className="min-h-screen bg-[#FDF9F7] flex flex-col font-sans text-slate-800">
      {/* ── Standard Uniform Navbar across all pages ───────────────────── */}
      <Navbar />

      {/* ── Main Two-Column Layout ────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-5 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN: Story & Illustration & Value Props
              (Remains permanent and identical for both Register & Sign In)
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-1">
            <div>
              {/* Pink Tag */}
              <span className="inline-block text-[#E8436E] font-extrabold tracking-[0.2em] text-[11px] uppercase mb-2">
                JOIN CARENEARN
              </span>

              {/* Display Headline */}
              <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#112540] leading-[1.14] tracking-tight">
                Be part of a<br />
                caring community.
              </h1>

              {/* Sub-copy */}
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-2.5 max-w-md">
                Create your account and start a meaningful connection — whether you are looking for care, or want to offer your time, skills and experience.
              </p>
            </div>

            {/* Mother & Daughter Artwork with soft warm backdrop */}
            <div className="relative my-4 sm:my-5 flex items-center justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-3xl overflow-hidden bg-rose-50/40">
                <img
                  src="/home-page.jpg"
                  alt="Mother and daughter smiling warmly"
                  className="w-full h-auto max-h-[300px] object-cover object-[18%_35%] select-none drop-shadow-xs"
                />
              </div>
            </div>

            {/* Bottom 2 Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 border-t border-rose-100/70">
              {/* For Families */}
              <div className="flex flex-col gap-2 sm:pr-3 sm:border-r sm:border-rose-100/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FDECEF] border border-rose-200/60 flex items-center justify-center text-[#E8436E] text-sm">
                    <FiHome />
                  </div>
                  <span className="font-bold text-[#E8436E] text-xs sm:text-sm">
                    For Families
                  </span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600 font-medium pl-0.5">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-[#E8436E] stroke-[3] text-xs shrink-0" />
                    <span>Trusted, local care</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-[#E8436E] stroke-[3] text-xs shrink-0" />
                    <span>Meaningful engagement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-[#E8436E] stroke-[3] text-xs shrink-0" />
                    <span>Support for children and seniors</span>
                  </li>
                </ul>
              </div>

              {/* For Care Nurturers */}
              <div className="flex flex-col gap-2 sm:pl-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E6F5F2] border border-teal-200/60 flex items-center justify-center text-[#0E7A6E] text-sm">
                    <FiUserCheck />
                  </div>
                  <span className="font-bold text-[#0E7A6E] text-xs sm:text-sm">
                    For Care Nurturers
                  </span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600 font-medium pl-0.5">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-[#0E7A6E] stroke-[3] text-xs shrink-0" />
                    <span>Flexible opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-[#0E7A6E] stroke-[3] text-xs shrink-0" />
                    <span>Earn income</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-[#0E7A6E] stroke-[3] text-xs shrink-0" />
                    <span>Use skills and experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-[#0E7A6E] stroke-[3] text-xs shrink-0" />
                    <span>Make a real difference</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN: Interactive Card (Register / Sign In)
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xl shadow-slate-200/40 border border-slate-100/90 relative flex-1 flex flex-col">
              {/* ── Segmented Tab Pill: Register | Sign In ───────────── */}
              <div className="p-1 rounded-2xl border border-slate-200/90 bg-white mb-4">
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("register");
                      setErrors({});
                    }}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === "register"
                        ? "border border-rose-300 bg-[#FFF5F7] text-[#E8436E] shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <FiUserPlus className="text-sm text-[#E8436E]" />
                    <span>Register</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("signin");
                      setLoginErrors({});
                    }}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === "signin"
                        ? "border border-rose-300 bg-[#FFF5F7] text-[#E8436E] shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <FiLogIn className="text-sm" />
                    <span>Sign In</span>
                  </button>
                </div>
              </div>

              {/* ── VIEW A: REGISTER FORM ────────────────────────────── */}
              {activeTab === "register" && (
                <div className="flex-1 flex flex-col justify-between">
                  {/* Header Title */}
                  <div className="mb-3.5">
                    <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#112540] tracking-tight">
                      Create Your Account
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-[13px] mt-1">
                      Join CareNearn and be part of a community that cares and contributes.
                    </p>
                  </div>

                  {successMessage && (
                    <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <FiCheck className="text-emerald-600 text-sm" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {errors.form && (
                    <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                      {errors.form}
                    </div>
                  )}

                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    {/* 1. Full Name * */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Full Name <span className="text-[#E8436E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none transition ${
                          errors.fullName
                            ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-200"
                            : "border-slate-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* 2. Mobile Number * | Date of Birth * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Mobile Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Mobile Number <span className="text-[#E8436E]">*</span>
                        </label>
                        <div
                          className={`flex items-center rounded-xl border bg-white overflow-hidden transition ${
                            errors.mobileNumber
                              ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-200"
                              : "border-slate-200 focus-within:border-rose-400 focus-within:ring-1 focus-within:ring-rose-200"
                          }`}
                        >
                          <div className="px-3 py-2 sm:py-2.5 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 select-none">
                            <span>+91</span>
                            <span className="text-[8px] text-slate-400">▼</span>
                          </div>
                          <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                            maxLength={10}
                            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none"
                          />
                        </div>
                        {errors.mobileNumber && (
                          <p className="text-[10px] text-rose-500 mt-1">{errors.mobileNumber}</p>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Date of Birth <span className="text-[#E8436E]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            max={new Date().toISOString().split("T")[0]}
                            className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none transition ${
                              errors.dob
                                ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-200"
                                : "border-slate-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                            }`}
                          />
                        </div>
                        {errors.dob && (
                          <p className="text-[10px] text-rose-500 mt-1">{errors.dob}</p>
                        )}
                      </div>
                    </div>

                    {/* 3. User Type * (Both, Caregiver, User) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        User Type <span className="text-[#E8436E]">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {/* Option 1: Both */}
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, userType: "Both" }))}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            formData.userType === "Both"
                              ? "border-rose-300 bg-[#FFF5F7] shadow-2xs"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="w-full flex items-center justify-between mb-1 px-1">
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.userType === "Both"
                                  ? "border-[#E8436E]"
                                  : "border-slate-300"
                              }`}
                            >
                              {formData.userType === "Both" && (
                                <span className="w-2 h-2 rounded-full bg-[#E8436E]" />
                              )}
                            </span>
                            <FiUsers
                              className={`text-base ${
                                formData.userType === "Both" ? "text-[#E8436E]" : "text-slate-600"
                              }`}
                            />
                          </div>
                          <span className="font-bold text-xs text-slate-900 leading-tight">
                            Both
                          </span>
                          <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                            (Caregiver & User)
                          </span>
                        </button>

                        {/* Option 2: Caregiver */}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, userType: "Caregiver" }))
                          }
                          className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            formData.userType === "Caregiver"
                              ? "border-rose-300 bg-[#FFF5F7] shadow-2xs"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="w-full flex items-center justify-between mb-1 px-1">
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.userType === "Caregiver"
                                  ? "border-[#E8436E]"
                                  : "border-slate-300"
                              }`}
                            >
                              {formData.userType === "Caregiver" && (
                                <span className="w-2 h-2 rounded-full bg-[#E8436E]" />
                              )}
                            </span>
                            <FiUser
                              className={`text-base ${
                                formData.userType === "Caregiver"
                                  ? "text-[#E8436E]"
                                  : "text-slate-600"
                              }`}
                            />
                          </div>
                          <span className="font-bold text-xs text-slate-900 leading-tight">
                            Caregiver
                          </span>
                          <span className="text-[10px] text-transparent leading-tight mt-0.5 select-none">
                            -
                          </span>
                        </button>

                        {/* Option 3: User */}
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, userType: "User" }))}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            formData.userType === "User"
                              ? "border-rose-300 bg-[#FFF5F7] shadow-2xs"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="w-full flex items-center justify-between mb-1 px-1">
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.userType === "User"
                                  ? "border-[#E8436E]"
                                  : "border-slate-300"
                              }`}
                            >
                              {formData.userType === "User" && (
                                <span className="w-2 h-2 rounded-full bg-[#E8436E]" />
                              )}
                            </span>
                            <FiHome
                              className={`text-base ${
                                formData.userType === "User" ? "text-[#E8436E]" : "text-slate-600"
                              }`}
                            />
                          </div>
                          <span className="font-bold text-xs text-slate-900 leading-tight">
                            User
                          </span>
                          <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                            (Seeking Care)
                          </span>
                        </button>
                      </div>
                      {errors.userType && (
                        <p className="text-[10px] text-rose-500 mt-1">{errors.userType}</p>
                      )}
                    </div>

                    {/* 4. Address * (Mandatory) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Address <span className="text-[#E8436E]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <FiMapPin className="text-sm" />
                        </div>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="House/Flat No., Building, Street, Locality"
                          className={`w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none transition ${
                            errors.address
                              ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-200"
                              : "border-slate-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                          }`}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>
                      )}
                    </div>

                    {/* 5. City * | Pincode * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          City <span className="text-[#E8436E]">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none transition ${
                            errors.city
                              ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-200"
                              : "border-slate-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                          }`}
                        />
                        {errors.city && (
                          <p className="text-[10px] text-rose-500 mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Pincode <span className="text-[#E8436E]">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Enter pincode"
                          maxLength={6}
                          className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none transition ${
                            errors.pincode
                              ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-200"
                              : "border-slate-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                          }`}
                        />
                        {errors.pincode && (
                          <p className="text-[10px] text-rose-500 mt-1">{errors.pincode}</p>
                        )}
                      </div>
                    </div>

                    {/* 6. Educational Qualification (Optional) | Profession (Optional) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Educational Qualification{" "}
                          <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <select
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition appearance-none cursor-pointer"
                          >
                            {QUALIFICATIONS.map((q, idx) => (
                              <option key={idx} value={idx === 0 ? "" : q}>
                                {q}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Profession{" "}
                          <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <select
                            name="profession"
                            value={formData.profession}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition appearance-none cursor-pointer"
                          >
                            {PROFESSIONS.map((p, idx) => (
                              <option key={idx} value={idx === 0 ? "" : p}>
                                {p}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 7. Aadhaar Card (Mandatory) * (Dashed Pink Border Upload Box) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Aadhaar Card <span className="text-slate-500 font-normal">(Mandatory)</span>{" "}
                        <span className="text-[#E8436E]">*</span>
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        className="hidden"
                      />

                      {aadhaarFile ? (
                        <div className="flex items-center justify-between p-2.5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <FiFileText className="text-sm" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-slate-800 truncate">
                                {aadhaarFile.name}
                              </p>
                              <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                                <FiCheck /> Ready ({(aadhaarFile.size / 1024).toFixed(0)} KB)
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeAadhaarFile}
                            className="p-1 rounded-full hover:bg-rose-100 text-rose-600 transition"
                            title="Remove file"
                          >
                            <FiX className="text-sm" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl py-3 px-4 text-center cursor-pointer transition flex items-center justify-center gap-3 ${
                            errors.aadhaarFile
                              ? "border-rose-400 bg-rose-50/40"
                              : "border-[#F8B4C4] hover:border-[#E8436E] bg-[#FFF8FA] hover:bg-[#FFF0F4]"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-[#FFE5EC] text-[#E8436E] flex items-center justify-center shrink-0">
                            <FiUploadCloud className="text-base" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-bold text-[#E8436E] leading-tight">
                              Upload your Aadhaar Card (Front & Back)
                            </p>
                            <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                              Only Aadhaar Card is required for verification.
                            </p>
                          </div>
                        </div>
                      )}
                      {errors.aadhaarFile && (
                        <p className="text-[10px] text-rose-500 mt-1">{errors.aadhaarFile}</p>
                      )}
                    </div>

                    {/* 8. Terms & Conditions Agreement */}
                    <div className="pt-1">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-600">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => {
                            setAgreedToTerms(e.target.checked);
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.agreedToTerms;
                              return copy;
                            });
                          }}
                          className="w-4 h-4 rounded text-[#E8436E] border-slate-300 focus:ring-rose-400 accent-[#E8436E] cursor-pointer"
                        />
                        <span>
                          I agree to the{" "}
                          <span className="text-[#E8436E] underline font-semibold">
                            Terms & Conditions
                          </span>{" "}
                          and{" "}
                          <span className="text-[#E8436E] underline font-semibold">
                            Privacy Policy
                          </span>
                        </span>
                      </label>
                      {errors.agreedToTerms && (
                        <p className="text-[10px] text-rose-500 mt-1">
                          {errors.agreedToTerms}
                        </p>
                      )}
                    </div>

                    {/* 9. Submit Button: Create Account → */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#FF3B71] to-[#E6285D] hover:from-[#E6285D] hover:to-[#D41C50] active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>
                        <FiArrowRight className="text-base" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── VIEW B: SIGN IN FORM ─────────────────────────────── */}
              {activeTab === "signin" && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header Title */}
                    <div className="mb-3.5">
                      <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#112540] tracking-tight">
                        Sign In to Your Account
                      </h2>
                      <p className="text-slate-500 text-xs sm:text-[13px] mt-1">
                        Welcome back! Enter your login credentials or use quick access.
                      </p>
                    </div>

                    {loginErrors.server && (
                      <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                        {loginErrors.server}
                      </div>
                    )}

                    {/* Quick Demo Login Option */}
                    <div className="mb-3.5 p-3 rounded-2xl bg-[#FFF5F7] border border-rose-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-800">Demo Testing Credentials</p>
                        <p className="text-[11px] text-slate-500">
                          Phone: 7007755306 / Password: Suntech@123
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleQuickDemoFill}
                        className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-[#E8436E] font-bold text-xs hover:bg-rose-50 transition shadow-2xs cursor-pointer"
                      >
                        Fill Demo
                      </button>
                    </div>

                    <form onSubmit={handleSignInSubmit} className="space-y-3">
                      {/* Credential: Phone or Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Mobile Number or Email <span className="text-[#E8436E]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <FiPhone className="text-sm" />
                          </div>
                          <input
                            type="text"
                            value={loginCredential}
                            onChange={(e) => {
                              setLoginCredential(e.target.value);
                              setLoginErrors((prev) => ({ ...prev, login: "" }));
                            }}
                            placeholder="Enter 10-digit mobile number or email"
                            className={`w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none transition ${
                              loginErrors.login
                                ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-200"
                                : "border-slate-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                            }`}
                          />
                        </div>
                        {loginErrors.login && (
                          <p className="text-[10px] text-rose-500 mt-1">{loginErrors.login}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-slate-800">
                            Password <span className="text-[#E8436E]">*</span>
                          </label>
                          <span className="text-xs text-[#E8436E] hover:underline cursor-pointer">
                            Forgot password?
                          </span>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <FiLock className="text-sm" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={loginPassword}
                            onChange={(e) => {
                              setLoginPassword(e.target.value);
                              setLoginErrors((prev) => ({ ...prev, password: "" }));
                            }}
                            placeholder="Enter password"
                            className={`w-full pl-9 pr-10 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none transition ${
                              loginErrors.password
                                ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-200"
                                : "border-slate-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                          </button>
                        </div>
                        {loginErrors.password && (
                          <p className="text-[10px] text-rose-500 mt-1">{loginErrors.password}</p>
                        )}
                      </div>

                      {/* Role / User Type for this Session */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Login Role
                        </label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {["Both", "Caregiver", "User"].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setLoginUserType(type)}
                              className={`py-2 px-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                                loginUserType === type
                                  ? "border-rose-300 bg-[#FFF5F7] text-[#E8436E]"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Submit Sign In Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isLoggingIn}
                          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#FF3B71] to-[#E6285D] hover:from-[#E6285D] hover:to-[#D41C50] active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                          <span>{isLoggingIn ? "Signing In..." : "Sign In to Account"}</span>
                          <FiArrowRight className="text-base" />
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Bottom switcher to Register */}
                  <div className="text-center pt-4">
                    <p className="text-xs text-slate-500">
                      Don't have an account yet?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("register")}
                        className="text-[#E8436E] font-bold hover:underline cursor-pointer"
                      >
                        Create one now
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
