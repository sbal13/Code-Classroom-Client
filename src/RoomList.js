import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createRoom } from './redux/actions'

class RoomList extends React.Component {

  state = {
    name: "",
    language: "ruby"
  }

  renderList(){
    const { currentUser, displayedCohort } = this.props

    let foundCohort;

    if(!displayedCohort){
      foundCohort = currentUser.cohorts[0]

      if(!foundCohort){
        return <div>Add a cohort!</div>
      }

    } else {
      foundCohort = currentUser.cohorts.find(cohort => cohort.id === displayedCohort)
    }
    

    if (!foundCohort.rooms.length){
      return <div>This cohort doesn't have any rooms!</div>
    }

    return foundCohort.rooms.map(room => {
      return <Link to={`/rooms/${room.id}`} key={room.id}>{room.name}</Link>
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    console.log(this.props)
    // this.props.createRoom(this.state.name, this.props.displayedCohort, this.state.language)
  }

  renderLanguageOptions = () => {
    const languages = [
      "ruby",
      "javascript"
    ]

    return languages.map(lang => <option key={lang} value={lang}>{lang}</option>)
  }
  

  render(){
    return (
      <div>
        {this.renderList()}
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.name} name="name" onChange={this.handleChange}/>
          <select value={this.state.language} name="language" onChange={this.handleChange}>
            {this.renderLanguageOptions()}
          </select>
          <input type="submit" value="Create Room"/>
        </form>
      </div>
    )
  }
    
}

function msp(state){
  return state
}

export default connect(msp, { createRoom })(RoomList)