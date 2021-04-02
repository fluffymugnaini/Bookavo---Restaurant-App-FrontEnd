import React, { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import css from "./bookingPage.module.css";
import BACKEND_URL_Bookings from "../../libs/config";
import {BACKEND_URL_TimeSlots} from "../../libs/config";
//import {BACKEND_URL_Restaurants} from "../../libs/config";
import DatePicker from "react-datepicker"; //if needed we can also import register locale
import "react-datepicker/dist/react-datepicker.css";
//import {enGB} from 'date-fns/esm/locale';
import { startOfDay } from 'date-fns';  //if needed we can also import format, parseISO
import Header from '../Header';
import { withRouter, useHistory } from "react-router-dom";
//registerLocale('enGB', enGB);


function BookingPage({ restaurant, id }, props) {
  //!! On page refresh redirect to the landing page or make sure that the restaurant and id data is not lost on reload  - check maybe local storage
  const history = useHistory()
  const onClick = () => {
    history.push('/confirmation')
  }

  const {
    register,
    handleSubmit,
    control,
    //watch,
    errors,
    formState: { isSubmitting },
  } = useForm()

  //NEED TO GET THE DATE & NO OF PEOPLE OUT OF THE FORM BEFORE SUBMITTING
  const watchedDate = useWatch({
    control,
    name: "date",
    defaultValue: "2021-01-04"});

  const watchedNoOfPeople = useWatch({
    control,
    name: "number",
    defaultValue: "0"});

  console.log("the date from use watch " + watchedDate);
  console.log("the noPeople from use watch " + watchedNoOfPeople);
  console.log(`Restaurant id from booking page is ${id}`);

  const [bookedSlots, setBookedSlots] = useState([])

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const sendSms = (data1) => {
    const message = {
      to: data1.mobile,
      body: `A ${
        restaurant.restaurantName
      } Booking Confirmation for a group of ${
        data1.number
      } people at ${data1.date.toLocaleDateString('en-UK', options)} ${
        data1.time
      }`,
    }
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('sms send sucessfully', data)
        } else {
          console.log('sms did not send sucessfully', data)
        }
      })
  }
  const onSubmit = (data) => {
    console.log('this is data: ', data)
    sendSms(data)
    postBooking(data)
    Book({ id })
    onClick()
  }

  const postBooking = (formData) => {
    console.log(formData.date)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        RestaurantID: id,
        CustomerName: formData.fullName,
        BookingDate: formatDate(formData.date),
        BookingTime: formData.time,
        NumberOfPeople: parseInt(formData.number),
        CustomerMobile: formData.mobile,
        CustomerEmail: formData.email,
        RestaurantName: restaurant.restaurantName,
      }),
    }
    fetch(`${BACKEND_URL_Bookings}`, requestOptions)
  }

  //!!! FUNCTION IS JUST TEMPORARY SHOWING WHEN THE DATA IS SUBMITTED
  //This can be used instead to redirect to the booking confirmation page where we thank them for the booking and give them the latest covid safety info for restaurants
  function Book({ id }) {
    console.log(`This id ( ${id} ) is logged when the submit button is pressed`)
  }

  //GET THE SLOTS ALREADY BOOKED
  useEffect(() => {
    async function getBookedSlots() {
      let response = await fetch(
        `${BACKEND_URL_TimeSlots}?restaurantId=${id}&date=${formatDate(watchedDate).toString()}` //
      );
      let data = await response.json();
      console.log(data);
      setBookedSlots(data);
    }                                                                                                          
    getBookedSlots()
  },[watchedDate]);


  console.log(bookedSlots)

  //Format the date to match the match the format required for the 
  function formatDate(date){
    if (date !== undefined){

      var stringDate = date.toString(); //eg Fri Apr 02 2021 00:00:00 GMT+0100 (British Summer Time)
      var yearString = stringDate.slice(11,15); //year string eg 2021
      var monthString = stringDate.slice(4,7);  //month string eg Jan
      var dayString = stringDate.slice(8,10);  //day string eg 14
  
      switch (monthString)
        {
          case "Jan":
            monthString = "01";
            break;
          case "Feb":
            monthString = "02";
            break;
          case "Mar":
            monthString = "03";
            break;
          case "Apr":
            monthString = "04";
            break;
          case "May":
            monthString = "05";
            break;
          case "Jun":
            monthString = "06";
            break;      
          case "Jul":
            monthString = "07";
            break;
          case "Aug":
            monthString = "08";
            break;
          case "Sep":
            monthString = "09";
            break;
          case "Oct":
            monthString = "10";
            break;
          case "Nov":
            monthString = "11";
            break;
          default: 
            monthString = "12";
      }
  
      var fullDate= dayString.concat(`-${monthString}-${yearString}`); //concatenated date format DD/MM/YYYY
      //console.log(fullDate);
      return fullDate;
    }
  }
  
  // NEED TO GENERATE ARRAY WITH 1H SLOTS BETWEEN THE OPENING TIME AND CLOSING TIME
  function generateAllPossibleBookingSlots(start, end, step = 100) {
    const len = Math.floor((end - start) / step) + 1
    return Array(len)
      .fill()
      .map((_, idx) => start + idx * step)
  }

  var allRestaurantSlots = generateAllPossibleBookingSlots(
    parseInt(restaurant.openingTimes),
    parseInt(restaurant.closingTimes) - 100,
    100
  )

  var allRestaurantTimeSlots = []
  for (let i = 0; i < allRestaurantSlots.length; i++) {
    var slot = allRestaurantSlots[i].toString()
    var splicedSlot = [slot.slice(0, 2), ':', slot.slice(2)].join('')
    allRestaurantTimeSlots.push(splicedSlot)
  }

  // CHECK OVER THE ARRAY WITH ALL THE SLOTS AND COMPARE AGAINST THE SLOTS THAT ALREADY HAVE BOOKINGS
  const filteredTimeSlots = allRestaurantTimeSlots.filter((ts)=>{
    if (bookedSlots.some((booking)=>{ return booking.timeSlot === ts})) {
      return bookedSlots.some((booking)=>{
        return booking.timeSlot === ts && (booking.currentSlotOccupancy+parseInt(watchedNoOfPeople)) < restaurant.capacity;  
      })}
    else {
      return true;
    }
  })

  console.log(filteredTimeSlots)

  return (
    <>
    <Header/>
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
      </select>
     
      <section>
        <label>Date:</label>
        <Controller 
          name="date"
          control={control}
          render={(props) => (
            <DatePicker 
              placeholderText="Select Date"
              onChange={(e) => props.onChange(e)}
              selected={props.value}
              dateFormat="dd-MM-yyyy"
              defaultValue={startOfDay(new Date())} 
              // locale='enGB'
              minDate={startOfDay(new Date())}    //set earliest date available to book to today -- startOfDay vs startOfToday
            />
          )}
          ref={register({ required: true })}
        />
      </section>
      <label>Time:</label>
      <select name="time" ref={register({ required: true })}>
      <option value="">Select...</option>
        {/* {allRestaurantTimeSlots.map((item) =>{
                 return <option value={item.toString()}>{item}</option>
        })} */}

        {filteredTimeSlots.map((item) =>{
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
        }}
      />
    </form>
    <p className={css.p}>If you have any special requirements, please contact the restaurant directly.</p>
    </>
  )
}

export default withRouter(BookingPage)
