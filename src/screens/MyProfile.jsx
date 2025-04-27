import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [imageUrl, setImageUrl] = useState("/login.png");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImageUrl(imgUrl);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex lg:flex-row flex-col gap-10 px-10 lg:mt-5">
        <div className="lg:w-1/2 mt-10">
          <div className="relative w-fit mx-auto">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <img
                src={imageUrl}
                alt="Profile"
                className="rounded-full size-80 ring-1 ring-rose-500 shadow-lg shadow-rose-500"
              />
              <div className="absolute bottom-2 text-center right-10 bg-rose-500 text-black py-1.5 px-3 text-xl rounded-full">
                +
              </div>
            </label>

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="lg:w-1/2 lg:px-20">
          <div className="border border-gray-500 rounded-3xl py-5 px-5 lg:px-20 flex flex-col gap-5">
            {[
              { label: "👦 Name", type: "text" },
              { label: "📞 Phone Number", type: "text" },
              { label: "✉️ Email Id", type: "email" },
              { label: "🏠 Address", type: "text" },
              { label: "📍 Pincode", type: "text" },
              { label: "🎂 Date of Birth", type: "date" },
              { label: "🤝 Reason to Join", type: "text" },
            ].map((field, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  className="border-b border-gray-300 outline-none"
                  disabled={!isEditing}
                />
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <label>🎯 Purpose</label>
              <div className="flex items-center gap-5 flex-wrap">
                {["Child Care", "Parents Care", "Business", "Activities"].map(
                  (option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 bg-rose-100 p-1 rounded-lg"
                    >
                      <input
                        type="radio"
                        name="purpose"
                        value={option}
                        disabled={!isEditing}
                        checked={purpose === option}
                        onChange={() => setPurpose(option)}
                        className="accent-rose-500"
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleEditClick}
                className="bg-rose-500 text-white text-xl px-10 lg:px-28 py-2 rounded-md w-fit font-medium"
              >
                {isEditing ? "Save" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyProfile;
