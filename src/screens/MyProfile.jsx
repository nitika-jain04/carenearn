import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/actions/index.js";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function MyProfile() {
  const dispatch = useDispatch();
  const [initialProfile, setInitialProfile] = useState(null);
  const profile = useSelector((state) => state.user.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal"); // personal | professional | services | bookings
  const [successMsg, setSuccessMsg] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    emailId: "",
    address: "",
    pincode: "",
    dateOfBirth: "",
    reasonToJoin: "",
    educationalQualifications: "",
    profession: "",
    userTypes: ["Care Receiver"],
    purposes: [],
    imageUrl: "/default-profile.svg",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      let data = profile;
      if (!data) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          data = JSON.parse(storedUser);
        }
      }

      if (data) {
        setInitialProfile({ ...data });
        setFormData({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          emailId: data.emailId || "",
          address: data.address || "",
          pincode: data.pincode || "",
          dateOfBirth: data.dateOfBirth || "",
          reasonToJoin: data.reasonToJoin || "",
          educationalQualifications: data.educationalQualifications || "",
          profession: data.profession || "",
          userTypes: data.userTypes || (data.userType ? [data.userType] : ["Care Receiver"]),
          purposes: data.purposes || [],
          imageUrl: data.picture || "/default-profile.svg",
        });
      }
    } catch (err) {
      console.error("Error initializing form data:", err);
      setError("Failed to load profile data");
    }
  }, [profile]);

  // Calculate profile completeness score (%)
  const calculateCompleteness = () => {
    const fields = [
      formData.name,
      formData.phoneNumber,
      formData.emailId,
      formData.address,
      formData.pincode,
      formData.dateOfBirth,
      formData.reasonToJoin,
      formData.educationalQualifications,
      formData.profession,
    ];
    const filled = fields.filter((f) => String(f || "").trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completeness = calculateCompleteness();

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber.trim()))
      return "Phone number must be 10 digits";
    if (
      formData.emailId &&
      !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.emailId.trim())
    )
      return "Valid email format is required";
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode.trim()))
      return "Pincode must be 6 digits";
    return null;
  };

  const updateUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return null;
      }

      /*
      // =========================================================================
      // ORIGINAL BACKEND API UPDATE CALL (Commented out & Bypassed for testing)
      // =========================================================================
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User session not found");
      const user = JSON.parse(storedUser);
      if (!user?.id) throw new Error("User ID not found");

      const formPayload = new FormData();
      const userData = { id: String(user.id) };

      const updatableFields = [
        "name", "phoneNumber", "emailId", "address", "pincode",
        "dateOfBirth", "reasonToJoin", "educationalQualifications", "profession"
      ];

      updatableFields.forEach((field) => {
        if (formData[field] !== (profile?.[field] || "")) {
          userData[field] = formData[field];
        }
      });

      formPayload.append("user", JSON.stringify(userData));
      if (formData.imageFile) {
        formPayload.append("picture", formData.imageFile);
      }

      const response = await fetch(
        "http://192.168.0.205:5001/api/careNearn/user/update",
        {
          method: "PUT",
          body: formPayload,
        }
      );

      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText.message || "Failed to update profile");
      }

      const result = await response.json();
      return result;
      // =========================================================================
      */

      // Client-side local update bypass
      const merged = {
        ...(profile || {}),
        ...formData,
        picture: formData.imageUrl,
      };
      return merged;
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const updated = await updateUserProfile();
        if (!updated) return; // validation error

        localStorage.setItem("user", JSON.stringify(updated));
        dispatch(updateProfile(updated));

        setIsEditing(false);
        setSuccessMsg("Profile saved successfully!");
        setTimeout(() => setSuccessMsg(null), 3000);
      } catch (err) {
        console.error(err);
      }
    } else {
      setIsEditing(true);
      setSuccessMsg(null);
    }
  };

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          throw new Error("Please select an image file");
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Image size should be less than 5MB");
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ── Hero Profile Header Card ───────────────────────────────────────── */}
        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden mb-8 relative">
          
          {/* Top Banner Gradient */}
          <div className="h-36 sm:h-48 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Profile Picture & Main Details Row */}
          <div className="px-6 sm:px-10 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* Profile Avatar */}
              <div className="relative group">
                <img
                  src={formData.imageUrl}
                  alt={formData.name || "User Profile"}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white"
                  onError={(e) => {
                    e.target.src = "/default-profile.svg";
                    e.target.onerror = null;
                  }}
                />

                {isEditing && (
                  <label
                    htmlFor="imageUpload"
                    className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-1 transition-opacity opacity-90 hover:opacity-100 backdrop-blur-xs"
                  >
                    <span>📷 Change Photo</span>
                  </label>
                )}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={!isEditing}
                />
              </div>

              {/* Title & Role Badges */}
              <div className="sm:pb-2 space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {formData.name || "CareNearn User"}
                  </h1>
                  {formData.userTypes?.map((role, i) => (
                    <span
                      key={i}
                      className="px-3 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200/70"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <p className="text-gray-500 font-medium text-sm">
                  {formData.profession || "Community Member"}
                </p>
              </div>
            </div>

            {/* Edit / Save Action Button */}
            <div className="sm:pb-2 w-full sm:w-auto flex flex-col items-center sm:items-end gap-2">
              <button
                type="button"
                onClick={handleEditClick}
                disabled={isLoading}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isEditing
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                    : "bg-gradient-to-r from-rose-500 to-pink-500 hover:shadow-lg text-white shadow-rose-500/25 hover:scale-105 active:scale-100"
                } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : isEditing ? (
                  "💾 Save Changes"
                ) : (
                  "✏️ Edit Profile"
                )}
              </button>
            </div>
          </div>

          {/* Profile Completeness Bar */}
          <div className="px-6 sm:px-10 py-3 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-1/2">
              <span className="font-bold text-gray-700">Profile Completion:</span>
              <div className="flex-grow bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completeness}%` }}
                />
              </div>
              <span className="font-extrabold text-rose-600">{completeness}%</span>
            </div>
            <span className="text-gray-400 font-medium">
              {completeness === 100
                ? "🎉 All details updated!"
                : "Complete all fields to boost your credibility"}
            </span>
          </div>
        </div>

        {/* ── Success Banner ────────────────────────────────────────────────── */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-sm flex items-center gap-2 shadow-xs animate-fadeIn">
            <span>✓</span> {successMsg}
          </div>
        )}

        {/* ── Error Banner ──────────────────────────────────────────────────── */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold text-sm flex items-center justify-between shadow-xs">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="text-rose-500 font-bold">
              ✕
            </button>
          </div>
        )}

        {/* ── Navigation Tabs ───────────────────────────────────────────────── */}
        <div className="flex border-b border-gray-200 mb-6 gap-2 sm:gap-4 overflow-x-auto pb-1">
          {[
            { id: "personal", label: "👤 Personal Details" },
            { id: "professional", label: "🎓 Education & Bio" },
            { id: "services", label: "🎯 Services Offered" },
            { id: "bookings", label: "📋 Booking Activity" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-rose-50 text-rose-600 shadow-xs border border-rose-200/60"
                  : "text-gray-600 hover:text-rose-600 hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ───────────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          
          {/* TAB 1: Personal Details */}
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    isEditing
                      ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                      : "border-gray-200 bg-slate-50 text-gray-800"
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="10 digit number"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    isEditing
                      ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                      : "border-gray-200 bg-slate-50 text-gray-800"
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={formData.emailId}
                  onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    isEditing
                      ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                      : "border-gray-200 bg-slate-50 text-gray-800"
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  disabled={!isEditing}
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    isEditing
                      ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                      : "border-gray-200 bg-slate-50 text-gray-800"
                  }`}
                />
              </div>

              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House No., Street, Locality"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      isEditing
                        ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                        : "border-gray-200 bg-slate-50 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Pincode
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="6 digit pincode"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      isEditing
                        ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                        : "border-gray-200 bg-slate-50 text-gray-800"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Education & Bio */}
          {activeTab === "professional" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Profession / Role Title
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="e.g. Senior Care Specialist, Tutor"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      isEditing
                        ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                        : "border-gray-200 bg-slate-50 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Educational Qualifications
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.educationalQualifications}
                    onChange={(e) =>
                      setFormData({ ...formData, educationalQualifications: e.target.value })
                    }
                    placeholder="e.g. B.Sc Nursing, M.A. Psychology"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      isEditing
                        ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                        : "border-gray-200 bg-slate-50 text-gray-800"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Reason to Join CareNearn
                </label>
                <textarea
                  rows={4}
                  disabled={!isEditing}
                  value={formData.reasonToJoin}
                  onChange={(e) => setFormData({ ...formData, reasonToJoin: e.target.value })}
                  placeholder="Tell us what motivates you to share care or offer support..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    isEditing
                      ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                      : "border-gray-200 bg-slate-50 text-gray-800"
                  }`}
                />
              </div>
            </div>
          )}

          {/* TAB 3: Services Offered */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">Active Services List</h3>
                <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-md">
                  {formData.purposes?.length || 0} Categories Selected
                </span>
              </div>

              {formData.purposes && formData.purposes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.purposes.map((purpose, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2"
                    >
                      <h4 className="font-bold text-xs text-rose-600 uppercase tracking-wide">
                        {purpose.roleName} · {purpose.categoryName}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {purpose.items
                          ?.filter((item) => item.selected)
                          ?.map((item, itemIdx) => (
                            <span
                              key={itemIdx}
                              className="px-2.5 py-1 bg-white text-gray-800 border border-gray-200 rounded-lg text-xs font-semibold shadow-2xs"
                            >
                              ✓ {item.label}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm">No custom services saved yet.</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Search or select services on Find Help / Find a Job to automatically update your preferences.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Booking Activity */}
          {activeTab === "bookings" && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-600">CN-849201</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                      Confirmed
                    </span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">Booking with Sunita Verma</p>
                  <p className="text-xs text-gray-500">Service: Hospital assistance & companion care</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-500">29 Sep 2026</p>
                  <span className="text-xs text-emerald-700 font-bold">Active</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default MyProfile;
