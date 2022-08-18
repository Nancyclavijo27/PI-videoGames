import axios from 'axios';

export function getAllGames() {
    return function (dispatch) {
      axios
        .get("http://localhost:3001/videogames")
        .then((res) => {
          return dispatch({
            type: "GET_ALL_GAMES",
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    };
  }

  export function getAllGenres() {
   return function (dispatch) {
     axios
       .get("http://localhost:3001/genres")
       .then((res) => {
         return dispatch({
           type: "GET_ALL_GENRES",
           payload: res.data,
         });
       })
       .catch((err) => console.log(err));
   };
 }

 export function getGameBySearch(name) {

   try{
       return{
           type: 'GET_GAME_BY_SEARCH',
           payload: name
           }
       }catch(error){
           console.log(error)
       }
}

  export function filterByGenre(payload) {//filtro generos
   return {
       type: 'FILTER_BY_GENRE',
       payload: payload
   }
}

export function filterCreated(payload) {
   return {
       type: 'FILTER_CREATED',
       payload
   }
}

export function orderByRating(payload) {
   return {
       type: 'ORDER_BY_RATING',
       payload
   }
}

export function orderByName(payload) {
   return {
       type: 'ORDER_BY_NAME',
       payload
   }
}

export function postGame(payload){//funcion  post DB
  return async function(dispatch){
      const response=await axios.post("http://localhost:3001/videogame", payload)
      console.log(response)
      return response
  }
}


//export function getAllPlatforms(){
  //return async function(dispatch){
  //    const json = await axios.get('/platforms')
  //    const platformss = json.data
  //    return dispatch({
  //        type: 'GET_ALL_PLATFORMS',
   //       payload: platformss        
   //   })
 // }
//}

export function resState() {
  return {
    type: "RES_STATE",
  };
}
