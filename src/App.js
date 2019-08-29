import React from 'react';
import './App.css';
import Room from './Room'
import Signup from './Signup'
import Login from './Login'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/room/:id" component={Room}/>
      </Switch>
    </div>
  );
}

export default App;
