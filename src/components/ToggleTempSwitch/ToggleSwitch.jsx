import { useState, useContext, useEffect } from "react";

import "./ToggleSwitch.css";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

const ToggleSwitch = () => {
  // const { currentTempUnit, handleToggleTempChange } = useContext(
  //   CurrentTempUnitContext
  // );

  // const [isChecked, setIsChecked] = useState(currentTempUnit === "C");
  // useEffect(() => setIsChecked(currentTempUnit === "C"), [currentTempUnit]);
  const [current, handle] = useState("C");

  const handleSwitch = (e) => {
    if (current === "C") handle("F");
    if (current === "F") handle("C");
  };

  return (
    <div className="toggle-switch">
      <label htmlFor="" className="toggle-switch__label">
        <input
          className="toggle-switch_checkbox"
          type="checkbox"
          // name="temp-switch-checkbox"
          onChange={handleSwitch}
          // value={currentTempUnit}
          // onChange={handleToggleTempChange}
          // checked={isChecked}
        />
        <span
          className={
            current === "F"
              ? "toggle-switch__slider toggle-switch__slider_F"
              : "toggle-switch__slider toggle-switch__slider_C"
          }
        ></span>
        <p
          className={`toggle-switch__temp_F ${
            current === "F" && "toggle-switch__temp_active"
          }`}
        >
          F
        </p>
        <p
          className={`toggle-switch__temp_C ${
            current === "C" && "toggle-switch__temp_active"
          }`}
        >
          C
        </p>
      </label>
    </div>
  );
};

export default ToggleSwitch;
