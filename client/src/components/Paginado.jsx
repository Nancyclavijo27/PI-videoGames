import React from 'react'
import "./Paginado.css";

export default function Paginado({gamesPerPage, allVideoGames, currentPage, paginado}) {
  const pageNumber = [];
  
   for(let i=0; i<=Math.ceil(allVideoGames/gamesPerPage); i++){
    pageNumber.push(i+1)
   }

   pageNumber.pop()

   return(
      <nav className='paginated'>
        <ul className='ul'>
        <button className={ currentPage === 1 ? "disabled" : "enabled" } disabled={currentPage === 1 ? true : false} onClick={() => paginado(currentPage - 1)}>
                Prev
            </button>
          {pageNumber && 
          pageNumber.map((number) =>{
            return(
            <li key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </li>)
          })}
           <button className={ currentPage === pageNumber.length ? "disabled" : "enabled" } disabled={currentPage === pageNumber.length ? true : false} onClick={() => paginado(currentPage + 1)}>
                Next
            </button>
        </ul>
      </nav>
   )
}