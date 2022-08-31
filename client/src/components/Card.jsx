import React from 'react'
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, genres, name, background_image, rating }) {
 
  return (
    <div className='cardContainer'  key={id}>
      <div>
        <div>
          <img
            src={background_image}
            alt={name}
            height="150px"
            width="150px"
          />
        </div>
        <h3>{name}</h3>
        <p>{rating}</p>
        <p>
          Genres:{" "}
          {Array.isArray(genres) ? genres.map((e) => e.name + " ") : genres}
        </p>
      </div>
      <Link className="por" to={`/home/${id}`}>  </Link>
       
    </div>
  );
}