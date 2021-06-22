import React from 'react'
import './App.css';
import { Route, Switch } from "react-router-dom";
import Layout from './components/Layout';
import Home from './containers/Home/index'
import Signin from './containers/Signin';
import Signup from './containers/Signup';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/signup" component={Signup}/>
      </Switch>
    </div>
  );
}

export default App;
