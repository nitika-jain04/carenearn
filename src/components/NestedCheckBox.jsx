import { useState } from "react";

const NestedCheckbox = ({ label, childrenOptions }) => {
  const [checked, setChecked] = useState(false);
  const [childrenChecked, setChildrenChecked] = useState(
    childrenOptions.map(() => false)
  );

  const handleParentToggle = () => {
    const newState = !checked;
    setChecked(newState);
    setChildrenChecked(childrenOptions.map(() => newState));
  };

  const handleChildToggle = (index) => {
    const updated = [...childrenChecked];
    updated[index] = !updated[index];
    setChildrenChecked(updated);

    // If any child is unchecked, parent should be unchecked
    if (updated.every((val) => val === true)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  return (
    <div className="flex flex-col ml-2">
      <label className="inline-flex items-center gap-2 font-medium text-gray-700">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleParentToggle}
          className="accent-rose-500"
        />
        {label}
      </label>

      {childrenOptions.length > 0 && (
        <div className="ml-6 mt-1 flex w-fit flex-wrap gap-2">
          {childrenOptions.map((child, index) => (
            <label
              key={index}
              className="inline-flex items-center gap-2 text-gray-600 text-sm"
            >
              <input
                type="checkbox"
                checked={childrenChecked[index]}
                onChange={() => handleChildToggle(index)}
                className="accent-rose-400"
              />
              {child}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedCheckbox;
