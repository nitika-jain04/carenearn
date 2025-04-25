import React, { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ContactUs = () => {
  const [errors, setErrors] = useState({});

  let [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleValidation() {
    let newErrors = {};

    if (formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters.";

    // debugger;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (handleValidation()) {
      console.log(errors);
      toast.success("Mail Sent ✉️!");
      console.log("Form submitted:", formData); //clear form here or send data to backend

      setFormData({
        name: "",
        email: "",
        address: "",
        subject: "",
        phoneNo: "",
        message: "",
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
      <div className="lg:flex-row flex flex-col gap-5 lg:pt-5">
        <div className="lg:w-1/2 px-5 flex justify-center lg:justify-normal">
          <img
            src="/contact.png"
            alt="image"
            className="rounded-full md:rounded-none size-1/2 lg:size-full"
          />
        </div>

        <div className="lg:w-1/2 px-10 flex flex-col gap-3">
          <p className="text-4xl text-center font-bold text-rose-500">
            Contact CareNearn
          </p>

          <div className="flex justify-center">
            <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
          </div>

          <p className="text-base">
            We're here to support your care journey. Please get in touch to book
            any of our services or ask about your needs.
          </p>

          <div className="flex flex-col">
            <p>
              <span className="font-bold">Address:</span> A-123, Sector 63,
              Noida, Uttar Pradesh - 201301
            </p>
            <p>
              <span className="font-bold">Email:</span> support@carenearn.com
            </p>
            <p>
              <span className="font-bold">Phone:</span> +91 98765 43210
            </p>
            <p>
              <span className="font-bold">Hours:</span> Mon-Sat | 9:00 AM - 6:00
              PM
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-5 lg:gap-10 justify-between items-center">
              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">
                  Name
                  <span className="text-red-600 font-semibold text-lg">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-1 placeholder:text-xs rounded-sm outline-none"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-[10px] font-semibold">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">
                  Email
                  <span className="text-red-600 font-semibold text-lg">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-1 placeholder:text-xs rounded-sm outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="flex gap-5 lg:gap-10 justify-between items-center">
              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Phone</label>
                <input
                  type="number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="border border-gray-300 p-1 placeholder:text-xs rounded-sm outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 p-1 placeholder:text-xs rounded-sm outline-none"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Subject</label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="border border-gray-300 p-1 placeholder:text-xs rounded-sm outline-none"
                placeholder="Enter your subject"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Message</label>
              <textarea
                type=""
                name="message"
                rows={5}
                placeholder="Enter your message"
                className="border border-gray-300 p-1 placeholder:text-xs rounded-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-rose-500 text-white text-xl px-28 py-2 rounded-md w-fit font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
