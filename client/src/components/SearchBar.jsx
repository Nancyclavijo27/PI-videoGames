import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getGameBySearch } from "../actions";
import "./SearchBar.css";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName]=useState("")//para crear un estadol local, inicialmente en un string vacio

    function handleInputChange(e){ //esta funcion guarda en el estado local lo que llega en el input
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getGameBySearch(name))//este es mi estado local
        
    }

    //logica del renderizado
    return(
        <div>
            <input
            type="text"
            placeholder="Buscar..."
          
            onChange={(e)=>handleInputChange(e)}
            />
            <button  type="submit"onClick={(e)=>handleSubmit(e)}>Buscar</button>
        </div>
    )



}

