import React, { useReducer, useState } from "react";
import bookavobackground2 from "../../../src/bookavobackground2.png";
import bookavologo from "../../../src/bookavologo.png";
import css from "./landingPage.module.css";
import { withRouter, useHistory } from "react-router-dom";
import CountryButton from "./CountryButton";



function LandingPage(props) {

  // console.log(props);
  const history = useHistory();
  const onClick = (country) => {
    history.push("/recs");
    props.setCuisine(country);
  };

  // console.log(props.cuisine);

  return (
    <div className={css.bg}>
    
      <div className={css.content}>
        <img src={bookavologo} className={css.logo}></img>
        <div className={css.tagline}>
          <p className={css.tag}>EAT AROUND THE WORLD,</p>
          <p className={css.tag}>IN YOUR CITY</p>
        </div>
        <p className={css.p}>Choose your cuisine:</p>
        <div className={css.buttons}>
          <CountryButton
            onClick={() => {
              onClick("italy");
            }}
            text="ITALY"
          />
          <CountryButton
            onClick={() => {
              onClick("yemen");
            }}
            text="YEMEN"
          />
          <CountryButton
            onClick={() => {
              onClick("caribbean");
            }}
            text="TRINIDAD"
          />
          <CountryButton
            onClick={() => {
              onClick("romania");
            }}
            text="ROMANIA"
          />
          <CountryButton
            onClick={() => {
              onClick("india");
            }}
            text="INDIA"
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
