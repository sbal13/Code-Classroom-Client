import React from 'react'

function Login(props){
  return (
    <div>
      <form>
        <input placeholder="Username"/>
        <input placeholder="Password"/>
        <input type="submit" value="submit"/>
      </form>
    </div>
  )
}

export default Login