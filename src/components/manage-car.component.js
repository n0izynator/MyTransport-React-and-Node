import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Car = props => (
  <div className='kierowca'>
      <img className='image' src={props.car.Zdjecie} alt='pojazd'></img>
      <p className='name'>{props.car.Marka} {props.car.Model}</p>
      <p className='email'>Numer rejestracyjny: {props.car.NumerRejestracyjny}</p>
      <p className='job'>Rok produkcji: {props.car.RokProducji.substring(0,4)}</p>
      <p style={{fontSize: 18}}>VIN: {props.car.VIN}</p>
  </div>
)

const AcctualWorkerCar = props => (
  <div className = 'kierowca'>
      <img className='image' src={props.workercar.Zdjecie} alt='pracownik'></img>
      <p className='name'>{props.workercar.Imie} {props.workercar.Nazwisko}</p>
      <p className='email'>Rozpoczęcie prowadzenia pojazdu: {props.workercar.RozpoczeciePracy.substring(0,10)} </p> 
      <button className='buttonZak' onClick={() => { props.endDrving(props.workercar.ID) }}>Zakończ prowadzenie pojazdu</button>
  </div>
)

const WorkerCar = props => (

  <div className = 'kierowca'>
      <img className='image' src={props.workercar.Zdjecie} alt='pracownik'></img>
      <p className='name'>{props.workercar.Imie} {props.workercar.Nazwisko}</p>

      <p className='email'>Okres prowadzenia pojazdu: {props.workercar.RozpoczeciePracy.substring(0,10)} - {props.workercar.ZakonczeniePracy.substring(0,10)} </p>
      <button className='buttonZak' onClick={() => { props.delete(props.workercar.ID) }}>Usuń z historii</button>
  </div>
)

export default class ManageCar extends Component {
  constructor(props){
    super(props);

    this.endDrving = this.endDrving.bind(this)
    this.onChangeNewWorker = this.onChangeNewWorker.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
        workerCars: [],
        acctualWorker: [],
        car: [],
        workers: [],
        newWorker: '1'
    };

}
 
 
  componentDidMount(){
    axios.get('http://localhost:5000/car/history/'+this.props.match.params.id)
    .then(response => {
      this.setState({ workerCars: response.data });
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get('http://localhost:5000/car/history/acctual/'+this.props.match.params.id)
    .then(response => {
      this.setState({ acctualWorker: response.data })
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get('http://localhost:5000/cars/'+this.props.match.params.id)
    .then(res => {
        this.setState({ car: res.data })
    })
    
    axios.get('http://localhost:5000/workers/drivers')
    .then(response => {
      this.setState({ workers: response.data.map(worker => worker.ID+" "+worker.Imie+" "+worker.Nazwisko)})
    })
    .catch((error) => {
      console.log(error);
    })
  }

onChangeNewWorker(e) {
    this.setState({
        newWorker: e.target.value
    })
}

endDrving(id){
  axios.post('http://localhost:5000/car/history/end/'+id)
  .then(response => { console.log(response.data);   this.componentDidMount();});

  this.setState({
    acctualWorker: this.state.acctualWorker.filter(c => c.ID !== id)
  })
  }

delete(id){
  axios.post('http://localhost:5000/car/history/delete/'+id)
  .then(response => { console.log(response.data);   this.componentDidMount();});

  this.setState({
    workerCars: this.state.workerCars.filter(c => c.ID !== id)
  })
  }

  checkAcctual(newID, ID) {
    return newID === ID;
  }

onSubmit(e) {
    e.preventDefault();

    const workerCar = {
        workerid: this.state.newWorker.substring(0,1),
        carid: this.state.car[0].NumerRejestracyjny
    }
    
    if(this.state.acctualWorker.length === 0){
      axios.post('http://localhost:5000/car/history/update/'+this.props.match.params.id, workerCar)
          .then(res => {console.log(res.data); this.componentDidMount();});
    }else{
      toast.error("Nie można dodać więcej niż jednego kierowce!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
    

}

carList() {
  return this.state.car.map(currentcar => {
      return <Car car={currentcar} key={currentcar.nr} />;
  })
}

workerCarAcctual(){
  console.log(this.state.acctualWorker)
  return this.state.acctualWorker.map(currentworkercar => {
    return <AcctualWorkerCar workercar={currentworkercar} endDrving={this.endDrving} key={currentworkercar.ID}/>;
  })
}

workerCarList() {
  return this.state.workerCars.map(currentworkercar => {
    return <WorkerCar workercar={currentworkercar} delete={this.delete} key={currentworkercar.ID}/>;
  })
}

 
  render() {

    return (
      <div className="manageWrap">
          <div className="WorkerHistory">
                <div className="ListHeader">
                    <h1>Aktualny kierowca</h1>
                </div>
                { this.workerCarAcctual() }
            </div>

            <div className="CurrentWorker">
                <div className="ListHeader">
                    <h1>Dane Pojazdu</h1>
                    <Link to="/cars"><button className="buttonNav">Wróć do pojazdów</button></Link>
                </div>
                { this.carList() }
            </div>

          <div className="WorkerHistory">
                <div className="ListHeader">
                    <h1>Historia kierowców</h1>
                </div>
                { this.workerCarList() }
            </div>

            <div className="CurrentWorker">
                <div className="ListHeader">
                    <h1>Nowy kierowca</h1>
                </div>
                <form onSubmit={this.onSubmit}>
                          
                          <div className="ListHeader">
                            <select ref="userInput"
                                required
                                value={this.state.newWorker}
                                onChange={this.onChangeNewWorker}
                                className="dInput">                      
                                {
                                  this.state.workers.map(function (worker) {
                                      return <option
                                          key={worker}
                                          value={worker}>{worker}
                                      </option>;
                                  })
                                }
      
                            </select>
      
      
                          <input type="submit" className="buttonSub" value="Przypisz kierowce" />
                          </div>
                          </form>
            </div>

    </div>
    )
  }
}