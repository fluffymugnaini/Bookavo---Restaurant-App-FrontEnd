import React, { useReducer, useEffect, useState } from "react";
import css from "./restInfo.module.css";
import Button from "../Button";
import Header from "../Header";
import { Link, Route } from "react-router-dom";
// import BookingPage from "../BookingPage";
import {BACKEND_URL_Restaurants} from "../../libs/config";

// function reducer(state, action) {
//   switch (action.type) {
//     case "REST":
//       return action.payload;
//     default:
//       return state;
//   }
// }

// const INITIAL_REST = {
//   restaurantName: "",
//   description: "",
//   openingTimes: "",
//   closingTimes: "",
//   phoneNumber: "",
//   addressLine1: "",
//   area: "",
//   postcode: "",
//   websiteURL: "",
//   photoURL: "",
// };


// const BACKEND_URL = "https://localhost:5001/restaurants";

function RestaurantInfo({restaurant, dispatch, id, newRec}) {
  // const [restaurant, dispatch] = useReducer(reducer, INITIAL_REST);
  // const [id, setId] = useState(1);
 
  let cuisine = "Italy";  //just for testing, we need to get the cuisine passed down from the landing page

  useEffect(() => {
    async function getRestaurants() {
      let response = await fetch(`${BACKEND_URL_Restaurants}?cuisine=${cuisine}`);
      let data = await response.json();
      //console.log(data[id]);
      dispatch({ type: "REST", payload: data[id]});
      console.log(restaurant);
    }
    getRestaurants();
  }, [id]);

  // useEffect(() => {
  //   async function getRestaurants() {
  //     let response = await fetch(`${BACKEND_URL_Restaurants}/${id}`);
  //     let data = await response.json();
  //     console.log(data);
  //     dispatch({ type: "REST", payload: data });
  //     console.log(restaurant);
  //   }
  //   getRestaurants();
  // }, [id]);


  // function newRec() {
  //   setId(Math.floor(Math.random() * 4) + 1);
  //   console.log(id);
  // }

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
          <Link to={{ pathname: "/bookings", state: { id: { id } } }}>
            <Button
              text="Book"
              handleClick={() => {
                console.log(id);
              }}
            />
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

export default RestaurantInfo;
