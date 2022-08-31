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

    //export function getAllGames() {
    //     return async function(dispatch) {
    //         var json = await axios.get("http://localhost:3001/videogames");
    //         return dispatch({
    //             type: GET_ALL_GAMES,
    //             payload: json.data
    //         });
    //     }
    // }

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

 //export function getGameBySearch(name) {

  // try{
   //    return{
    //       type: 'GET_GAME_BY_SEARCH',
     //      payload: name
     //      }
     //  }catch(error){
     //      console.log(error)
     //  }
//}

export function getGameBySearch(name){ 
       // mi payload va a ser el name que me pasen por query
       return async function (dispatch){
           try {
              let det= await axios.get(`http://localhost:3001/videogames?name=${name}`)
              return dispatch({
               type: 'GET_GAME_BY_SEARCH',
               payload: det.data, 
               // aca me devuelve lo que filtre en mi back cuando cree la ruta.
               })
           } catch (error) {
               console.log(error)
               alert("No se encuentra el videogame")
           }
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

export function postGame(payload) {
  return async function () {
    const create = await axios.post("http://localhost:3001/videogames", payload);
    return create;
  };
}



export function getDetail(id){//funcion detallee
  return async function (dispatch) {
      try {
          var json = await axios.get("http://localhost:3001/videogames/" + id);
          return dispatch ({
              type: "GET_DETAIL",
              payload: json.data
          })
      }
      catch(error) {
          console.log(error)
      }
  }
}



export function clear(){
  return{
      type: 'CLEAR',
      payload : []
  }
}



export function resState() {
  return {
    type: "RES_STATE",
  };
}
