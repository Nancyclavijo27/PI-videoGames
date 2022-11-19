import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {postGame,getAllGenres,getAllGames,} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./CreationGame.css";

  function validate(input) {
    let error = {};

    if (!input.name) {
      error.name = "Ingrese el nombre";
    } else if (input.name[0] === input.name[0].toLowerCase()) {
      error.name = "La primera letra debe estar en mayúsculas ";
    } else if (input.name.length <= 3 || input.name.length >= 10) {
      error.name = "El nombre debe contener de 3 a 10 caracteres";
    } else if (input.name.search(/^[a-zA-Z\s]*$/)) {
        error.name = "No se permiten números ni símbolos en el nombre";
    }

   if (input.description.length > 1500) {
      error.description = "La descripción es demasiado larga. (Máx. = 1500 caracteres)";
    }

   if (input.rating > 5 || input.rating < 0) {
      error.rating = "La calificación debe oscilar entre 0 y 5";
    }

   if (input.released.length < 10) {
      error.released = "   fecha de lanzamiento";
    }
    if (!input.background_image) {
      error.background_image = "Image URL is required";
    }

    if (!input.genres[0]) {
      error.genres = "Mínimo un género es requerido ";
    }

    if (!input.platforms[0]) {
      error.platforms = "Se requiere una plataforma mínima";
    }

    return error;
  }

  export default function GamesCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.allMyGenres);
    const allGames = useSelector((e) => e.games);
    const [error, setError] = useState({});
    let platformss = [
        "PC",
        "Xbox",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo",
        "PS Vita",
        "PSP",
        "Wii",
        "Game Boy",
        "Atari",
        "SEGA",
        "PS5",
        "PS4",
        "PS3",
        "PS2",
        "PS1",
      ];
  
    const [input, setInput] = useState({
      name: "",
      description: "",
      rating: "",
      released: "",
      background_image: "",
      platforms: [],
      genres: [],
      
    });
  
    useEffect(() => {
      dispatch(getAllGenres());
      dispatch(getAllGames());
    }, [dispatch]);

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input);
  }

  function handleSelectGenres(e){//logica del select
    const { value } = e.target;
  if (input.genres.includes(value))
    return alert("Ya has seleccionado ese genero")
    if (input.genres.length === 3) {
      alert("Solo se puede ingresar tres generos!");
    } else if (input.genres.length < 3) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

 function handleSelectPlatform(e){//logica del select
    const { value } = e.target;
  if (input.platforms.includes(value))
    return alert("Ya has seleccionado esa plataforma")
    if (input.platforms.length === 3) {
      alert("Solo se puede ingresar tres plataformas!");
    } else if (input.platforms.length < 3) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleDeletePlatforms(el) {
    setInput({
      ...input,
      platforms: input.platforms.filter((param) => param !== el),
    });
  }

  function handleDeleteGenres(el) {
    setInput({
      ...input,
      genres: input.genres.filter((param) => param !== el),
    });
  }
  
  
  function handleSubmit(e) {
    e.preventDefault();

    console.log(e.data);

    //let crear = {
    //  name: input.name,
     // description: input.description,
     // rating: input.rating,
     // released: input.released,
     // img: input.img,
     // platforms: input.platforms.join(", "),
     // genres: input.genres.join(", "),
     const a = allGames.filter((b) => b.name === input.name);
     if(!input.name || !input.description || !input.rating || !input.released || !input.platforms || !input.genres){
        return alert('Complete los campos vacios.')
      };
      if (a.length > 0) {
        return alert("Ya hay un juego con ese nombre, prueba otro");
      }
      

    dispatch(postGame(input));
    alert("Juego creado!!")

    setInput({
      name: "",
      description: "",
      rating: "",
      released: "",
      background_image: "",
      platforms: [],
      genres: [],
    });

    history.push("/home");
  }

  return (
    <div className="contenedorF">
      <div className="contenedor2">

        <div className="detail">
        <Link to="/home"><button className="butt" id="volver">Volver</button></Link>
        <h1 className="tittleForm">Crea un videogame!!!</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <p className="sub">* : Requerido</p>
          <div>
          <label className="labels">*Nombre:</label>
            <input key={"name"}
            className='inputs'
              type="text"
              value={input.name}
              name="name"
              onChange={handleOnChange}
              required
              placeholder="Ingresa nombre"
            />
            {error.name && (<span className="err">{error.name}</span>)}
            
          </div>

          <div>
            <label className="labels">*Released:</label>
            <input key={"released"}
             className='inputs'
              type="date"
              value={input.released}
              name="released"
              onChange={handleOnChange}
              
            />
            {error.released && (<span className="err">{error.released}</span>)}
          </div>

          <div>
            <label className="labels">Imagen/Url:</label>
            <input key={"background_image"}
             className='inputs'
              type="text"
              value={input.background_image}
              name="background_image"
              onChange={handleOnChange}
              placeholder="Ingresa Imagen"
            />
            {error.background_image &&(<span className="err">{error.background_image}</span>)}
          </div>

          <div>
            <label className="labels">*Rating:</label>
            <input key={"rating"}
             className='inputs'
              type="number"
              value={input.rating}
              name="rating"
              onChange={handleOnChange}
              required
              placeholder="Ingresa calificacion"
            />
            {error.rating && (<span className="err">{error.rating}</span>)}
          </div>
          <div>
            <label className="labels">*Genres</label>
            <select  className="select" onChange={(e) => handleSelectGenres(e)}>
              <option value="all" className="option">All</option>
              {genres?.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {error.genres && <span className="err">{error.genres}</span>}
          </div>
          <div className="subdetail">
            {input.genres?.map((e) => {
              return (
                <>
                  <div>{e}</div>
                  <button onClick={() => handleDeleteGenres(e)}>X</button>
                </>
              );
            })}{" "}
          </div>
          <div>
            <p className="labels">Platforms</p>
            <select  key="platforms2"
            className="select"
            onChange={(e) => handleSelectPlatform(e)}
          >
            {platformss
              .sort((a, b) => (a[0] > b[0] ? 1 : -1))
              .map((e) => (
                <option key={e} value={e} className="option">
                  {e}
                </option>
              ))}
            </select>
            {error.platforms && (
              <span className="err">{error.platformss}</span>
            )}
          </div>
          <div className="subdetail">
            {input.platforms?.map((e) => {
              return (
                <>
                  <div>{e}</div>
                  <button onClick={() => handleDeletePlatforms(e)}>X</button>
                </>
              );
            })}
          </div>
          <div>
            <p  className="labels">Description:</p>
            <textarea
              className='inputs'
              type="text"
              value={input.description}
              name="description"
              onChange={handleOnChange}
            />
            {error.description && (
              <span className="err">{error.description}</span>
            )}
          </div>
          {Object.keys(error).length ? (
            <div>
              <input type="submit"  className="butt" disabled name="Send" />
            </div>
          ) : (
            <div>
              <input type="submit"  className="butt" name="Send" />
            </div>
          )}
        </form>
        </div>
      </div>
        <div className="subContainer2"></div>
    </div>
  );
}
