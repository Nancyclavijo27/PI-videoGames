import React from "react";
import {Link} from "react-router-dom"



//pagina inicial,  boton para ingresar

export default function LandinPage(){ //componente de funcion 
    return (
        
        <div className="container_text">
            <h1 className="title ">Bienvenidos a videogames</h1>
            <h2 className="title">!A conocer los mejores juegos¡ </h2>
            <img src="https://www.lainformacion.com/files/article_main/uploads/2017/09/14/59b9f8891f1ad.jpeg" alt="" width="600px"height="450px"border="5px"/>
            <h2 className="title">Busca, conoce  y  encuentra </h2>
            <Link to ="/home">
                <button className="button">Hacer clic</button>
            </Link>
           
        </div>
        
        
    )
}