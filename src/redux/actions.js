function setUser(user){
  return {type: "SET_USER", payload: user}
}

function logout(){
  localStorage.removeItem("token")
  return setUser(null)
}

function autoLogin(){
  return function(dispatch){
    fetch("http://localhost:4000/api/v1/auto_login", {
      headers: {
        "Authorization": localStorage.token
      }
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        console.log(response)
        dispatch(setUser(response))
      }
    })
  }
}

function setRoom(roomId){
  return function(dispatch){
    return fetch(`http://localhost:4000/api/v1/rooms/${roomId}`)
    .then(res => res.json())
    .then(response => {
      dispatch({type: "SET_ROOM", payload: response})

      return response
    })
  }
}

function login(username, password, history){
  return function(dispatch){
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        console.log(response)
        localStorage.token = response.token
        dispatch(setUser(response.user))
        history.push('/rooms/1')
      }
    })
  }
}

function signup(username, password, history){
  return function(dispatch){
    fetch("http://localhost:4000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        localStorage.token = response.token
        dispatch(setUser(response.user))
        history.push('/rooms/1')
      }
    })
  }
}

export {
  setUser,
  login,
  signup,
  logout,
  autoLogin,
  setRoom
}