import React, { useMemo, useState, useEffect } from 'react';
import Table from './Table';
import css from './reservationPage.module.css';


function ReservationPage() {
    const [data, setData] = useState([]);
    const BACKEND_URL ="https://localhost:5001/bookings";

   useEffect(() => {
    async function getBookings() {
      let response = await fetch(`${BACKEND_URL}`); 
      let data = await response.json();
      console.log(data);
      console.log(data.bookingDate)
    //   setData(data)
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
                      accessor: "data.bookingTime"
                  },
                  {
                      Header: "Number of People",
                      accessor: "data"
                  },
                  {
                      Header: "Reserver Name",
                      accessor: "data.fullName"
                  },
                  {
                      Header: "Contact Details",
                      accessor: "data.email"
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

