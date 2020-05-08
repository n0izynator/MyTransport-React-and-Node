import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Worker = props => (
  <div className='pracownik'>
      <img className='image' src={props.worker.Zdjecie} alt='pracownik'></img>
      <p className='name'>myID:{props.worker.ID} | {props.worker.Imie} {props.worker.Nazwisko}</p>
      <p className='email'>{props.worker.AdresEmail}</p>
      <p className='job'>Stanowisko: {props.worker.Stanowisko}</p>

      <div className="vl1"></div>

      <Link to={"/worker/edit/" + props.worker.ID}><button className="buttonEdytuj">Edytuj pracownika</button></Link>
      <button className="buttonUsun" onClick={() => { props.deleteWorker(props.worker.ID) }}>Usun pracownika</button>
  </div>
  )

export default class WorkersList extends Component {
  constructor(props) {
    super(props);

    this.deleteWorker = this.deleteWorker.bind(this)

    this.state = {workers: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/workers/')
      .then(response => {
        this.setState({ workers: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidUpdate(){
    this.componentDidMount()
  }

  deleteWorker(id) {
    axios.delete('http://localhost:5000/workers/'+id)
      .then(response => { 
        console.log(response.data); 
        toast.error("Usunięto pracownika!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
  }

  workerList() {
    return this.state.workers.map(currentworker => {
      return <Worker worker={currentworker} deleteWorker={this.deleteWorker} key={currentworker.id}/>;
    })
  }

  render() {
    return (
      <div>
        <div className="ListHeader">
          <h1>Pracownicy</h1>
          <div>
            <Link to="/worker/add" ><button className="buttonNav">Dodaj pracownika</button></Link>
            <Link to="/cars"><button className="buttonNav">Pojazdy</button></Link>
          </div>
        </div>
            { this.workerList() }
      </div>
    )
  }
}