import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import NestedCheckbox from "./NestedCheckbox";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/actions";

const USER_TYPES = [
  {
    value: "Care Giver",
    label: "Care Giver",
    purposes: [
      {
        categoryName: "Child Education",
        items: [
          "Homework",
          "Projects",
          "Exams",
          "Upgrade Skills",
          "Child Care",
        ],
      },
      {
        categoryName: "Senior",
        items: [
          "Take them to hospital",
          "Spend time reading books or stories",
          "Involve them in anything they like",
          "Take them to Shopping",
        ],
      },
      {
        categoryName: "Activities",
        items: [
          "Chess/Board Games",
          "Creative arts/Painting/Sculpture",
          "Creative Games/Lego/Builders/Writings",
          "Story Sessions",
        ],
      },
    ],
  },
  {
    value: "Business",
    label: "Business",
    purposes: [
      {
        categoryName: "Business Options",
        items: ["Care Giver", "Care Receiver", "Both"],
      },
      {
        categoryName: "Care Nurturers",
        items: [
          "Organise my Party",
          "Organise Party Games",
          "Food/Bakery/Desert",
        ],
      },
    ],
  },
  {
    value: "Care Receiver",
    label: "Care Receiver",
    purposes: [
      {
        categoryName: "Child Education",
        items: [
          "Homework",
          "Projects",
          "Exams",
          "Upgrade Skills",
          "Child Care",
        ],
      },
      {
        categoryName: "Senior",
        items: [
          "Take them to hospital",
          "Spend time reading books or stories",
          "Involve them in anything they like",
          "Take them to Shopping",
        ],
      },
      {
        categoryName: "Activities",
        items: [
          "Chess/Board Games",
          "Creative arts/Painting/Sculpture",
          "Creative Games/Lego/Builders/Writings",
          "Story Sessions",
        ],
      },
    ],
  },
];

function RegisterForm() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    emailId: "",
    dateOfBirth: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    reasonToJoin: "",
    educationalQualifications: "",
    profession: "",
    status: "",
    password: "",
    confirmPassword: "",
    userTypes: state?.selectedRoles ? [state.selectedRoles] : [],
    purposes: [],
  });

  const [businessOptions, setBusinessOptions] = useState({
    careGiver: false,
    careReceiver: false,
    both: false,
  });

  const [aadharCard, setAadharCard] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [picture, setPicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhoneNumber = useCallback((phone) => {
    return /^[789][0-9]{9}$/.test(phone);
  }, []);

  const validatePassword = useCallback((password) => {
    const hasMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasMinLength && hasUpperCase && hasNumber && hasSpecialChar,
      messages: [
        !hasMinLength && "Password must be at least 6 characters",
        !hasUpperCase && "Password must contain at least one uppercase letter",
        !hasNumber && "Password must contain at least one number",
        !hasSpecialChar &&
          "Password must contain at least one special character",
      ].filter(Boolean),
    };
  }, []);

  const validateEmail = useCallback((email) => {
    return /^[a-z][a-zA-Z00-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }, []);

  const validateBusinessOptions = useCallback(() => {
    if (formData.userTypes.includes("Business")) {
      const hasSelection =
        businessOptions.careGiver ||
        businessOptions.careReceiver ||
        businessOptions.both;
      return hasSelection;
    }
    return true;
  }, [businessOptions, formData.userTypes]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be valid";
    }
    if (!formData.emailId) {
      newErrors.emailId = "Email is required";
    } else if (!validateEmail(formData.emailId)) {
      newErrors.emailId =
        "Email must start with a lowercase letter and be valid";
    }
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.reasonToJoin)
      newErrors.reasonToJoin = "Reason to join is required";
    if (!formData.educationalQualifications) {
      newErrors.educationalQualifications =
        "Educational qualifications are required";
    }
    if (!formData.profession) newErrors.profession = "Profession is required";

    if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits and not start with 0";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = ["Password is required"];
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.messages;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // File validation
    if (!aadharCard) newErrors.aadharCard = "Aadhar card is required";
    if (!addressProof) newErrors.addressProof = "Address proof is required";
    if (!picture) newErrors.picture = "Picture is required";

    // User types validation
    if (formData.userTypes.length === 0) {
      newErrors.userTypes = "Please select at least one user type";
    }

    // Business options validation
    if (formData.userTypes.includes("Business") && !validateBusinessOptions()) {
      newErrors.businessOptions = "Please select at least one business option";
    }

    const purposeErrors = {};
    formData.userTypes.forEach((userType) => {
      if (userType === "Business") return; // Skip for Business as we handle it separately

      const userTypePurposes = formData.purposes.filter(
        (purpose) => purpose.roleName === userType
      );

      const hasSelectedPurpose = userTypePurposes.some((purpose) =>
        purpose.items.some((item) => item.selected)
      );

      if (!hasSelectedPurpose) {
        purposeErrors[userType] = true;
      }
    });

    if (Object.keys(purposeErrors).length > 0) {
      newErrors.purposes = purposeErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    formData,
    validatePhoneNumber,
    validateEmail,
    validatePassword,
    validateBusinessOptions,
    aadharCard,
    addressProof,
    picture,
    businessOptions,
  ]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    if (name === "emailId" && value.length === 1) {
      setFormData((prev) => ({
        ...prev,
        [name]: value.toLowerCase(),
      }));
      return;
    }

    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 6) return;
      if (numericValue.length > 0 && numericValue[0] === "0") return;

      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      return;
    }

    // Special validation for phone number
    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      if (numericValue.length > 0 && numericValue[0] === "0") return;

      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFileChange = useCallback((e, setFile, fieldName) => {
    const file = e.target.files[0];
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });

    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setFile(file);
    } else {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Please upload a valid PDF or image file",
      }));
    }
  }, []);

  const handleUserTypeChange = useCallback((userType) => {
    setFormData((prev) => {
      const newUserTypes = prev.userTypes.includes(userType)
        ? prev.userTypes.filter((type) => type !== userType)
        : [...prev.userTypes, userType];

      // Filter out purposes for deselected user types
      const newPurposes = prev.purposes.filter((purpose) =>
        newUserTypes.includes(purpose.roleName)
      );

      return {
        ...prev,
        userTypes: newUserTypes,
        purposes: newPurposes,
      };
    });

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.userTypes;
      if (userType === "Business") delete newErrors.businessOptions;
      return newErrors;
    });
  }, []);

  const handleBusinessOptionChange = useCallback((option) => {
    setBusinessOptions((prev) => {
      // For Business options, only one should be selected at a time (mutually exclusive)
      if (option === "both") {
        return {
          careGiver: false,
          careReceiver: false,
          both: !prev.both,
        };
      } else if (option === "careGiver") {
        return {
          careGiver: !prev.careGiver,
          careReceiver: false,
          both: false,
        };
      } else if (option === "careReceiver") {
        return {
          careGiver: false,
          careReceiver: !prev.careReceiver,
          both: false,
        };
      }
      return prev;
    });

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.businessOptions;
      return newErrors;
    });
  }, []);

  useEffect(() => {
    const fetchCityState = async () => {
      const pincode = formData.pincode;

      // Only proceed if we have exactly 6 digits
      if (pincode.length === 6 && /^[1-9][0-9]{5}$/.test(pincode)) {
        try {
          console.log("Fetching pincode data for:", pincode);
          const res = await fetch(
            `https://api.postalpincode.in/pincode/${pincode}`
          );

          if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
          }

          const data = await res.json();
          console.log("API Response:", data);

          if (
            data[0]?.Status === "Success" &&
            data[0]?.PostOffice?.length > 0
          ) {
            const postOffice = data[0].PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              city: postOffice.District,
              state: postOffice.State,
            }));
            setErrors((prev) => ({
              ...prev,
              pincode: undefined, // Clear any pincode error
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              city: "",
              state: "",
            }));
            setErrors((prev) => ({
              ...prev,
              pincode: "No results found for this pincode",
            }));
          }
        } catch (error) {
          console.error("Pincode API error:", error);
          setFormData((prev) => ({
            ...prev,
            city: "",
            state: "",
          }));
          setErrors((prev) => ({
            ...prev,
            pincode: "Failed to fetch pincode details",
          }));
        }
      } else if (pincode.length === 6) {
        // If exactly 6 digits but invalid format
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
        setErrors((prev) => ({
          ...prev,
          pincode: "Invalid pincode format",
        }));
      } else if (pincode.length > 0 && pincode.length < 6) {
        // Clear city/state if pincode is incomplete
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    };

    // Add debounce to avoid rapid API calls
    const timer = setTimeout(fetchCityState, 500);
    return () => clearTimeout(timer);
  }, [formData.pincode]);

  const handlePurposeChange = useCallback((roleName, updatedCategory) => {
    setFormData((prev) => {
      const existingIndex = prev.purposes.findIndex(
        (cat) =>
          cat.roleName === roleName &&
          cat.categoryName === updatedCategory.categoryName
      );

      let newPurposes = [...prev.purposes];
      if (existingIndex >= 0) {
        newPurposes[existingIndex] = {
          roleName,
          ...updatedCategory,
        };
      } else {
        newPurposes.push({
          roleName,
          ...updatedCategory,
        });
      }

      // Filter out categories with no selected items
      newPurposes = newPurposes.filter((cat) =>
        cat.items.some((item) => item.selected)
      );

      return {
        ...prev,
        purposes: newPurposes,
      };
    });

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.purposes;
      return newErrors;
    });
  }, []);

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();

      const isValid = validateForm();
      if (!isValid) return;

      try {
        setIsSubmitting(true);

        // Format userTypes based on whether it's Business or other roles
        const formattedUserTypes = formData.userTypes.map((userType) => {
          if (userType === "Business") {
            // Determine businessActsAs based on selected business options
            let businessActsAs = "";
            if (businessOptions.both) {
              businessActsAs = "Both";
            } else if (businessOptions.careGiver) {
              businessActsAs = "Care Giver";
            } else if (businessOptions.careReceiver) {
              businessActsAs = "Care Receiver";
            }

            return {
              roleName: userType,
              businessActsAs: businessActsAs,
            };
          } else {
            return {
              roleName: userType,
            };
          }
        });

        // Create base user data with the exact format expected by backend
        const userData = {
          name: formData.name,
          emailId: formData.emailId,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          address: formData.address,
          pincode: formData.pincode,
          reasonToJoin: formData.reasonToJoin,
          educationalQualifications: formData.educationalQualifications,
          profession: formData.profession,
          status: formData.status || "NOT_VERIFIED",
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          userTypes: formattedUserTypes,
          purposes: formData.purposes, // Send purposes as-is (with label and selected properties)
        };

        console.log("Sending user data:", JSON.stringify(userData, null, 2));

        const formPayload = new FormData();

        // Append the user object as JSON string
        formPayload.append("user", JSON.stringify(userData));

        // Append files
        if (aadharCard) {
          formPayload.append("aadharCard", aadharCard);
        }

        if (addressProof) {
          formPayload.append("addressProof", addressProof);
        }

        if (picture) {
          formPayload.append("picture", picture);
        }

        // Log FormData contents for debugging
        for (let [key, value] of formPayload.entries()) {
          if (key === "user") {
            console.log("FormData user:", value);
          } else {
            console.log("FormData file:", key, value.name);
          }
        }

        const response = await fetch(
          "http://192.168.0.205:5001/api/careNearn/user/register",
          {
            method: "POST",
            body: formPayload,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const result = await response.json();
        console.log("Registration successful:", result);

        // Dispatch to Redux store if needed
        dispatch(
          updateProfile({
            ...userData,
            imageUrl: picture ? URL.createObjectURL(picture) : null,
          })
        );

        navigate("/");
      } catch (err) {
        console.error("Registration error:", err);
        setErrors((prev) => ({
          ...prev,
          form: err.message || "An error occurred during registration",
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      validateForm,
      formData,
      businessOptions,
      aadharCard,
      addressProof,
      picture,
      dispatch,
      navigate,
    ]
  );

  const userTypesCheckboxes = useMemo(
    () =>
      USER_TYPES.map((type) => (
        <div key={type.value} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={type.value}
            checked={formData.userTypes.includes(type.value)}
            onChange={() => handleUserTypeChange(type.value)}
          />
          <label htmlFor={type.value}>{type.label}</label>
        </div>
      )),
    [formData.userTypes, handleUserTypeChange]
  );

  const purposeSections = useMemo(
    () =>
      formData.userTypes.map((userType) => {
        const typeConfig = USER_TYPES.find((t) => t.value === userType);
        const hasError = errors.purposes?.[userType];

        if (userType === "Business") {
          return (
            <div key="business" className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">
                Business Options
              </h3>
              {errors.businessOptions && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.businessOptions}
                </p>
              )}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="business-caregiver"
                    checked={businessOptions.careGiver}
                    onChange={() => handleBusinessOptionChange("careGiver")}
                  />
                  <label htmlFor="business-caregiver">Care Giver</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="business-carereceiver"
                    checked={businessOptions.careReceiver}
                    onChange={() => handleBusinessOptionChange("careReceiver")}
                  />
                  <label htmlFor="business-carereceiver">Care Receiver</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="business-both"
                    checked={businessOptions.both}
                    onChange={() => handleBusinessOptionChange("both")}
                  />
                  <label htmlFor="business-both">Both</label>
                </div>
              </div>

              {/* Render the Care Nurturers purposes for Business */}
              {typeConfig.purposes
                .filter((p) => p.categoryName === "Care Nurturers")
                .map((purpose) => (
                  <NestedCheckbox
                    key={`business-${purpose.categoryName}`}
                    roleName="Business"
                    label={purpose.categoryName}
                    childrenOptions={purpose.items}
                    onChange={(updatedCategory) =>
                      handlePurposeChange("Business", updatedCategory)
                    }
                  />
                ))}
            </div>
          );
        }

        // Original rendering for other user types
        return (
          <div key={userType} className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">
              {userType} Purposes
            </h3>
            {hasError && (
              <p className="text-red-500 text-sm mb-2">
                Please select at least one purpose for {userType}
              </p>
            )}
            {typeConfig.purposes.map((purpose) => (
              <NestedCheckbox
                key={`${userType}-${purpose.categoryName}`}
                roleName={userType}
                label={purpose.categoryName}
                childrenOptions={purpose.items}
                onChange={(updatedCategory) =>
                  handlePurposeChange(userType, updatedCategory)
                }
              />
            ))}
          </div>
        );
      }),
    [
      formData.userTypes,
      errors.purposes,
      errors.businessOptions,
      businessOptions,
      handleBusinessOptionChange,
      handlePurposeChange,
    ]
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* ── Left Side: Brand & Visual Showcase ────────────────────── */}
      <div className="lg:w-1/2 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Logo Header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
              Care<span className="text-rose-200">Nearn</span>
            </span>
          </Link>
        </div>

        {/* Center Illustration */}
        <div className="relative z-10 flex flex-col items-center justify-center py-8 lg:py-4">
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-white/10 backdrop-blur-md p-4 shadow-2xl border border-white/20 flex items-center justify-center">
            <img
              src="/login.png"
              alt="CareNearn Register"
              className="w-full h-full object-contain rounded-2xl drop-shadow-lg"
            />
          </div>

          <div className="mt-8 text-center max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Create Your Profile
            </h2>
            <p className="text-rose-100 text-sm mt-2 leading-relaxed">
              Complete your profile details to start connecting with trusted clients and caretakers.
            </p>
          </div>
        </div>

        {/* Value Prop Badges */}
        <div className="relative z-10 flex flex-wrap gap-2 justify-center pt-4">
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ Quick Registration
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ Verified Community
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ Full Privacy Control
          </span>
        </div>
      </div>

      {/* ── Right Side: Register Form ──────────────────────────────── */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 my-6">
          {/* Navigation Pill Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
            <Link to="/login" className="flex-1">
              <button
                type="button"
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  pathname === "/login"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Sign In
              </button>
            </Link>
            <Link to="/register" className="flex-1">
              <button
                type="button"
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  pathname.startsWith("/register")
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Register
              </button>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Personal Information
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Please provide accurate information for verification and onboarding.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-3 text-sm scrollbar-thin">
              <InputField
                label="Full Name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                error={errors.name}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="10-digit phone number"
                  type="tel"
                  error={errors.phoneNumber}
                />
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  error={errors.dateOfBirth}
                />
              </div>
              <InputField
                label="Email Address"
                name="emailId"
                required
                value={formData.emailId}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                error={errors.emailId}
              />
              <InputField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address or area"
              />
              <InputField
                name="pincode"
                label="Pincode"
                required
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="6-digit pincode"
                error={errors.pincode}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={() => {}}
                  placeholder="Auto-filled City"
                  readOnly
                  error={null}
                />

                <InputField
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={() => {}}
                  placeholder="Auto-filled State"
                  readOnly
                  error={null}
                />
              </div>

              {/* Uploads Section */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Verification Documents
                </p>
                <FileInput
                  label="Address Proof (PDF)"
                  required
                  onChange={(e) =>
                    handleFileChange(e, setAddressProof, "addressProof")
                  }
                  error={errors.addressProof}
                />
                <FileInput
                  label="Upload Aadhar Card (PDF)"
                  required
                  onChange={(e) =>
                    handleFileChange(e, setAadharCard, "aadharCard")
                  }
                  error={errors.aadharCard}
                />
                <ImageFileInput
                  label="Profile Picture (JPG, PNG)"
                  required
                  onChange={(e) => handleFileChange(e, setPicture, "picture")}
                  error={errors.picture}
                />
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Professional Background
                </p>
                <InputField
                  label="Reason to Join"
                  name="reasonToJoin"
                  required
                  value={formData.reasonToJoin}
                  onChange={handleInputChange}
                  placeholder="Why do you want to join CareNearn?"
                  error={errors.reasonToJoin}
                />
                <InputField
                  label="Educational Qualifications"
                  name="educationalQualifications"
                  required
                  value={formData.educationalQualifications}
                  onChange={handleInputChange}
                  placeholder="e.g. B.Sc Nursing, B.Ed, Graduate"
                  error={errors.educationalQualifications}
                />
                <InputField
                  label="Profession"
                  name="profession"
                  required
                  value={formData.profession}
                  onChange={handleInputChange}
                  placeholder="e.g. Teacher, Nurse, Student, Freelancer"
                  error={errors.profession}
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <label className="font-semibold text-gray-700 text-sm">
                  User Types <span className="text-rose-500">*</span>
                </label>
                {errors.userTypes && (
                  <span className="text-xs text-rose-500 font-medium">
                    {errors.userTypes}
                  </span>
                )}
                <div className="flex flex-wrap gap-4 bg-slate-50 p-3.5 rounded-2xl border border-gray-100">
                  {userTypesCheckboxes}
                </div>
              </div>

              {/* Render purposes only for selected user types */}
              {purposeSections}

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Security
                </p>
                <PasswordField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  isVisible={showPassword}
                  toggleVisibility={() => setShowPassword(!showPassword)}
                  error={errors.password}
                />
                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  isVisible={showConfirmPassword}
                  toggleVisibility={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  error={errors.confirmPassword}
                />
              </div>

              {errors.form && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-medium rounded-r-xl">
                  {errors.form}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl font-semibold text-white text-base
                bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 transition-all duration-300
                ${
                  isSubmitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>Complete Registration</span>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-rose-600 hover:underline underline-offset-2"
              >
                Sign In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  name,
  required,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = null,
  readOnly = false,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs sm:text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400 ${
        error ? "border-rose-500 bg-red-50/20" : ""
      } ${readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
    />
    {error && (
      <span className="text-xs text-rose-500 font-medium">
        {Array.isArray(error) ? error.join(", ") : error}
      </span>
    )}
  </div>
);

const ImageFileInput = ({ label, required, onChange, error = null }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs sm:text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="p-2.5 rounded-xl border border-dashed border-gray-300 bg-slate-50 hover:bg-rose-50/40 hover:border-rose-300 transition">
      <input
        type="file"
        required={required}
        onChange={onChange}
        accept=".jpg,.jpeg,.png"
        className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200 cursor-pointer"
      />
    </div>
    {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
  </div>
);

const FileInput = ({ label, required, onChange, error = null }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs sm:text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="p-2.5 rounded-xl border border-dashed border-gray-300 bg-slate-50 hover:bg-rose-50/40 hover:border-rose-300 transition">
      <input
        type="file"
        required={required}
        onChange={onChange}
        accept=".pdf"
        className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200 cursor-pointer"
      />
    </div>
    {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
  </div>
);

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  isVisible,
  toggleVisibility,
  error = null,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs sm:text-sm font-semibold text-gray-700">
      {label} <span className="text-rose-500">*</span>
    </label>
    <div className="relative flex items-center">
      <input
        type={isVisible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        required
        className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400 ${
          error ? "border-rose-500 bg-red-50/20" : ""
        }`}
      />
      <button
        type="button"
        className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
        onClick={toggleVisibility}
        tabIndex={-1}
      >
        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
    {error && (
      <span className="text-xs text-rose-500 font-medium">
        {Array.isArray(error) ? (
          <ul className="list-disc pl-4 space-y-0.5">
            {error.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        ) : (
          error
        )}
      </span>
    )}
  </div>
);

export default RegisterForm;
