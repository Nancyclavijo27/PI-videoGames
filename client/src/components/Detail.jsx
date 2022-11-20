import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resState } from "../actions";
import Loader from "./Loader";

import "./Detail.css";


export default function Detail() {
  const { id } = useParams();
  const gameDetail1 = useSelector((state) => state.gameDetail);
  const dispatch = useDispatch();
  console.log(gameDetail1);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(resState());
    };
  }, [dispatch, id]);

  if (Object.keys(gameDetail1).length === 0) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-10rem",
          marginLeft: "3rem",
        }}
      >
       <Loader /> 
      </div>
    );
  } else {
    return (
      <div className="contDetail">
        {gameDetail1.length > 0 ? ( 
        <>
        <div className="d">
          <Link to="/home">
            <button className="buttD" onClick={resState}>
              Volver
            </button>
          </Link>
          <h1 className="tittleDetail">{gameDetail1[0].name}</h1>
          <img
            className="imgD"
            src={gameDetail1[0].background_image }
            alt={gameDetail1[0].name}
            width="700px"
            height="350px"
          />
            <h4 className="subtit">Genres:</h4>
            <p className="subdetailD">
              {Array.isArray(gameDetail1[0].genres)
                ? gameDetail1[0].genres.map((e) => e.name + " ")
                : gameDetail1[0].genres}
            </p>
            <h4 className="subtit">Rating:</h4>
            <p className="subdetailD">{gameDetail1[0].rating}</p>
            <h4 className="subtit">Released:</h4>
            <p className="subdetailD">{gameDetail1[0].released}</p>
            <h4 className="subtit">Platforms:</h4>
            <p className="subdetailD">{gameDetail1[0].platform ? gameDetail1[0].platform : gameDetail1[0].platforms} </p>
            <h4 className="subtit">Description:</h4>
            <p className="subdetailD">{gameDetail1[0].description}</p>
          </div>
        </>
      ) : <Loader/>} 
        </div>
        
    );
   
  }
}