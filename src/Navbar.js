import React, { Fragment } from 'react'

import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from './redux/actions'

function Navbar(props){
  console.log(props)
  return(
    <div>
      {
        props.currentUser ?
          <button onClick={props.logout}>Log Out</button>
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