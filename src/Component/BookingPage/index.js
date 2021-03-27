import React from "react";
import { useForm } from "react-hook-form";
import css from './bookingPage.module.css';
// import DatePicker from "react-datepicker";


function BookingPage() {
  const { register, handleSubmit, watch, errors, formState: { isSubmitting } } = useForm();

  const BACKEND_URL ="https://localhost:5001/bookings";

  const onSubmit = data => {
    console.log(data);
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          RestaurantID : 1,           //needs to pull the id from the restInfo 
          CustomerName: data.fullName,
          BookingDate: data.date,
          BookingTime: data.time,
          NumberOfPeople: parseInt(data.number),
          CustomerMobile: data.mobile,
          CustomerEmail: data.email})
    };
    
    fetch(`${BACKEND_URL}`, requestOptions);
        // .then(response => response.json())
        // .then(data => console.log(data));
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
  <h1 className={css.h1}>Book a Table</h1>
      <label>Full Name:</label>
      <input name="fullName" ref={register({ required: true })} />
      {/* <DatePicker
              innerRef={register}
              name="datetime"
              className={"form-control"}
              selected={startDate}
              onChange={date => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MM-dd-yyyy h:mm"
            /> */}

       <label>Date:</label>
      <input name="date" ref={register({ required: true })} />
       <label>Time:</label>
      <input name="time" ref={register({ required: true })} />
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
      <label>Your Mobile Number</label>
      <input
        name="mobile"
        type="mobile"
        ref={register({ required: true})}
      />
      <label>Email</label>
      <input
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
       <input disabled={isSubmitting} type="submit" />
    </form>
  );
}

export default BookingPage
