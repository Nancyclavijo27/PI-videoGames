import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resState } from "../actions";

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
        
      </div>
    );
  } else {
    return (
      <div className="paginado2">
        <div>
          <Link to="/home">
            <button className="botonDetails" onClick={resState}>
              Home
            </button>
          </Link>
        </div>
        <div>
          <img
            className="imagdetalle"
            src={gameDetail1[0].background_image }
            alt={gameDetail1[0].name}
            width="450px"
            height="450px"
          />
        </div>

        <div className="cardDetalle">
          <div>
            <h1>{gameDetail1[0].name}</h1>
          </div>
          <div className="base3">
            <h4>Genres:</h4>
            <p>
              {Array.isArray(gameDetail1[0].genres)
                ? gameDetail1[0].genres.map((e) => e.name + " ")
                : gameDetail1[0].genres}
            </p>
          </div>
          <div className="base3">
            <h4>Rating:</h4>
            <p>{gameDetail1[0].rating}</p>
          </div>
          <div className="base3">
            <h4>Released:</h4>
            <p>{gameDetail1[0].released}</p>
          </div>
          <div className="base3">
            <h4>Platforms:</h4>
            <p>{gameDetail1[0].platform ? gameDetail1[0].platform : gameDetail1[0].platforms} </p>
             
          </div>
          <div className="base">
            <h4>Description:</h4>
            <p>{gameDetail1[0].description}</p>
          </div>
        </div>
      </div>
    );
  }
}