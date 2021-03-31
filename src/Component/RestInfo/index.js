import React, { useReducer, useEffect, useState } from "react";
import css from "./restInfo.module.css";
import Button from "../Button";
import Header from "../Header";
import { Link, Route } from "react-router-dom";
import BookingPage from '../BookingPage'

function reducer(state, action) {
  switch (action.type) {
    case "REST":
      return action.payload;
    default:
      return state;
  }
}

const INITIAL_REST = {
  restaurantName: "",
  description: "",
  openingTimes: "",
  closingTimes: "",
  phoneNumber: "",
  addressLine1: "",
  area: "",
  postcode: "",
  websiteURL: "",
  photoURL: "",
};

// restaurantName:"",
//     description:"If you're visiting this page, you're likely here because you're searching for a random sentence. Sometimes a random word just isn't enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways.",
//     openingTimes:"Opening Time: 18:00hrs",
//     closingTimes:"Closing Time: 00:00hrs",
//     phoneNumber:"+01219878787",
//     addressLine1:"61 Chapel Street",
//     area:"Central",
//     postcode:"B170X",
//     websiteURL:"www.google.com",
//     photoURL:"https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
const BACKEND_URL = "https://localhost:5001/restaurants";

function RestInfo() {
  const [restaurant, dispatch] = useReducer(reducer, INITIAL_REST);
  const [id, setId] = useState(1);

  useEffect(() => {
    async function getRestaurants() {
      let response = await fetch(`${BACKEND_URL}/${id}`);
      let data = await response.json();
      console.log(data);
      dispatch({ type: "REST", payload: data });
      console.log(restaurant);
    }
    getRestaurants();
  }, [id]);

  
  function newRec() {
    setId(Math.floor(Math.random() * 4) + 1);
    console.log(id);
  }

  return (
    <>
      <Header />
      <div className={css.container}>
        <h1 className={css.restName}>{restaurant.restaurantName}</h1>
        <img
          className={css.img}
          src={restaurant.photoURL}
          alt="restaurant image"
          height="600px"
        />

        <ul className={css.restDetails}>
          <li>Opening Time: {restaurant.openingTimes}</li>
          <li>Closing Time: {restaurant.closingTimes}</li>
          <li>Phone Number: {restaurant.phoneNumber}</li>
          <li>Address: {restaurant.addressLine1}</li>
          <li>{restaurant.area}</li>
          <li>{restaurant.postcode}</li>
        </ul>

        <div className={css.buttons}>
        {/* <Route path='/bookings'>
            <BookingPage id={`${id}`} />
        </Route> */}
        <Link to={{pathname:'/bookings', state:{id:{id}}}}>
            <Button text="Book" handleClick={() => {console.log(id)}} />
          </Link>
          <Button text="Next" handleClick={newRec} />
        </div>
      </div>
      <div className={css.extraDetails}>
        <p className={css.description}> {restaurant.description}</p>
        <a
          href={restaurant.websiteURL}
          target="_blank"
          style={{ color: "#3d7ea6" }}
        >
          Click here to go to Restaurant website
        </a>
      </div>
    </>
  );
}

export default RestInfo;
