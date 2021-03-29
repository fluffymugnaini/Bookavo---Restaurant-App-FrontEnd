import React, { useMemo, useState, useEffect } from 'react';
import Table from './Table';
import css from './reservationPage.module.css';
import BACKEND_URL_Bookings from "../../libs/config";


function ReservationPage() {
    const [data, setData] = useState([]);
    // const BACKEND_URL ="https://localhost:5001/bookings";

   useEffect(() => {
    async function getBookings() {
      let response = await fetch(`${BACKEND_URL_Bookings}`); 
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
              Header: "Restaurant Name",
              
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
                <h1>Reservation Page</h1>
             
              
                <Table columns={columns} data={data} />
            </div>
        )
    }

    export default ReservationPage;

