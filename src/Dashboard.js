import React from 'react'

import RoomList from './RoomList'

import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { joinCohort, createCohort } from './redux/actions'

class Dashboard extends React.Component {

  state = {
    cohorts: [],
    chosenCohortId: null,
    displayedCohort: null,
    newCohortName: ""
  }

  componentDidMount(){
    fetch("http://localhost:4000/api/v1/cohorts")
    .then(res => res.json())
    .then(response => {
      this.setState({
        cohorts: response,
        chosenCohortId: response[0].id
      })
    })
  }

  generateCohortOptions(){
    return this.state.cohorts.map(cohort => {
      return <option key={cohort.id} value={cohort.id}>{cohort.name}</option>
    })
  }

  selectCohort = (e) => {
    this.setState({
      chosenCohortId: e.target.value
    })
  }

  renderCohortList(){
    return this.props.currentUser.cohorts.map(cohort => {
      return <li onClick={() => this.changeDisplayedCohort(cohort.id)}key={cohort.id}>{cohort.name}</li>
    })
  }

  addCohort = () => {
    this.props.joinCohort(this.state.chosenCohortId)
    .then((cohort) => {
      if (cohort){
        this.setState({displayedCohort: cohort.id})
      }
    })
  }

  changeDisplayedCohort = (id) =>{
    this.setState({
      displayedCohort: id
    })
  }

  changeCohortName = (e) => {
    this.setState({
      newCohortName: e.target.value
    })
  }

  createCohort = (e) => {
    e.preventDefault()

    this.props.createCohort(this.state.newCohortName)
    .then((cohort) => {
      if (cohort){
        this.setState({
          newCohortName: "",
          displayedCohort: cohort.id,
          cohorts: [...this.state.cohorts, cohort]
        })
      }
    })
  }



  render(){
    if (!localStorage.token){
      return <Redirect to="/login"/>
    }

    if (!this.props.currentUser){
      return <div>Loading...</div>
    }

    return(
      <div className="dashboard">
        <div>
          <div>
            <ul>
              {this.renderCohortList()}
            </ul>
          </div>

          <select onChange={this.selectCohort}> value={this.state.chosenCohortId}
            {this.generateCohortOptions()}
          }
          </select>
          <button onClick={this.addCohort}>Add cohort</button>
          <form onSubmit={this.createCohort}>
            <input placeholder="Add new cohort..." value={this.state.newCohortName} onChange={this.changeCohortName}/>
            <input type="submit" value="Create cohort"/>
          </form>

        </div>
        <div>
          <RoomList displayedCohort={this.state.displayedCohort}/>
        </div>
      </div>
    )
  }
  
}

function msp(state){
  return {currentUser: state.currentUser}
}

export default connect(msp, { joinCohort, createCohort })(Dashboard)