// UserDetails.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="p-4">No user data found.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-4">
        <button
          onClick={() => navigate("/admin")}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Admin
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.emailId}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {user.phoneNumber}
              </p>
              <p>
                <span className="font-medium">DOB:</span> {user.dateOfBirth}
              </p>
              <p>
                <span className="font-medium">Status:</span> {user.status}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">
                Address Information
              </h2>
              <p>
                <span className="font-medium">Address:</span> {user.address}
              </p>
              <p>
                <span className="font-medium">Pincode:</span> {user.pincode}
              </p>
            </div>
          </div>

          {/* Add more user details as needed */}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
