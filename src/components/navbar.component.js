import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom'


function Bar(props) {
  const isMain = props.isMain;
  const ID = props.ID;

  console.log(props)
  if (isMain) {
    return (<div>
    </div>);
  }

  function handleClick() {
    window.location = '/'
  }

  return (
    <header>
    <b className="logo">myTRANSPORT</b>
    <div className="buttons">
      <button className="button">Giełda</button>
      <button className="button" onClick={handleClick}>Wyolguj</button>
    </div>
  </header>
  );
}


export default class Navbar extends Component {

  constructor(props){
    super(props)
    this.state = {isMain: false, ID: props.ID}
  }

  render() {

    const isMain = this.state.isMain;
    const ID = this.state.ID
    return (
      <Bar isMain={isMain} ID={ID}/>
    );
  }
}