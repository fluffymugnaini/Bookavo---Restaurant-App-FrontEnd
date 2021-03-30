import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import css from "./bookingPage.module.css";
import BACKEND_URL_Bookings from "../../libs/config";
import {BACKEND_URL_TimeSlots} from "../../libs/config";
import {BACKEND_URL_Restaurants} from "../../libs/config";

function BookingPage({ id }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    formState: { isSubmitting },
  } = useForm();

  console.log(`Restaurant id is ${id}`);

  const [selectedDate, setSelectedDate] = useState(null);

  const [firstBookingSlot, setFirstBookingSlot] = useState(1700);
  const [lastBookingSlot, setLastBookingSlot] = useState(2300);
  const [restaurantCapacity, setRestaurantCapacity] = useState(0);
  const [bookedSlots, setBookedSlots] = useState([]);

  const onSubmit = (data, {id}) => {
    // console.log(data);
    // console.log(moment(selectedDate).format("DD/MM/YYYY"));
    // console.log(data.date);

    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        RestaurantID: 1,            //!!!!!!!!!!!!!!!!!! Id still hardcoded, at the moment does;t work if passed down.
        CustomerName: data.fullName,
        BookingDate: data.date,
        BookingTime: data.time,
        NumberOfPeople: parseInt(data.number),
        CustomerMobile: data.mobile,
        CustomerEmail: data.email,
      }),
    };

    fetch(`${BACKEND_URL_Bookings}`, requestOptions);
    // .then(response => response.json())
    // .then(data => console.log(data));
  };

  function Book({id}) {
    console.log(`This id ( ${id} ) is logged when the submit button is pressed`);
    alert(`Thank you for booking at Restaurant id number ${id}!`);
   
  }

  useEffect(() => {
    async function getSelectedRestaurant() {
      let response = await fetch(`${BACKEND_URL_Restaurants}/${id}`);
      let data = await response.json();
      console.log(data);
      setFirstBookingSlot(parseInt(data.openingTimes));
      setLastBookingSlot(parseInt(data.closingTimes-100));
      setRestaurantCapacity(data.capacity);
    }
    getSelectedRestaurant()                                                                                                           
    getBookedSlots()
  },[id]);

  //GET THE SLOTS ALREADY BOOKED
  async function getBookedSlots() {
    let response = await fetch(`${BACKEND_URL_TimeSlots}?restaurantId=${id}&date=${inputtedDate}`);
    let data = await response.json();
    //console.log(data);
    setBookedSlots(data);
  }

   //NEED TO GET THE BOOKING DATE OUT OF THE FORM BEFORE SUBMITTING ------------------------------IN PROGRESS
  const inputtedDate = "2021-03-28"   //  = watch('date');   //DOES IT WORK? for now working with hardcoded date
  const time = watch('time');
  console.log("The watched time value " + time);
   //NEED TO GET THE NO OF PEOPLE OUT OF THE FORM BEFORE SUBMITTING
  const currentReservationPeople = 5;
 
  // NEED TO GENERATE ARRAY WITH 1H SLOTS BETWEEN THE OPENING TIME AND CLOSING TIME
  function generateAllPossibleBookingSlots(start, end, step = 100) {
    const len = Math.floor((end - start) / step) + 1
    return (Array(len).fill().map((_, idx) => start + (idx * step)));
  }
  
  var allRestaurantSlots = generateAllPossibleBookingSlots(firstBookingSlot, lastBookingSlot, 100);
  var allRestaurantTimeSlots = [];
  for (let i=0; i<allRestaurantSlots.length; i++){
    var slot = allRestaurantSlots[i].toString();
    var splicedSlot = [slot.slice(0,2), ":",slot.slice(2)].join("");
    allRestaurantTimeSlots.push(splicedSlot)
  }

  //console.log(allRestaurantTimeSlots);
  

  // NEED TO CHECK TO GET THE SLOTS BOOKED
  // SOME WAY TO MAP OVER THE SLOTS ARRAY AND CHECK WHAT THEIR OCCUPANCY INCLUDING THE NEW RESERVATION WOULD BE --> IF OVER RESTAURANT CAPACITY DO NOT INCLUDE IN THE FILTERED ARRAY


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.h1}>Book a Table</h1>
      <label>Full Name:</label>
      <input name="fullName" ref={register({ required: true })} />
      <label>How many people?</label>
      <select name="number" ref={register({ required: true })}>
        <option value="">Select...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="8+">8+</option>
      </select>
      {/* <label>Date:</label>
      <input name="date" ref={register({ required: true })} /> */}
      <section>
        <label>Date:</label>
        <Controller
          as={DatePicker}
          control={control}
          valueName="selected"
          selected={selectedDate}
          onChange={([selected]) => {
            setSelectedDate(selected);
            return selected;
          }}
          dateFormat="DD/MM/YYYY"
          placeholderText="Select Date"
            name="date"
            defaultValue={selectedDate}     //null initially
          ref={register({ required: true })}
        />
      </section>

      <label>Time:</label>
      {/* <input name="time" ref={register({ required: true })} /> */}
      <select name="time" ref={register({ required: true })}>
      <option value="">Select...</option>
        {allRestaurantTimeSlots.map((item) =>{
                 return <option value={item.toString()}>{item}</option>
        })}
      </select>
      <label>Your Mobile Number</label>
      <input name="mobile" type="mobile" ref={register({ required: true })} />
      <label>Email</label>
      <input
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />

      <input
        disabled={isSubmitting}
        type="submit"
        onClick={() => {
          Book({id});
        }}
      />
    </form>
  );
}

export default BookingPage;
