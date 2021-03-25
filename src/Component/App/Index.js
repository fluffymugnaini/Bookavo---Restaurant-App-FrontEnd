import './App.css';
import Header from '../Header/';
import Button from '../Button';
import RestInfo from '../RestInfo';

function App() {
  
// function Book(){
// alert("Cool you've booked")
// }

// function newRec(){
// alert("Here's a new restaurant")
// }

  return (
    <div className="App">
      <Header />
      <div>
        <RestInfo/>
   {/* <Button text="Book" handleClick={Book}/>
    <Button text="Give me another!" handleClick={newRec}/> */}
      </div>
        </div>
  );
  }

export default App;
