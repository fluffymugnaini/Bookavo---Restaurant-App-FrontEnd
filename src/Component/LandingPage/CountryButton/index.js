import React from "react";
import css from './countryButton.module.css';


function CountryButton({ text, onClick }) {
  return (
    <div>
      <button
        className={css.buttons}
        onClick={() => {
          onClick();
        }}
      >
        {text}
      </button>
    </div>
  );
}

export default CountryButton;