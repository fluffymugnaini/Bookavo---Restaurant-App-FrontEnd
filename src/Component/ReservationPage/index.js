import React, { useMemo, useState, useEffect } from 'react';
import Table from './Table';
import Header from '../Header';
import css from './reservationPage.module.css';
import BACKEND_URL_Bookings from "../../libs/config";
import { useAuth0 } from "@auth0/auth0-react";

// const { user } = useAuth0();
// const auth0id = user.sub;

function ReservationPage() {
    const [data, setData] = useState([]);
    // const BACKEND_URL ="https://localhost:5001/bookings";

   useEffect(() => {
    async function getBookings() {
      let response = await fetch(`${BACKEND_URL_Bookings}/1`); //get bookings by restaurant id - hardcoded at the moment but won't be if we sort out Auth0
      let data = await response.json();
      console.log(data);
      console.log(data.bookingDate)
      setData(data)
    }
    getBookings();
  }, []); 

  const columns = useMemo(
      () => [
          {
              Header: `Restaurant Name`,    
              
              columns: [
                  {
                      Header: "Date",
                      accessor: "bookingDate"
                  },
                  {
                      Header: "Time",
                      accessor: "bookingTime"
                  },
                  {
                      Header: "Number of People",
                      accessor: "numberOfPeople"
                  },
                  {
                      Header: "Reserver Name",
                      accessor: "customerName"
                  },
                  {
                      Header: "Email",
                      accessor: "customerEmail"
                  },
                  {
                      Header: "Mobile",
                      accessor: "customerMobile"
                  },
              ]
          }
      ],
      []
  )

 

        return (
            <div className={css.resPage}>
                <Header/>
                <h1>Reservation Page</h1>
             
              
                <Table columns={columns} data={data} />
            </div>
        )
    }

    export default ReservationPage;

