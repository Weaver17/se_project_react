import { useState, useContext, useEffect } from "react";

import "./ToggleSwitch.css";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

const ToggleSwitch = () => {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTempUnit === "F");
  useEffect(() => {
    setIsChecked(currentTempUnit === "F");
  }, [currentTempUnit]);

  return (
    <div className="toggle-switch">
      <label htmlFor="temp-switch-checkbox" className="toggle-switch__label">
        <input
          className="toggle-switch_checkbox"
          type="checkbox"
          id="temp-switch-checkbox"
          name="temp-switch-checkbox"
          value={currentTempUnit}
          onChange={handleToggleSwitchChange}
          checked={isChecked}
        />
        <span
          className={
            currentTempUnit === "F"
              ? "toggle-switch__slider toggle-switch__slider_F"
              : "toggle-switch__slider toggle-switch__slider_C"
          }
        ></span>
        <p
          className={`toggle-switch__temp_F ${
            currentTempUnit === "F" && "toggle-switch__temp_active"
          }`}
        >
          F
        </p>
        <p
          className={`toggle-switch__temp_C ${
            currentTempUnit === "C" && "toggle-switch__temp_active"
          }`}
        >
          C
        </p>
      </label>
    </div>
  );
};

export default ToggleSwitch;
