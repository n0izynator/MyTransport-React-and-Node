import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
    constructor(props){
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            pass: ''
        }

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

    onSubmit(e){
        e.preventDefault();

        const log = {
            email: this.state.email,
            pass: this.state.pass
        }

        console.log(log)

        axios.post('http://localhost:5000/login', log)
        .then(res => {if(res.data.auth) 
                        this.props.history.push('/workers');
        });
    }


    render() {
      return (
        <div className='wrap'>
            <h1>Logowanie</h1>
                <form onSubmit={this.onSubmit}>
  
                    <div>
                        <input type="email"
                            required
                            className="textInput"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            placeholder="LOGIN"
                        />
                    </div>

                    <div>
                        <input type="password"
                            required
                            className="textInput"
                            value={this.state.pass}
                            onChange={this.onChangePass}
                        />
                    </div>

                    <div>
                        <input type="submit" className="button" value="Zaloguj" />
                    </div>

                </form>
        </div>
      );
    }
  }