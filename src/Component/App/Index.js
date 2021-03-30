import './App.css';
import Header from '../Header/';
// import Button from '../Button';
import RestaurantInfo from '../RestaurantInfo';
import BookingPage from '../BookingPage';
import ReservationPage from '../ReservationPage';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import reducer, {INITIAL_REST} from '../../libs/restaurantReducer';
import React, { useReducer, useState } from "react";
import LandingPage from '../LandingPage';

function App() {
  const [restaurant, dispatch] = useReducer(reducer, INITIAL_REST);
  const [id, setId] = useState(1);
  console.log(`Id is ${id}`);

   function newRec() {
    setId(Math.floor(Math.random() * 4) + 1);
    console.log(`Button id is ${id}`);
  }

  return (
    <Router>
    <div className="App">
      <nav class="nav">
              <ul>
                <li>
                  <Link to="/">Landing Page</Link>
                </li>
                <li>
                  <Link to="/recs">Recommendations</Link>
                </li>
                <li>
                  <Link to="/bookings">Booking Page</Link>
                </li>
                <li>
                  <Link to="/reservations">Reservations</Link>
                </li>
              </ul>
            </nav>

<Switch>
              <Route path="/bookings">
                <BookingPage id={id}/>
              </Route>
              <Route path="/recs">
                <RestaurantInfo restaurant={restaurant} dispatch={dispatch} id={id} newRec={newRec}/>
              </Route>
              <Route path="/reservations">
                <ReservationPage />
              </Route>
              <Route path="/">
                <LandingPage />
              </Route>
            </Switch>

    
        
     
        </div>
        </Router>
  );
  }

export default App;
