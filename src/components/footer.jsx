import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="mt-10 px-10 pt-14 pb-5 bg-pink-50">
      <div className="grid grid-cols-2 gap-16 lg:flex items-start">
        <div className="lg:w-1/4 flex flex-col gap-5">
          <img src="/logo-navbar.png" alt="Logo" className="lg:w-1/2" />
          <p className="text-justify">
            CareNearn is a trusted Indian platform offering compassionate care
            and support for children and individuals with special needs.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:w-1/6">
          <p className="font-bold text-xl text-rose-500">Quick Links</p>

          <Link
            to="/"
            className="hover:underline-offset-2 hover:underline decoration-rose-500 decoration-5"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="hover:underline-offset-2 hover:underline decoration-rose-500 decoration-5"
          >
            About Us
          </Link>
          <Link
            to="/find-help"
            className="hover:underline-offset-2 hover:underline decoration-rose-500 decoration-5"
          >
            Need Help?
          </Link>
          <Link
            to="/contact-us"
            className="hover:underline-offset-2 hover:underline decoration-rose-500 decoration-5"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col gap-3 lg:w-1/4">
          <p className="font-bold text-xl text-rose-500">Contact</p>

          <a href="">
            <span className="font-bold">Phone:</span> +91 98765 43210
          </a>
          <a href="">
            <span className="font-bold">Email:</span> support@carenearn.com
          </a>
          <a href="">
            <span className="font-bold">Location:</span> Noida, Uttar Pradesh,
            India
          </a>
        </div>

        <div className="flex flex-col gap-3 lg:w-1/6">
          <p className="font-bold text-xl text-rose-500">Follow Us</p>

          <div className="flex gap-2">
            <FaLinkedinIn className="text-blue-800 lg:size-8 size-10" />
            <RiInstagramFill className="text-pink-500 lg:size-8 size-10" />
            <FaTwitter className="text-blue-700 lg:size-8 size-10" />
            <FaFacebook className="text-blue-600 lg:size-8 size-10" />
            <FaYoutube className="text-red-600 lg:size-8 size-10" />
          </div>
        </div>
      </div>

      {/* <hr className="text-black" /> */}

      <p className="text-center pt-10 font-medium text-sm">
        &copy; 2025 CareNearn. All Rights Reserved | Powered by CareNearn India
        Pvt. Ltd.
      </p>
    </div>
  );
};

export default Footer;
