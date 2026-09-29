import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);
  const [bookingPage, setBookingPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contactError, setContactError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [isUpdatingBooking, setIsUpdatingBooking] = useState(false);
  const [responseText, setResponseText] = useState("");
  const itemsPerPage = 5;

  const userUrl = "http://192.168.0.205:5001/api/careNearn/user/getAllUser";
  const contactUrl =
    "http://192.168.0.205:5001/api/careNearn/user/contactUs/getAllContact";
  const bookingUrl =
    "http://192.168.0.205:5001/api/careNearn/notification/getAllNotification";

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(userUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContacts = async () => {
    setIsContactLoading(true);
    setContactError(null);
    try {
      const response = await fetch(contactUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setContacts(data || []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setContactError("Failed to load contact messages. Please try again.");
    } finally {
      setIsContactLoading(false);
    }
  };

  const fetchBookings = async () => {
    setIsBookingLoading(true);
    setBookingError(null);
    try {
      const response = await fetch(bookingUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookingError("Failed to load bookings. Please try again.");
    } finally {
      setIsBookingLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchContacts();
    fetchBookings();
  }, []);

  const verifyUser = async (userId) => {
    setIsVerifying(true);
    try {
      const response = await fetch(
        `http://192.168.0.205:5001/api/careNearn/user/${userId}/status?status=VERIFIED`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      // ✅ Update UI after successful verification
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: "VERIFIED" } : u))
      );
      // Collapse detail view after verification
      setSelectedUser(null);
    } catch (err) {
      console.error("Error verifying user:", err);
      alert("Failed to verify user. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const respondToContact = async (contactId) => {
    setIsResponding(true);
    try {
      // Encode the response message for URL
      const encodedResponse = encodeURIComponent(responseText);
      const response = await fetch(
        `http://192.168.0.205:5001/api/careNearn/user/contactUs/${contactId}/response?responseMessage=${encodedResponse}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Update UI after successful response
      setContacts((prev) =>
        prev.map((c) =>
          c.id === contactId
            ? {
                ...c,
                adminResponse: responseText,
                status: "Responded",
                respondedAt: new Date().toISOString(),
              }
            : c
        )
      );
      setResponseText("");
      setSelectedContact(null);
      alert("Response sent successfully!");
    } catch (err) {
      console.error("Error responding to contact:", err);
      alert("Failed to send response. Try again.");
    } finally {
      setIsResponding(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    setIsUpdatingBooking(true);
    try {
      const response = await fetch(
        `http://192.168.0.205:5001/api/careNearn/notification/${bookingId}/status?status=${status}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Update UI after successful status change
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: status } : b))
      );

      alert(`Booking ${status.toLowerCase()} successfully!`);
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert("Failed to update booking status. Try again.");
    } finally {
      setIsUpdatingBooking(false);
    }
  };

  const userTotalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const contactTotalPages = Math.ceil(contacts.length / itemsPerPage);
  const currentContacts = contacts.slice(
    (contactPage - 1) * itemsPerPage,
    contactPage * itemsPerPage
  );

  const bookingTotalPages = Math.ceil(bookings.length / itemsPerPage);
  const currentBookings = bookings.slice(
    (bookingPage - 1) * itemsPerPage,
    bookingPage * itemsPerPage
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Users Section */}
        <div className="md:w-1/3 w-full flex flex-col border border-gray-300 rounded-xl p-4 bg-white shadow-md min-h-[500px]">
          <div className="flex items-center mb-3">
            <p className="font-semibold text-lg text-gray-700">Users</p>
            <div className="relative">
              <div className="absolute -top-2 left-10 w-7 h-7 flex items-center justify-center bg-blue-500 text-white rounded-full animate-bounce font-semibold text-sm shadow-md">
                {users.length}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-sm">
              <span className="inline-block w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
              <span className="ml-2 text-blue-500 font-medium">Loading...</span>
            </div>
          ) : error ? (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          ) : currentUsers.length === 0 ? (
            <p className="text-gray-500 text-sm">No users found.</p>
          ) : (
            <ul className="w-full space-y-2 flex-1 overflow-y-auto">
              {currentUsers.map((user) => (
                <li
                  key={user.id}
                  className={`border rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                    selectedUser?.id === user.id
                      ? "bg-blue-50 border-blue-300"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setSelectedUser(selectedUser?.id === user.id ? null : user)
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {user.name || "Unknown Name"}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {user.emailId || "No Email"} | Status:{" "}
                        <span
                          className={`font-semibold ${
                            user.status === "VERIFIED"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {user.status === "VERIFIED"
                            ? "Verified"
                            : "Not Verified"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Expanded detail view */}
                  {selectedUser?.id === user.id && (
                    <div
                      className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-1"
                      onClick={(e) => e.stopPropagation()} // prevent toggle when clicking inside
                    >
                      <div>
                        <span className="font-semibold">Name:</span> {user.name}
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span>{" "}
                        {user.emailId}
                      </div>
                      <div>
                        <span className="font-semibold">Phone:</span>{" "}
                        {user.phoneNumber}
                      </div>
                      <div>
                        <span className="font-semibold">DOB:</span>{" "}
                        {user.dateOfBirth}
                      </div>
                      <div>
                        <span className="font-semibold">Address:</span>{" "}
                        {user.address}, {user.pincode}
                      </div>
                      <div>
                        <span className="font-semibold">Reason to Join:</span>{" "}
                        {user.reasonToJoin}
                      </div>
                      <div>
                        <span className="font-semibold">Education:</span>{" "}
                        {user.educationalQualifications}
                      </div>
                      <div>
                        <span className="font-semibold">Profession:</span>{" "}
                        {user.profession}
                      </div>
                      <div>
                        <span className="font-semibold">Status:</span>{" "}
                        {user.status}
                      </div>

                      <div>
                        <span className="font-semibold">User Types:</span>{" "}
                        {user.userTypes?.join(", ")}
                      </div>

                      <div>
                        <span className="font-semibold">Purposes:</span>
                        {user.purposes?.map((p, i) => (
                          <div key={i} className="ml-2">
                            <span className="font-semibold">{p.roleName}</span>{" "}
                            - {p.categoryName} :{" "}
                            {p.items.map((item) => item.label).join(", ")}
                          </div>
                        ))}
                      </div>

                      <div>
                        <span className="font-semibold">Aadhar Card:</span>{" "}
                        <a
                          href={user.aadharCard}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline"
                        >
                          View
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold">Address Proof:</span>{" "}
                        <a
                          href={user.addressProof}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline"
                        >
                          View
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold">Picture:</span>{" "}
                        <img
                          src={user.picture}
                          alt="User"
                          className="w-20 h-20 rounded-full mt-1"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        {user.status !== "VERIFIED" && (
                          <button
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                            onClick={() => verifyUser(user.id)}
                            disabled={isVerifying}
                          >
                            {isVerifying ? "Verifying..." : "Verify"}
                          </button>
                        )}
                        <button
                          className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                          onClick={() => setSelectedUser(null)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          <div className="mt-4 flex gap-2 flex-wrap justify-center text-xs">
            <button
              className="px-3 py-1 bg-gray-200 font-extrabold text-gray-700 text-base rounded-lg hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              {"<"}{" "}
            </button>

            {Array.from({ length: userTotalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  className={`px-3 py-2 rounded-lg font-medium ${
                    p === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              )
            )}

            <button
              className="px-3 py-1 bg-gray-200 font-extrabold text-gray-700 text-base rounded-lg hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === userTotalPages}
            >
              {">"}{" "}
            </button>
          </div>
        </div>

        {/* Contact Us Mails Section */}
        <div className="md:w-1/3 w-full flex flex-col border border-gray-300 rounded-xl p-4 bg-white shadow-md min-h-[500px]">
          <div className="flex items-center mb-3">
            <p className="font-semibold text-lg text-gray-700">
              Contact Us Mails
            </p>
            <div className="relative">
              <div className="absolute -top-2 left-44 w-7 h-7 flex items-center justify-center bg-blue-500 text-white rounded-full animate-bounce font-semibold text-sm shadow-md">
                {contacts.length}
              </div>
            </div>
          </div>

          {isContactLoading ? (
            <div className="flex items-center justify-center py-8 text-sm">
              <span className="inline-block w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
              <span className="ml-2 text-blue-500 font-medium">Loading...</span>
            </div>
          ) : contactError ? (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {contactError}
            </div>
          ) : currentContacts.length === 0 ? (
            <p className="text-gray-500 text-sm">No contact messages found.</p>
          ) : (
            <ul className="w-full space-y-2 flex-1 overflow-y-auto">
              {currentContacts.map((contact) => (
                <li
                  key={contact.id}
                  className={`border rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                    selectedContact?.id === contact.id
                      ? "bg-blue-50 border-blue-300"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setSelectedContact(
                      selectedContact?.id === contact.id ? null : contact
                    )
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {contact.email} | Status:{" "}
                        <span
                          className={`font-semibold ${
                            contact.status === "Responded"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Expanded detail view */}
                  {selectedContact?.id === contact.id && (
                    <div
                      className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-2"
                      onClick={(e) => e.stopPropagation()} // prevent toggle when clicking inside
                    >
                      <div>
                        <span className="font-semibold">Name:</span>{" "}
                        {contact.name}
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span>{" "}
                        {contact.email}
                      </div>
                      <div>
                        <span className="font-semibold">Phone:</span>{" "}
                        {contact.phone}
                      </div>
                      <div>
                        <span className="font-semibold">Address:</span>{" "}
                        {contact.address}
                      </div>
                      <div>
                        <span className="font-semibold">Subject:</span>{" "}
                        {contact.subject}
                      </div>
                      <div>
                        <span className="font-semibold">Message:</span>
                        <p className="mt-1 p-2 bg-white border rounded-md">
                          {contact.message}
                        </p>
                      </div>

                      {contact.adminResponse && (
                        <div>
                          <span className="font-semibold">Your Response:</span>
                          <p className="mt-1 p-2 bg-white border rounded-md">
                            {contact.adminResponse}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            Responded on:{" "}
                            {new Date(contact.respondedAt).toLocaleString()}
                          </div>
                        </div>
                      )}

                      {contact.status === "Pending" && (
                        <div>
                          <span className="font-semibold">Your Response:</span>
                          <textarea
                            className="w-full mt-1 p-2 border rounded-md text-xs"
                            rows="3"
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Type your response here..."
                          />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        {contact.status === "Pending" && (
                          <button
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                            onClick={() => respondToContact(contact.id)}
                            disabled={isResponding || !responseText.trim()}
                          >
                            {isResponding ? "Sending..." : "Send Response"}
                          </button>
                        )}
                        <button
                          className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                          onClick={() => {
                            setSelectedContact(null);
                            setResponseText("");
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          <div className="mt-4 flex gap-2 flex-wrap justify-center text-xs">
            <button
              className="px-3 py-1 bg-gray-200 font-extrabold text-gray-700 text-base rounded-lg hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setContactPage((prev) => prev - 1)}
              disabled={contactPage === 1}
            >
              {"<"}{" "}
            </button>

            {Array.from({ length: contactTotalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  className={`px-3 py-2 rounded-lg font-medium ${
                    p === contactPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setContactPage(p)}
                >
                  {p}
                </button>
              )
            )}

            <button
              className="px-3 py-1 bg-gray-200 font-extrabold text-gray-700 text-base rounded-lg hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setContactPage((prev) => prev + 1)}
              disabled={contactPage === contactTotalPages}
            >
              {">"}{" "}
            </button>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="md:w-1/3 w-full flex flex-col border border-gray-300 rounded-xl p-4 bg-white shadow-md min-h-[500px]">
          <div className="flex items-center mb-3">
            <p className="font-semibold text-lg text-gray-700">Bookings</p>
            <div className="relative">
              <div className="absolute -top-2 left-16 w-7 h-7 flex items-center justify-center bg-blue-500 text-white rounded-full animate-bounce font-semibold text-sm shadow-md">
                {bookings.length}
              </div>
            </div>
          </div>

          {isBookingLoading ? (
            <div className="flex items-center justify-center py-8 text-sm">
              <span className="inline-block w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
              <span className="ml-2 text-blue-500 font-medium">Loading...</span>
            </div>
          ) : bookingError ? (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {bookingError}
            </div>
          ) : currentBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">No bookings found.</p>
          ) : (
            <ul className="w-full space-y-2 flex-1 overflow-y-auto">
              {currentBookings.map((booking) => (
                <li
                  key={booking.id}
                  className={`border rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                    selectedBooking?.id === booking.id
                      ? "bg-blue-50 border-blue-300"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setSelectedBooking(
                      selectedBooking?.id === booking.id ? null : booking
                    )
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        Booking #{booking.id}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Customer: {booking.customerName} | Status:{" "}
                        <span
                          className={`font-semibold ${
                            booking.status === "APPROVED"
                              ? "text-green-600"
                              : booking.status === "REJECTED"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Expanded detail view */}
                  {selectedBooking?.id === booking.id && (
                    <div
                      className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-2"
                      onClick={(e) => e.stopPropagation()} // prevent toggle when clicking inside
                    >
                      <div>
                        <span className="font-semibold">Booking ID:</span>{" "}
                        {booking.id}
                      </div>

                      {/* Customer Information */}
                      <div className="mt-2">
                        <span className="font-semibold text-blue-600">
                          Customer Information:
                        </span>
                        <div className="ml-2 mt-1">
                          <div>
                            <span className="font-semibold">Name:</span>{" "}
                            {booking.customerName}
                          </div>
                          <div>
                            <span className="font-semibold">Email:</span>{" "}
                            {booking.customerEmail}
                          </div>
                          <div>
                            <span className="font-semibold">Phone:</span>{" "}
                            {booking.customerPhone}
                          </div>
                          <div>
                            <span className="font-semibold">User Type:</span>{" "}
                            {booking.customerUserType}
                          </div>
                        </div>
                      </div>

                      {/* Selected User Information */}
                      <div className="mt-2">
                        <span className="font-semibold text-green-600">
                          Selected Care Provider:
                        </span>
                        <div className="ml-2 mt-1">
                          <div>
                            <span className="font-semibold">Name:</span>{" "}
                            {booking.selectedUserName}
                          </div>
                          <div>
                            <span className="font-semibold">Email:</span>{" "}
                            {booking.selectedUserEmail}
                          </div>
                          <div>
                            <span className="font-semibold">Phone:</span>{" "}
                            {booking.selectedUserPhone}
                          </div>
                          <div>
                            <span className="font-semibold">User ID:</span>{" "}
                            {booking.selectedUserId}
                          </div>
                        </div>
                      </div>

                      {/* Purposes */}
                      <div className="mt-2">
                        <span className="font-semibold">
                          Services Requested:
                        </span>
                        {booking.purposesJson && (
                          <div className="ml-2 mt-1">
                            {JSON.parse(booking.purposesJson).map(
                              (purpose, index) => (
                                <div key={index} className="mb-1">
                                  <span className="font-semibold">
                                    {purpose.roleName}
                                  </span>{" "}
                                  - {purpose.categoryName}:{" "}
                                  {purpose.items
                                    .filter((item) => item.selected)
                                    .map((item) => item.label)
                                    .join(", ")}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="font-semibold">Status:</span>{" "}
                        {booking.status}
                      </div>
                      <div>
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(booking.createdAt).toLocaleString()}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        {booking.status === "Pending" && (
                          <>
                            <button
                              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                              onClick={() =>
                                updateBookingStatus(booking.id, "APPROVED")
                              }
                              disabled={isUpdatingBooking}
                            >
                              {isUpdatingBooking ? "Processing..." : "Approve"}
                            </button>
                            <button
                              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                              onClick={() =>
                                updateBookingStatus(booking.id, "REJECTED")
                              }
                              disabled={isUpdatingBooking}
                            >
                              {isUpdatingBooking ? "Processing..." : "Reject"}
                            </button>
                          </>
                        )}
                        <button
                          className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                          onClick={() => setSelectedBooking(null)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          <div className="mt-4 flex gap-2 flex-wrap justify-center text-xs">
            <button
              className="px-3 py-1 bg-gray-200 font-extrabold text-gray-700 text-base rounded-lg hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setBookingPage((prev) => prev - 1)}
              disabled={bookingPage === 1}
            >
              {"<"}{" "}
            </button>

            {Array.from({ length: bookingTotalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  className={`px-3 py-2 rounded-lg font-medium ${
                    p === bookingPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setBookingPage(p)}
                >
                  {p}
                </button>
              )
            )}

            <button
              className="px-3 py-1 bg-gray-200 font-extrabold text-gray-700 text-base rounded-lg hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setBookingPage((prev) => prev + 1)}
              disabled={bookingPage === bookingTotalPages}
            >
              {">"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
