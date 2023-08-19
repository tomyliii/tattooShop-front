import { useState } from "react";
import "./toggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Toggle({ isChecked, setIsCheked }) {
  const handleOnChange = () => {
    setIsCheked(!isChecked);
  };
  return (
    <form>
      <input
        type="checkbox"
        name="Toggle"
        id="chekbox-toggle"
        checked={isChecked}
        onChange={handleOnChange}
      />

      <label className="toggle-label" htmlFor="chekbox-toggle">
        <span></span>
      </label>
    </form>
  );
}
