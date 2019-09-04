import React from 'react';
import './App.css';
import Room from './Room'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Signup from './Signup'
import Login from './Login'
import { Switch, Route } from 'react-router-dom'
import { autoLogin } from './redux/actions'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount(){
    if (localStorage.token){
      this.props.autoLogin()
    }
  }

  render(){
    return (
      <div>
        <Route path="/" component={Navbar}/>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

export default connect(null, { autoLogin })(App);
