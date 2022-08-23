import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllGames, filterByGenre,  getAllGenres,  filterCreated, orderByRating, orderByName} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  const myGenres = useSelector((state) => state.allMyGenres);
  const [orden, setOrden] = useState("");
 const [currentPage, setCurrentPage] = useState(1); //pagina actual
 const [gamesPerPage, setGamesPerPage] = useState(15);//videos por pagina
 const indexOfLastGame = currentPage * gamesPerPage; //15 
 const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
 const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

 const paginado = (pageNumber) => {
   setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllGames())
    dispatch(getAllGenres());
  }, [dispatch]);

  function handleFilterByGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    
  }

  // recetea lo que se despacha funcion preventiva
function handleClick(e){
  e.preventDefault();
  dispatch(getAllGames());//despacho la accion
 }

 function handleOrderByRating(e) {
  e.preventDefault();
  e.target.value === "all"
    ? dispatch(getAllGames) && setOrden(`Rating ${e.target.value}`)
    : dispatch(orderByRating(e.target.value));
  setOrden(`Rating ${e.target.value}`);
  setCurrentPage(1);
}

function handleOrderByName(e) {
  e.preventDefault();
  e.target.value === "all"
    ? dispatch(orderByName) && setOrden(`ABC ${e.target.value}`)
    : dispatch(orderByName(e.target.value));
  setOrden(`ABC ${e.target.value}`);
  setCurrentPage(1);
}

  return (
    <div>
      <Link className="link"  to="/game">Añadir un nuevo juego</Link>
 <h1>Busca y conoce a tu mejor amigo</h1>
 <button  className="btn" onClick={e=>{handleClick(e)}}>
    volver a cargar todas las razas de perros
 </button>
    <div>
    <select className="selec" onChange={(e) => handleOrderByRating(e)}>
            <option value="all">Todos Rating</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
    </select>
    
    <select className="selec" onChange={(e) => handleOrderByName(e)}>
          <option value="all">Todos ABC</option>
          <option value="asc"> de la A-Z</option>
          <option value="desc"> de la Z-A</option>
    </select>
   
    <select className="selec" onChange={(e) => handleFilterCreated(e)}>
          <option value="all">Todos origen</option>
          <option value="lb">Api</option>
          <option value="db">Creados</option>
    </select>

    <select className="selec" onChange={(e) => handleFilterByGenre(e)}>
          <option  value="all">Genres</option>
          {myGenres?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            );
          })}
     </select>
    <div>
        <Paginado 
          gamesPerPage={gamesPerPage}
          allVideoGames={allGames.length}
          paginado={paginado}
        />
      </div>
       <SearchBar/>
      <div className="card-dogs">
        {currentGames?.map((e) => {
            return (
              <Fragment>
              <Link  to={`/home/${e.id}`} key={e.id}>
                <Card
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  background_image={e.background_image}
                  rating={e.rating}
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

