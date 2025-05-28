
import React, { useState, useRef, useEffect } from "react";

function CustomDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name: "department", value: option } });
    setOpen(false);
  };

  return (
    <div
      className="custom-dropdown"
      ref={dropdownRef}
      style={{ position: "relative", width: "266px" }}
    >
      <div
        className="selected-value"
        onClick={() => setOpen(!open)}
        style={{
          height: "48px",
          lineHeight: "48px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #00000040",
          borderRadius: "5px",
          padding: "0 10px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {value || "학과 선택"}
      </div>
      {open && (
        <ul
          className="options-list"
          style={{
            position: "absolute",
            top: "50px",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: option === value ? "#e6f0ff" : "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  option === value ? "#e6f0ff" : "white")
              }
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
