import React, {useReducer, useEffect} from 'react';

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
    openingTimes:"18:00hrs",
    closingTime:"00:00hrs",
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
   
   
   return (
        <div>
            <h1>{restaurant.name}</h1>
            <img src={restaurant.photoURL} alt = "restaurant image" width="650px" height="600px"/>
            <ul>
                <li>{restaurant.openingTimes}</li>
                <li>{restaurant.closingTimes}</li>
                <li>{restaurant.phoneNumber}</li>
                <li>{restaurant.addressLine1}</li>
                <li>{restaurant.area}</li>
                <li>{restaurant.postcode}</li>
                <li>
                    <a
                    href={restaurant.websiteURL}
                    target="_blank"
                    style={{ color: "#3d7ea6" }}> 
                    Click here to go to Restaurant website</a></li>
            </ul>
            <h2> </h2>
        </div>
    )
}



export default RestInfo;

