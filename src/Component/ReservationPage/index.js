import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import Header from "../Header";
import css from "./reservationPage.module.css";
import BACKEND_URL_Bookings from "../../libs/config";
import { useAuth0 } from "@auth0/auth0-react";
import { id } from "date-fns/locale";

function ReservationPage() {
  const [data, setData] = useState([]);
  const { user, isAuthenticated } = useAuth0();

   async function getBookings() {
     if (isAuthenticated) {
       let response = await fetch(`${BACKEND_URL_Bookings}?token=${user.sub}`);
       let data = await response.json();
       setData(data);
     }
   }

  useEffect(() => {
    getBookings();
  }, [isAuthenticated]);

  async function deleteBooking(bookingId, onSuccess) {
    let response = await fetch(`${BACKEND_URL_Bookings}/${bookingId}`, {
      method: "DELETE",
    });
    // let data = await response.json();
    // onSuccess(data);
    
    console.log(bookingId);
  }

  
  function handleClick(bookingId){
    deleteBooking(bookingId, () => {
      setData(data.filter((bookingId) => data.bookingId !== bookingId));
      // getBookings();
      // window.location.reload();
    })
  };

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
          // {
          //   Header: "Id",
          //   accessor: "bookingId",
          // },
          // Below am trying to add a delete button to each row...

          {
            Header: "Operation",
            accessor: "bookingId",
            Cell: ({ cell }) => (
              <button 
                className = {css.delete}
                value={cell.row.values.bookingId}
                onClick={() => {handleClick(cell.row.values.bookingId);
                window.location.reload();
                }}
              >
                DELETE
              </button>
            ),
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
