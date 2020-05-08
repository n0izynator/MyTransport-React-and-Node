import React, { Component } from 'react';
import { Link } from 'react-router-dom';
  
  function GuestGreeting(props) {
    return <h1>Witamy w myTRANSPORT, zaloguj się lub zarejestruj!</h1>;
  }

function Greeting(props) {
    return <GuestGreeting />;
  }

function LoginButton(props) {
    return (
      <button className="button" onClick={props.onClick}>
        Zaloguj się
      </button>
    );
  }

  function RegisterButton(props) {
    return (
      <button className="button" onClick={props.onClick}>
        Zarejestruj się
      </button>
    );
  }


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.state = {isLoggedIn: false};
      }
    
      handleLoginClick() {
        window.location = '/login'
      }

      handleRegClick(){
        window.location = '/register'
      }

      render() {
        const isLoggedIn = this.state.isLoggedIn;
        let buttonlog;
        let buttonreg;

        buttonlog = <LoginButton onClick={this.handleLoginClick} />;
        buttonreg = <RegisterButton onClick={this.handleRegClick} />;
    
        return (
          <div className='wrap'>
            <Greeting isLoggedIn={isLoggedIn} />
            {buttonlog}
            {buttonreg}
          </div>
        );
      }
}