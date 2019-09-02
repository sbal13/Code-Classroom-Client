import React from 'react'
import AceEditor from "react-ace";
import brace from "brace";

import "brace/mode/javascript";
import "brace/theme/github";

import { ActionCableConsumer } from 'react-actioncable-provider'

import { setRoom } from './redux/actions'
import { connect } from 'react-redux'

class Room extends React.Component {

  state = {
    leftSide: {},
    rightSide: "",
    username: "",
  }

  onChange = (newValue) => {
    this.setState({
      rightSide: newValue
    })
  }

  componentDidMount(){
    this.props.setRoom(this.props.match.params.id)
    .then(room => {
      const leftSide = {}
      room.submissions.forEach(sub => {
        leftSide[sub.user.username] = sub.code
      })

      this.setState({ leftSide })
    })
  }

  inputUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  submit = () => {
    fetch("http://localhost:4000/api/v1/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        "Authorization": localStorage.token
      },
      body: JSON.stringify({
        room_id: this.props.match.params.id,
        code: this.state.rightSide
      })
    })   
  }

  remove = () => {
    fetch("http://localhost:4000/api/v1/submissions/g", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        room_id: this.props.match.params.id,
      })
    })
  }

  generateLeftSide = () => {
    let leftSideArray = [this.props.currentRoom.code]

    for(let user in this.state.leftSide){
      leftSideArray.push(`//from ${user}\n${this.state.leftSide[user]}`)
    }

    return leftSideArray.join("\n\n")
  }

  render(){
    const { rightSide } = this.state

    if (!this.props.currentRoom){
      return <div>Loading...</div>
    }
    
    return (
      <React.Fragment>
        <ActionCableConsumer
          channel={{ channel: "RoomsChannel", room_id: this.props.match.params.id }}
          onReceived={data => {

            switch(data.type){
              case "SUBMISSION_CREATED":
                this.setState({
                  leftSide: {
                    ...this.state.leftSide, 
                    [data.payload.user.username]: data.payload.code}
                })  
                break;
              case "SUBMISSION_DELETED":
                let copy = {...this.state.leftSide}
                delete copy[data.payload]

                this.setState({leftSide: copy})
                break;    
              default:
                return
            }        
          }}
        />
        <div className="room">
          
          <AceEditor
            mode="javascript"
            theme="github"
            value={this.generateLeftSide()}
            readOnly={true}
            editorProps={{ $blockScrolling: true }}
          />
          <AceEditor
            mode="javascript"
            theme="github"
            onChange={this.onChange}
            value={rightSide}
            editorProps={{ $blockScrolling: true }}
          />
          <div>
            <button onClick={this.submit}>Submit</button>
            <button onClick={this.remove}>Remove Submission</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function msp(state){
  console.log(state)
  return state
}

export default connect(msp, { setRoom })(Room)