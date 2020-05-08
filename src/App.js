import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WorkersList from "./components/workers-list.component";
import EditWorker from "./components/edit-worker.component";
import AddWorker from "./components/add-worker.component";
import CarsList from "./components/cars-list.component";
import AddCar from "./components/add-car.component";
import EditCar from "./components/edit-car.component";
import ManageCar from "./components/manage-car.component";
import Navbar from "./components/navbar.component";
import Index from "./components/index.component"
import Login from "./components/login.component"
import Register from "./components/register.component"

function Comp() {
  return(
  <Router>
    <Navbar ID={'1'} />
    
    <div className="wrap" >
    <Route path="/workers" component={WorkersList} />
    <Route path="/worker/edit/:id" component={EditWorker} />
    <Route path="/worker/add" component={AddWorker} />
    <Route path="/cars" component={CarsList} />
    <Route path="/car/add" component={AddCar} />
    <Route path="/car/edit/:id" component={EditCar} />
    <Route path="/car/manage/:id" component={ManageCar} />
    </div>

  </Router>
  );
}
/*
      <Switch>
        <Route path="/" exact component={Index}/>
        <Route path="/login" component={Login}
        <Route path="/workers" component={Comp} />
      </Switch>
*/

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Comp />
        </Switch>

        <ToastContainer/>

    </Router>
    
  );
}

export default App;
