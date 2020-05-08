import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditWorker extends Component {
  constructor(props) {
      super(props);

      this.onChangeFirstName = this.onChangeFirstName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.onChangeJob = this.onChangeJob.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePass = this.onChangePass.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeYear = this.onChangeYear.bind(this);
      this.onChangeZdjecie = this.onChangeZdjecie.bind(this);

      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        job: '',
        pass: '',
        Zdjecie: '',
        DataZatrudnienia: new Date(),
        jobs: []
      }
  }

  componentDidMount() {
      console.log(this.props)
      axios.get('http://localhost:5000/workers/' + this.props.match.params.id)
          .then(response => {
              console.log(response)
              this.setState({
                  firstName: response.data[0].Imie,
                  lastName: response.data[0].Nazwisko,
                  email: response.data[0].AdresEmail,
                  job: response.data[0].Stanowisko,
                  pass: '',
                  Zdjecie: response.data[0].Zdjecie,
                  DataZatrudnienia: new Date(response.data[0].DataZatrudnienia)
              })
          })



      axios.get('http://localhost:5000/jobs/')
          .then(response => {
              if (response.data.length > 0) {
                  this.setState({
                      jobs: response.data.map(job => job.job),
                  })
              }
          })
          .catch((error) => {
              console.log(error);
          })

  }

  onChangeFirstName(e) {
      this.setState({
          firstName: e.target.value
      })
  }

  onChangeLastName(e) {
      this.setState({
          lastName: e.target.value
      })
  }

  onChangeJob(e) {
      this.setState({
          job: e.target.value
      })
  }

  onChangeEmail(e) {
      this.setState({
          email: e.target.value
      })
  }

  onChangePass(e) {
      this.setState({
          pass: e.target.value
      })
  }

  onChangeZdjecie(e) {
    this.setState({
        Zdjecie: e.target.value
    })
}

onChangeYear(year) {
    this.setState({
        DataZatrudnienia: year
    })
}



  onSubmit(e) {   
      const worker = {
        Imie: this.state.firstName,
        Nazwisko: this.state.lastName,
        AdresEmail: this.state.email,
        Stanowisko: this.state.job,
        Firma: 1,
        DataZatrudnienia: this.state.DataZatrudnienia,
        Zdjecie: this.state.Zdjecie,
        pass: this.state.pass
      }

      console.log(worker);

      axios.post('http://localhost:5000/workers/update/'+this.props.match.params.id, worker)
          .then(res => {console.log(res.data); 
            toast.info('Edytowano pracownika: '+worker.Imie+' '+worker.Nazwisko, {
                position: toast.POSITION.BOTTOM_RIGHT
              }); 
        });


  }

  render() {

      return (
        <div className='formAdd'>
              <h1>Edytuj pracownika</h1>
              <form>

                  <div>
                      <input type="text"
                          required
                          className="textInput"
                          value={this.state.firstName}
                          onChange={this.onChangeFirstName}
                          placeholder="IMIE"
                      />
                  </div>

                  <div>
                      <input type="text"
                          required
                          className="textInput"
                          value={this.state.lastName}
                          onChange={this.onChangeLastName}
                          placeholder="NAZWISKO"
                      />
                  </div>

                  <div>
                      <select ref="userInput"
                          required
                          className="textInput"
                          value={this.state.job}
                          onChange={this.onChangeJob}>
                          {
                              this.state.jobs.map(function (job) {
                                  return <option
                                      key={job}
                                      value={job}>{job}
                                  </option>;
                              })
                          }
                      </select>
                  </div>

                  <div className="inputRok">
                        <label>Data zatrudnienia: </label>
                        <DatePicker
                            className="textInput"
                            selected={this.state.DataZatrudnienia}
                            onChange={this.onChangeYear}
                            placeholderText="Data zatrudnienia"
                        />
                    </div>

                    <div className="photoCon">
                        <img className="photo" src={this.state.Zdjecie} alt='Avatar Pracownika'></img>
                        <textarea type="text"
                            className="urlInput"
                            value={this.state.Zdjecie}
                            onChange={this.onChangeZdjecie}
                            placeholder="URL ZDJECIA"
                        />
                    </div>

                  <div>
                      <input type="email"
                          required
                          className="textInput"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          placeholder="EMAIL"
                      />
                  </div>

                  <label>Potwierdź aktualnym hasłem lub podaj nowe</label>
                  <div>
                      <input type="password"
                          required
                          className="textInput"
                          value={this.state.pass}
                          onChange={this.onChangePass}
                          placeholder="PASSWORD"
                      />
                  </div>

                  <div>
                    <Link to='/workers' onClick={this.onSubmit}><input type="submit" className="button" value="Edytuj pracownika" /></Link>
                    <Link to='/workers'  onClick={() => {
                            toast.warn("Anulowano edycje pracownika!", {
                                position: toast.POSITION.BOTTOM_RIGHT
                              });
                        }}><button className="button">Anuluj</button></Link>
                  </div>
              </form>
          </div>
      )
  }
}