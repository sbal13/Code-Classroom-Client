import React from 'react'

import { login } from './redux/actions'
import { connect } from 'react-redux'

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password, this.props.history)
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} name="username" placeholder="username"/>
          <input onChange={this.handleChange} value={this.state.password} name="password" placeholder="password"/>
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default connect(null, { login })(Login)