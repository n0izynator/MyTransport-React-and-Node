import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const WorkerCar = props => (

    <div className = 'kierowca'>
        <img className='image' src={props.workercar.Zdjecie} alt='pracownik'></img>
        <p className='name'>{props.workercar.Imie} {props.workercar.Nazwisko}</p>

        <p className='job'>Okres prowadzenia pojazdu: {props.workercar.RozpoczeciePracy.substring(0,10)} - {props.workercar.ZakonczeniePracy.substring(0,10)} </p> 
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

const Car = props => (
    <div className='kierowca'>
        <img className='image' src='https://live.staticflickr.com/846/29695545008_11f54db535_b.jpg' alt='pojazd'></img>
        <p className='name'>{props.car.manufacturer} {props.car.model}</p>
        <p className='email'>Numer rejestracyjny: {props.car.nr}</p>
        <p className='job'>Rok produkcji: {props.car.year.substring(0,4)}</p>

    </div>
  )


export default class ManageCar extends Component {
    constructor(props){
        super(props);

        this.endDrving = this.endDrving.bind(this)
        this.onChangeNewWorker = this.onChangeNewWorker.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            workerCars: [],
            acctualWorker: [],
            car: [],
            workers: [],
            newWorker: '1'
        };

    }

    componentDidMount() {
        console.log('monunting')
        axios.get('http://localhost:5000/car/history/'+this.props.match.params.id)
          .then(response => {
            this.setState({ workerCars: response.data });
            console.log(response.data)
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
              console.log(res.data)
          })

          axios.get('http://localhost:5000/workers/')
          .then(response => {
            this.setState({ workers: response.data.map(worker => worker.id+" "+worker.firstName+" "+worker.lastName)})
            console.log(this.state.workers)
          })
          .catch((error) => {
            console.log(error);
          })

      }

      endDrving(id){
        axios.post('http://localhost:5000/car/history/end/'+id)
        .then(response => { console.log(response.data)});
  
        this.setState({
            acctualWorker: this.state.acctualWorker.filter(c => c.ID !== id)
        })

        this.componentDidMount();
        }

    workerCarAcctual(){
        return this.state.acctualWorker.map(currentworkercar => {
          return <AcctualWorkerCar workercar={currentworkercar} endDrving={this.endDrving} key={currentworkercar.ID}/>;
        })
      }


    workerCarList() {
        return this.state.workerCars.map(currentworkercar => {
          return <WorkerCar workercar={currentworkercar} key={currentworkercar.ID}/>;
        })
      }

    carList() {
        return this.state.car.map(currentcar => {
            return <Car car={currentcar} key={currentcar.nr} />;
        })
    }

    onChangeNewWorker(e) {
        this.setState({
            newWorker: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
  
        const workerCar = {
            workerid: this.state.newWorker.substring(0,1),
            carid: this.state.car[0].nr
        }
  
        console.log(workerCar)

        axios.post('http://localhost:5000/car/history/update/'+this.props.match.params.id, workerCar)
            .then(res => console.log(res.data));


        window.location = "/car/manage/"+this.props.match.params.id
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