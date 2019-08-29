import React from 'react'

function Signup(props){
  return (
    <div>
      <form>
        <input placeholder="Username"/>
        <input placeholder="Password"/>
        <input placeholder="Password Confirmation"/>
        <input type="submit" value="submit"/>
      </form>
    </div>
  )
}

export default Signup