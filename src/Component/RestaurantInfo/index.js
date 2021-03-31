import React, { useReducer, useEffect, useState } from "react";
import css from "./restInfo.module.css";
import Button from "../Button";
import Header from "../Header";
import { Link, Route } from "react-router-dom";
// import BookingPage from "../BookingPage";
import {BACKEND_URL_Restaurants} from "../../libs/config";

function RestaurantInfo({restaurant, dispatch, id, newRec, cuisine}) {
  // const [restaurant, dispatch] = useReducer(reducer, INITIAL_REST);
  // const [id, setId] = useState(1);
 
  // let cuisine = "Italy";  //just for testing, we need to get the cuisine passed down from the landing page

  useEffect(() => {
    async function getRestaurants() {
      let response = await fetch(`${BACKEND_URL_Restaurants}?cuisine=${cuisine}`);
      let data = await response.json();
      //console.log(data[id]);
      //console.log(data[id].id)
      dispatch({ type: "REST", payload: data[id]});
      //console.log( restaurant);
    }
    getRestaurants();
  }, [id]);

  console.log(restaurant);
  console.log("Restaurant id is " + restaurant.id);
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
          {/* <Link to={{ pathname: "/bookings", state: { id: { id } } }}> */}
          <Link to={{ pathname: "/bookings", state: { id: restaurant.id, restaurant: restaurant  } }}>
            <Button
              text="Book"
              handleClick={() => {
                console.log("when clicking on book " + restaurant.id);
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
