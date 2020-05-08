import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class AddCar extends Component {
    constructor(props) {
        super(props);
  
        this.onChangeNr = this.onChangeNr.bind(this);
        this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeVIN = this.onChangeVIN.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeZdjecie = this.onChangeZdjecie.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {
            NumerRejestracyjny: '',
            Marka: '',
            Model: '',
            Firma: '',
            Rodzaj: '',
            VIN: '',
            RokProducji: new Date(),
            Zdjecie: ''
        }
    }
  
    onChangeNr(e) {
        this.setState({
            NumerRejestracyjny: e.target.value
        })
    }
    onChangeManufacturer(e) {
        this.setState({
            Marka: e.target.value
        })
    }
  
    onChangeModel(e) {
        this.setState({
            Model: e.target.value
        })
    }
  
    onChangeVIN(e) {
        this.setState({
            VIN: e.target.value
        })
    }
  
    onChangeYear(year) {
        this.setState({
            RokProducji: year
        })
    }

    onChangeZdjecie(e) {
        this.setState({
            Zdjecie: e.target.value
        })
    }
 
    onSubmit(e) {
  
        const car = {
            NumerRejestracyjny: this.state.NumerRejestracyjny,
            Marka: this.state.Marka,
            Model: this.state.Model,
            VIN: this.state.VIN,
            RokProducji: this.state.RokProducji,
            Zdjecie: this.state.Zdjecie
        }
  
        console.log(car);
  
        axios.post('http://localhost:5000/cars/add', car)
            .then(res => {
                    toast.success('Dodano pojazd do bazy!', {
                        position: toast.POSITION.BOTTOM_RIGHT
                      });

            });
  
        
    }
  
    render() {

        return (
            <div className='formAdd'>
                <h1>Dodaj pojazd</h1>
                <form>
  
                    <div>
                        <input type="text"
                            required
                            className="textInput"
                            value={this.state.NumerRejestracyjny}
                            onChange={this.onChangeNr}
                            placeholder="NR REJESTRACYJNY"
                        />
                    </div>

                    <div>
                        <input type="text"
                            required
                            className="textInput"
                            value={this.state.Marka}
                            onChange={this.onChangeManufacturer}
                            placeholder="MARKA"
                        />
                    </div>
  
                    <div>
                        <input type="text"
                            required
                            className="textInput"
                            value={this.state.Model}
                            onChange={this.onChangeModel}
                            placeholder="MODEL"
                        />
                    </div>
  
                    <div>
                        <input type="text"
                            required
                            className="textInput"
                            value={this.state.VIN}
                            onChange={this.onChangeVIN}
                            placeholder="VIN"
                        />
                    </div>
  
                    <div className="inputRok">
                        <label>Rok produkcji: </label>
                        <DatePicker
                            className="textInput"
                            selected={this.state.RokProducji}
                            onChange={this.onChangeYear}
                            placeholderText="ROK PRODUKCJI"
                        />
                    </div>

                    <div className="photoCon">
                        <img className="photo" src={this.state.Zdjecie} alt='pojazd'></img>
                        <textarea type="text"
                            className="urlInput"
                            value={this.state.Zdjecie}
                            onChange={this.onChangeZdjecie}
                            placeholder="URL ZDJECIA"
                        />
                    </div>

                    <div>
                        <Link to='/cars' onClick={this.onSubmit}><input type="submit" className="button" value="Dodaj pojazd" /></Link>
                        
                        <Link to='/cars' onClick={() => {
                            toast.warn("Anulowano dodawanie pojazdu!", {
                                position: toast.POSITION.BOTTOM_RIGHT
                              });
                        } }><button className="button">Anuluj</button></Link>
                    </div>

                </form>
            </div>
        )
    }
  }