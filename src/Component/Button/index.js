import React from "react";
import css from "./button.module.css";

function Button({ text, handleClick }) {
  return (
    <div>
      <button
        className={css.button}
        onClick={() => {
          handleClick();
        }}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
