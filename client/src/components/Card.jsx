import React from "react";
//import { Link } from "react-router-dom";
import "./Card.css";


export default function CardGame({ name, background_image, genres, id, rating }) {

  return (
    
    <div className="card"  key={id}>
      <div className="contenedor">
      <div className="face front">
        <img
          src={background_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZYqH2kKcngIzKCzsyH_aVIs39vxfzkeJwJg&usqp=CAU"}
          alt={name}
        />
        <h3 className="card-title">{name}</h3>
        <div>  
        Genres:{" "}
          {Array.isArray(genres) ? genres.map((e) => e.name + " ") : genres}
        </div>
      </div>
      <div className="face back">
        <h3 className="card-title">{name}</h3>  
        <p>N° id: {id}</p>
        <p>Rating: {rating}</p>
        <div className="link">
            <a href={`/videogames/${id}`}>Ver mas detalle</a>
        </div>
      </div>
      </div>
    </div>
  
  );
}