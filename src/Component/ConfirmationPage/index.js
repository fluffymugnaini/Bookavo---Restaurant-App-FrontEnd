import React from "react";
import css from "./confirmation.module.css";
import Header from '../Header';

function ConfirmationPage() {
  return (
    <>
      <Header />
      <div className={css.info}>
        <h1 className={css.heading}>
          THANK YOU FOR BOOKING THROUGH BOOKAVO. YOU WILL SHORTLY RECEIVE A
          CONFIRMATION TEXT
        </h1>
        <p className={css.para}>
          In the upcoming months, restaurants are going to be very busy. Please
          help them by adhering to current guidelines, which can be found below:
          <ul className={css.covidList}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </p>
      </div>
    </>
  );
}

export default ConfirmationPage;
