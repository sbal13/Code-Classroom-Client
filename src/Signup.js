import React from 'react'

import { signup } from './redux/actions'
import { connect } from 'react-redux'


class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.passwordConfirmation) {
      this.props.signup(this.state.username, this.state.password, this.props.history)
    } else {
      alert("Mismatch!")
    }
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} name="username" placeholder="username"/>
          <input onChange={this.handleChange} value={this.state.password} type="password" name="password" placeholder="password"/>
          <input onChange={this.handleChange} value={this.state.passwordConfirmation} type="password" name="passwordConfirmation" placeholder="password Confirmation"/>
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default connect(null, { signup })(Signup)