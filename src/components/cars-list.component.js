import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Car = props => (
  <div className='pojazd'>
      <img className='image' src={props.car.Zdjecie} alt='pojazd'></img>
      <p className='name'>{props.car.Marka} {props.car.Model}</p>
      <p className='email'>Numer rejestracyjny: {props.car.NumerRejestracyjny}</p>
      <p className='job'>Rok produkcji: {props.car.RokProducji.substring(0,4)}</p>

      <div className="vl1"></div>

      <Link to={"/car/edit/" + props.car.NumerRejestracyjny}><button className="buttonEdytuj">Edytuj pojazd</button></Link>
      <button className="buttonUsun" onClick={() => { props.deleteCar(props.car.NumerRejestracyjny) }}>Usun pojazd</button>
      <Link to={"/car/manage/" + props.car.NumerRejestracyjny}><button className="buttonEdytuj">Zarządzaj kierowcami</button></Link>
  </div>
)

export default class PojazdyList extends Component {
  
  constructor(props) {
      super(props);

      this.deleteCar = this.deleteCar.bind(this)

      this.state = { cars: [] };
  }

  componentDidMount() {
      axios.get('http://localhost:5000/cars/')
          .then(res => {
              this.setState({ cars: res.data })
              console.log(res.data)
          })
  }

  componentDidUpdate(){
    this.componentDidMount()
  }

  deleteCar(nr) {
    axios.delete('http://localhost:5000/cars/'+nr)
      .then(response => { 
        console.log(response.data); 
        toast.error("Usunięto pojazd!", {
        position: toast.POSITION.BOTTOM_RIGHT
      }); 
    });
  }

  carList() {
      return this.state.cars.map(currentcar => {
          return <Car car={currentcar} deleteCar={this.deleteCar} key={currentcar.nr} />;
      })
  }

  notifyTest(){
    toast.error("Usunięto pojazd!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  render() {

      return (
          <div>
        <div className="ListHeader">
          <h1>Pojazdy</h1>
          <div>
            <Link to="/car/add" ><button className="buttonNav">Dodaj pojazd</button></Link>
            <Link to="/workers"><button className="buttonNav">Pracownicy</button></Link>
          </div>
        </div>
              {this.carList()}
          </div>
      );
  }
}