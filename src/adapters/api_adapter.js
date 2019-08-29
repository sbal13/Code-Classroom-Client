class ApiAdapter {

  constructor(){
    this.base = "http://localhost:3000/api/v1"
  }

  generatePostHeaders(authorized){
    const headers = {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    }
    
    if(authorized)
      headers.Authorization = localStorage.token

    return headers
  }


}