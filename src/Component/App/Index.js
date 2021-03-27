import './App.css';
import Header from '../Header/';
import Button from '../Button';
import RestInfo from '../RestInfo';
import BookingPage from '../BookingPage';
import ReservationPage from '../ReservationPage';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
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
                <BookingPage />
              </Route>
              <Route path="/recs">
                <RestInfo/>
              </Route>
              <Route path="/reservations">
                <ReservationPage />
              </Route>
              <Route path="/">
                <Header />
              </Route>
            </Switch>

    
        
     
        </div>
        </Router>
  );
  }

export default App;
