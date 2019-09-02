const defaultState = {
  currentUser: null,
  roomUsers: [],
  currentRoom: null
}

function reducer(state=defaultState, action){
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}    
    case "SET_ROOM":
      return {...state, currentRoom: action.payload}
    default:
      return state
  }
}

export default reducer