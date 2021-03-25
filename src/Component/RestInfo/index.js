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
    name:"",
    openingTimes:"",
    closingTime:"",
    phoneNumber:"",
    addressLine1:"",
    area:"",
    postcode:"",
    websiteURL:"",
    photoURL:"",
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
            <h2> </h2>
        </div>
    )
}



export default RestInfo;

