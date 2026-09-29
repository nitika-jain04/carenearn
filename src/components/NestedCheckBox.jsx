import React, { useState, useEffect, useMemo } from "react";

const NestedCheckbox = ({
  label,
  childrenOptions,
  onChange,
  initialSelected = [],
}) => {
  const [childrenChecked, setChildrenChecked] = useState(
    childrenOptions.map((option) => ({
      label: option,
      selected: initialSelected.some(
        (item) => item.label === option && item.selected
      ),
    }))
  );

  // Dynamically derive parent checkbox state
  const allChecked = useMemo(
    () => childrenChecked.every((item) => item.selected),
    [childrenChecked]
  );

  // Notify parent of changes
  useEffect(() => {
    onChange({
      categoryName: label,
      items: childrenChecked,
    });
  }, [childrenChecked, label, onChange]);

  const handleParentToggle = () => {
    const newState = !allChecked;
    setChildrenChecked((prev) =>
      prev.map((item) => ({
        ...item,
        selected: newState,
      }))
    );
  };

  const handleChildToggle = (index) => {
    setChildrenChecked((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <div className="flex flex-col ml-2">
      <label className="inline-flex items-center gap-2 font-medium text-gray-700">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={handleParentToggle}
          className="accent-rose-500 cursor-pointer"
        />
        {label}
      </label>

      {childrenOptions.length > 0 && (
        <div className="ml-6 mt-1 flex flex-col">
          {childrenChecked.map((child, index) => (
            <label
              key={index}
              className="inline-flex items-center gap-2 text-gray-600 text-sm"
            >
              <input
                type="checkbox"
                checked={child.selected}
                onChange={() => handleChildToggle(index)}
                className="accent-rose-400 cursor-pointer"
              />
              {child.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedCheckbox;
