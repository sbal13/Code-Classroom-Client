const defaultState = {
  currentUser: {username: "Red Kangaroo"},
  roomUsers: [],
  currentRoom: {code: "function sayHello(){\n  console.log('Hey!')\n}"}
}

function reducer(state=defaultState, action){
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    default:
      return state
  }
}

export default reducer