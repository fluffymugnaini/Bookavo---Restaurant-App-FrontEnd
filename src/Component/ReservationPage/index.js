import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import Header from "../Header";
import css from "./reservationPage.module.css";
import BACKEND_URL_Bookings from "../../libs/config";
import { useAuth0 } from "@auth0/auth0-react";

function ReservationPage() {
  const [data, setData] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  //   const auth0id = user.sub;

  // console.log(user);
  // console.log(isAuthenticated);

  useEffect(() => {
    async function getBookings() {
      if(isAuthenticated){
        let response = await fetch(`${BACKEND_URL_Bookings}?token=${user.sub}`);
        let data = await response.json();
        // console.log(data);
        // console.log(data.bookingDate);
        setData(data);
      }
    }
    getBookings();
  },[isAuthenticated]);

  const columns = useMemo(
    () => [
      {
        Header: " ",

        columns: [
          {
            Header: "Date",
            accessor: "bookingDate",
          },
          {
            Header: "Time",
            accessor: "bookingTime",
          },
          {
            Header: "Number of People",
            accessor: "numberOfPeople",
          },
          {
            Header: "Reserver Name",
            accessor: "customerName",
          },
          {
            Header: "Email",
            accessor: "customerEmail",
          },
          {
            Header: "Mobile",
            accessor: "customerMobile",
          },
        ],
      },
    ],
    []
  );

  return (
    <div className={css.resPage}>
      <Header />
      <h1>Reservation Page</h1>

      <Table columns={columns} data={data} />
    </div>
  );
}

export default ReservationPage;
