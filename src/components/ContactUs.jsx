import React, { useState, useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ContactUs = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    subject: "",
    message: "",
  });

  // ✅ useEffect to pre-fill fields from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.emailId || "",
          phoneNo: user.phoneNumber || "",
          address: user.address || "",
        }));
      } catch (err) {
        console.error("Failed to parse user data from localStorage:", err);
      }
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "phoneNo") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleValidation() {
    let newErrors = {};

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (formData.phoneNo) {
      if (formData.phoneNo.length !== 10) {
        newErrors.phoneNo = "Phone number must be exactly 10 digits.";
      } else if (formData.phoneNo.startsWith("0")) {
        newErrors.phoneNo = "Phone number cannot start with 0.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (handleValidation()) {
      setIsSubmitting(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNo,
        address: formData.address,
        subject: formData.subject,
        message: formData.message,
      };

      fetch("http://192.168.0.205:5001/api/careNearn/user/contactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send email");
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Message sent successfully! ✉️");
          console.log("Response from backend:", data);

          // Reset form
          setFormData({
            name: "",
            email: "",
            address: "",
            subject: "",
            phoneNo: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Failed to send message. Please try again later.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      toast.error("Please fix the errors in the form.");
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
        transition={Bounce}
        newestOnTop
      />

      <div className="w-full">
        {/* ── Hero Banner ────────────────────────────────────────────── */}
        <div className="relative overflow-hidden">
          <img
            src="/our-vision.jpg"
            alt="Contact Us Banner"
            className="h-60 w-full object-cover object-center rounded-b-[60px] md:rounded-b-[100px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/80 via-rose-500/70 to-pink-500/70 rounded-b-[60px] md:rounded-b-[100px]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs md:text-sm font-medium tracking-wider uppercase mb-2 shadow-sm border border-white/30">
              💬 We're Here to Help
            </span>
            <h1 className="text-white font-bold text-4xl md:text-5xl drop-shadow-md">
              Contact CareNearn
            </h1>
            <p className="text-white/90 text-sm md:text-base max-w-xl mt-2 font-normal">
              Have questions or need assistance with care services? Reach out to our team and we'll gladly assist you.
            </p>
          </div>
        </div>

        {/* ── Main Content Container ─────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* ── Left Column: Contact Details & Info Card ──────────── */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                <p className="text-rose-100 text-sm mb-8 leading-relaxed">
                  We're here to support your care journey. Reach out anytime to book services or ask questions.
                </p>

                <div className="space-y-6 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white/90">Our Office</p>
                      <p className="text-rose-100 mt-0.5 leading-snug">
                        A-123, Sector 63, Noida, Uttar Pradesh - 201301
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white/90">Email Support</p>
                      <a href="mailto:support@carenearn.com" className="text-rose-100 hover:underline mt-0.5 block">
                        support@carenearn.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white/90">Phone Contact</p>
                      <a href="tel:+919876543210" className="text-rose-100 hover:underline mt-0.5 block">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white/90">Working Hours</p>
                      <p className="text-rose-100 mt-0.5">
                        Mon - Sat | 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic card / Image */}
              {/* <div className="hidden lg:flex items-center justify-center p-6 bg-rose-50/60 rounded-3xl border border-rose-100/80">
                <img
                  src="/contact.png"
                  alt="Contact illustration"
                  className="max-h-64 object-contain rounded-2xl"
                />
              </div> */}
            </div>

            {/* ── Right Column: Interactive Form ─────────────────────── */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Fill out the form below and we will get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400"
                    />
                    {errors.name && (
                      <p className="text-rose-500 text-xs font-medium mt-0.5">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      maxLength="10"
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400"
                    />
                    {errors.phoneNo && (
                      <p className="text-rose-500 text-xs font-medium mt-0.5">
                        {errors.phoneNo}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Location / City
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Sector 62, Noida"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is your inquiry about?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us more about what you're looking for..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400 resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-3.5 rounded-2xl font-semibold text-white text-base
                    bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 transition-all duration-300
                    ${isSubmitting
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
