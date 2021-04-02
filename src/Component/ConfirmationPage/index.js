import React from "react";
import css from "./confirmation.module.css";
import Header from "../Header";

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
          Due to the ongoing COVID-19 (Coronavirus) pandemic, we are undertaking
          measures to ensure that all of our restaurant partners, and our
          customers are safe.
          <br />
          <br />
          We have some rules that you will have to be aware of, and follow,
          before and during your dining experience.
          <ul className={css.covidList}>
            <li>
              You must follow either the rule of six, or be in a group of any
              size as long as there are no more than two households present.
            </li>
            <li>
              You should use the hand sanitiser provided upon entry to the
              premises. This helps to keep everyone around you, including the
              staff of the restaurant safe.
            </li>
            <li>
              When your group is not seated - for example, when you’re being
              shown to a table or going to the toilet - your group must wear
              face masks unless one of the exemptions apply, follow one-way
              systems and observe social distancing.
            </li>
            <li>
              <strong>
                Do not attend your booking if you have symptoms of COVID-19
              </strong>
              and are self-isolating, or shielding. Call the National Helpline
              on 0800 111 4000.
            </li>
          </ul>
        </p>
      </div>
    </>
  );
}

export default ConfirmationPage;
