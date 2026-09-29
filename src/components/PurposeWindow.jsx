import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const PurposeWindow = ({
  initialPurposes,
  selectedUserType,
  onSave,
  onSkip,
}) => {
  const [purposes, setPurposes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize purposes from props
  useEffect(() => {
    if (initialPurposes && initialPurposes.length > 0) {
      setPurposes(initialPurposes);
    }
  }, [initialPurposes]);

  // Group purposes by roleName for view mode
  const groupedPurposes = purposes
    .filter((purpose) => purpose.roleName === selectedUserType)
    .reduce((acc, purpose) => {
      if (!acc[purpose.roleName]) {
        acc[purpose.roleName] = [];
      }
      acc[purpose.roleName].push(purpose);
      return acc;
    }, {});

  // Get all purpose categories for all user types in edit mode
  const getAllPurposeCategories = () => {
    return USER_TYPES.map((type) => ({
      ...type,
      purposes: type.purposes.map((purpose) => ({
        ...purpose,
        roleName: type.value,
      })),
    }));
  };

  // Check if an item is selected
  const isItemSelected = (roleName, categoryName, itemLabel) => {
    return purposes.some(
      (purpose) =>
        purpose.roleName === roleName &&
        purpose.categoryName === categoryName &&
        purpose.items.some((item) => item.label === itemLabel && item.selected)
    );
  };

  // Toggle item selection
  const toggleItemSelection = (roleName, categoryName, itemLabel) => {
    setPurposes((prevPurposes) => {
      // Check if purpose exists
      const purposeIndex = prevPurposes.findIndex(
        (p) => p.roleName === roleName && p.categoryName === categoryName
      );

      if (purposeIndex >= 0) {
        // Purpose exists - update it
        return prevPurposes
          .map((purpose, index) =>
            index === purposeIndex
              ? {
                  ...purpose,
                  items: purpose.items.some((item) => item.label === itemLabel)
                    ? purpose.items
                        .map((item) =>
                          item.label === itemLabel
                            ? { ...item, selected: !item.selected }
                            : item
                        )
                        .filter((item) => item.selected) // Remove if deselected
                    : [...purpose.items, { label: itemLabel, selected: true }],
                }
              : purpose
          )
          .filter((purpose) => purpose.items.length > 0); // Remove empty purposes
      } else {
        return [
          ...prevPurposes,
          {
            roleName,
            categoryName,
            items: [{ label: itemLabel, selected: true }],
          },
        ];
      }
    });
  };

  const handleSaveClick = async () => {
    try {
      setIsLoading(true);
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const id = user?.id;

      if (!id) {
        alert("User ID not found. Please log in again.");
        return;
      }

      // Filter out purposes with no selected items
      const filteredPurposes = purposes.filter(
        (purpose) => purpose.items.length > 0
      );

      // Extract user types from filtered purposes
      const updatedUserTypes = [
        ...new Set(filteredPurposes.map((p) => p.roleName)),
      ];

      // Construct updated user payload
      const userPayload = {
        ...user,
        purposes: filteredPurposes,
        userTypes: updatedUserTypes,
      };

      const formData = new FormData();
      formData.append("user", JSON.stringify(userPayload));

      const response = await fetch(
        "http://192.168.0.205:5001/api/careNearn/user/update",
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user purposes.");
      }

      const result = await response.json();
      console.log(result);

      localStorage.setItem("user", JSON.stringify(userPayload));
      onSave(filteredPurposes);
      setIsEditing(false);
    } catch (error) {
      alert(`Failed to update. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-rose-500">
          {isEditing ? "Edit Your Interests" : "Your Selected Interests"}
        </h2>

        {!isEditing ? (
          // View mode - only show selected user type's purposes
          <div className="mb-6 space-y-6">
            {Object.entries(groupedPurposes).length > 0 ? (
              Object.entries(groupedPurposes).map(
                ([roleName, rolePurposes]) => (
                  <div key={roleName} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b">
                      {roleName}
                    </h3>
                    {rolePurposes.map((purpose) => (
                      <div
                        key={`${purpose.roleName}-${purpose.categoryName}`}
                        className="ml-2"
                      >
                        <div className="font-medium text-gray-700">
                          {purpose.categoryName}
                        </div>
                        <div className="flex flex-wrap gap-2 pl-4">
                          {purpose.items.map((item, index) => (
                            <span
                              key={index}
                              className="bg-rose-100 text-rose-800 text-sm px-2 py-1 rounded-lg"
                            >
                              {item.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500">No interests selected yet</p>
            )}
          </div>
        ) : (
          // Edit mode - show all purposes for all user types
          <div className="mb-6 space-y-6">
            {getAllPurposeCategories().map((userType) => (
              <div key={userType.value} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b">
                  {userType.label}
                </h3>
                {userType.purposes.map((category) => (
                  <div
                    key={`${category.roleName}-${category.categoryName}`}
                    className="space-y-2 ml-2"
                  >
                    <div className="font-medium text-gray-700">
                      {category.categoryName}
                    </div>
                    <div className="flex flex-wrap gap-2 pl-4">
                      {category.items.map((item) => (
                        <label
                          key={item}
                          className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isItemSelected(
                              userType.value,
                              category.categoryName,
                              item
                            )}
                            onChange={() =>
                              toggleItemSelection(
                                userType.value,
                                category.categoryName,
                                item
                              )
                            }
                            className="h-4 w-4 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-4 border-t border-gray-200">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              disabled={isLoading}
              className={`bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-rose-500 px-4 py-2 rounded-md border border-rose-500 hover:bg-rose-50 transition"
            >
              Edit Interests
            </button>
          )}
          <button
            onClick={onSkip}
            className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

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

export default PurposeWindow;
