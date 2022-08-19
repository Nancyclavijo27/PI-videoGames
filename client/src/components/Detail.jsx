import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clear } from "../actions/index";
import "./Detail.css";


export default function Details(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(clear());
    };
  }, [dispatch, props.match.params.id]);

  

  const myGame = useSelector((state) => state.gameDetail);

  return (   
    
    <div> 
      <div>
      <Link to="/home"><button>Volver</button></Link>
      </div>
    {myGame.length > 0 ?//pregunto tiene algo 
    <div>
        <h1>Es:{myGame[0].name}</h1>
        <img src={myGame[0].background_image? myGame[0].background_image: myGame[0].background_image}  alt="" width="500px"height="300px"/>
        <h4>rating:{myGame[0].rating}</h4>
        <h3>Plataformas y generos:</h3>
        <p>{myGame[0].platform ? myGame[0].platform : myGame[0].platforms} | {myGame[0].genres ? myGame[0].genres : myGame[0].Genres.map(e=> e.name).join(', ')} </p>
        <p>released:{myGame[0].released}</p>
        <h3>description</h3>
        <div ><p>{myGame[0].description}</p></div>
     </div>:<p>Loading...</p>
   
    }
    </div>
    )
    }