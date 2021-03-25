import React, {useReducer, useEffect} from 'react';
import css from './restInfo.module.css';
import Button from '../Button';




function reducer (state, action){
    switch (action.type) {
        case "REST":
           return action.payload;
           default:
            return state; 
    }
}

const INITIAL_REST = {
    name:"DOM'S DINER",
    description:"If you're visiting this page, you're likely here because you're searching for a random sentence. Sometimes a random word just isn't enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways.",
    openingTimes:"Opening Time: 18:00hrs",
    closingTimes:"Closing Time: 00:00hrs",
    phoneNumber:"+01219878787",
    addressLine1:"61 Chapel Street",
    area:"Central",
    postcode:"B170X",
    websiteURL:"www.google.com",
    photoURL:"https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
};
const BACKEND_URL ="https:localhost:5001/restaurants";

function RestInfo({ id }) {
   const [restaurant, dispatch] = useReducer (reducer, INITIAL_REST);
   
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
   
  function Book(){
alert("Cool you've booked")
}

function newRec(){
alert("Here's a new restaurant")
}
   
   return (
        <div className={css.container}>
            <h1 className={css.restName}>{restaurant.name}</h1>
            <img className={css.img} src={restaurant.photoURL} alt = "restaurant image" height="600px"/>
                <div className={css.restInfo}>
            <ul>
                <li>{restaurant.openingTimes}</li>
                <li>{restaurant.closingTimes}</li>
                <li>{restaurant.phoneNumber}</li>
                <li>{restaurant.addressLine1}</li>
                <li>{restaurant.area}</li>
                <li>{restaurant.postcode}</li>
                </ul>
                <div className={css.buttons}>
                <Button text="Book" handleClick={Book}/>
    <Button text="Give me another!" handleClick={newRec}/>
    </div>
                </div>
                <p className={css.description}> {restaurant.description}</p>
                    <a
                    href={restaurant.websiteURL}
                    target="_blank"
                    style={{ color: "#3d7ea6" }}> 
                    Click here to go to Restaurant website</a>            
        </div>
    )
}



export default RestInfo;

