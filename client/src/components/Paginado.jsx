import React from 'react'
import "./Paginado.css";

export default function Paginado({gamesPerPage, allVideoGames, paginado}) {
  const pageNumber = [];
  
   for(let i=0; i<=Math.ceil(allVideoGames/gamesPerPage); i++){
    pageNumber.push(i+1)
   }

   pageNumber.pop()

   return(
      <nav className='paginated'>
        <ul className='ul'>
          {pageNumber && 
          pageNumber.map((number) =>{
            return(
            <li key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </li>)
          })}
        </ul>
      </nav>
   )
}