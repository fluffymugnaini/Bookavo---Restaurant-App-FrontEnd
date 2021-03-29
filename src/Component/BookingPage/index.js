import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import css from './bookingPage.module.css';
// import DatePicker from "react-datepicker";

function BookingPage({id}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    formState: { isSubmitting },
  } = useForm();

  const [selectedDate, setSelectedDate] = useState(null);

  const BACKEND_URL = "https://localhost:5001/bookings";

  const onSubmit = (data) => {
    console.log(data);
    console.log(moment(selectedDate).format("DD/MM/YYYY"));

    console.log(data.date);

    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        RestaurantID: 1, //needs to pull the id from the restInfo
        CustomerName: data.fullName,
        BookingDate: data.date,
        BookingTime: data.time,
        NumberOfPeople: parseInt(data.number),
        CustomerMobile: data.mobile,
        CustomerEmail: data.email,
      }),
    };

    fetch(`${BACKEND_URL}`, requestOptions);
    // .then(response => response.json())
    // .then(data => console.log(data));
  };

  function Book() {
    console.log(id);
    //alert("Cool you've booked");
    alert(id);
  }

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
          defaultValue={null}
          ref={register({ required: true })}
        />
      </section>
      
      <label>Time:</label>
      <input name="time" ref={register({ required: true })} />
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
          
          Book();
        }}
      />
    </form>
  );
}

export default BookingPage;
