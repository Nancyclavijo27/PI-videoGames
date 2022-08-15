import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllGames} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import "./Home.css";
//import NavBar from "./NavBar";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  //const [orden, setOrden] = useState("");
 const [currentPage, setCurrentPage] = useState(1); //pagina actual
 const [gamesPerPage, setGamesPerPage] = useState(15);//videos por pagina
 const indexOfLastGame = currentPage * gamesPerPage; //15 
 const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
 const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

 const paginado = (pageNumber) => {
   setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  // recetea lo que se despacha funcion preventiva
function handleClick(e){
  e.preventDefault();
  dispatch(getAllGames());//despacho la accion
 }



  return (
    <div>
      <Link   to="/game">Añadir nueva raza</Link>
 <h1>Busca y conoce a tu mejor amigo</h1>
 <button  className="btn" onClick={e=>{handleClick(e)}}>
    volver a cargar todas las razas de perros
 </button>
    <div>
    <select >
          <option value="All">Todos </option>
          <option value="min">Peso Min</option>
          <option value="max">Peso Max</option>
        </select>
    
    <select>
        <option value= "All">Todos</option>  
        <option value= "asc">De la A-Z</option>
        <option value= "desc">De la Z-A</option>                                   
    </select>
   
    <select>
        <option value= "All">Todos</option>
        <option value= "created">Creados</option>
        <option value= "api">De la api</option>
    </select>
    <select>
         <option  value= "All">Temperamentos</option>
            
    </select>
    <div>
        <Paginado 
          gamesPerPage={gamesPerPage}
          allVideoGames={allGames.length}
          paginado={paginado}
        />
      </div>
     
      <div className="card-dogs">
        {currentGames?.map((e) => {
            return (
              <Fragment>
              <Link  to={`/home/${e.id}`}>
                <Card
                  name={e.name}
                  background_image={e.background_image}
                  rating={e.rating}
                  key={e.id}
                  genres={e.genres}
                />
              </Link>
              </Fragment>
            
            )
        })} 
      </div>
    </div>
  
    </div>
  );
}

