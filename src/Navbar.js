import React, { Fragment } from 'react'

import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from './redux/actions'

function Navbar(props){

  const clickLogout = () =>{  
    props.logout()
    props.history.push("/login")
  }
  return(
    <div>
      {
        props.currentUser ?
          <Fragment>
            <NavLink to="/dashboard">Home</NavLink>
            <button onClick={clickLogout}>Log Out</button>
          </Fragment>
        :
          <Fragment>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </Fragment>
      }
    </div>
  )
}

function msp(state){
  return { currentUser: state.currentUser}
}

export default connect(msp, { logout })(Navbar)