import React from 'react'
import { Link} from 'react-router-dom'
import SearchBar from './SearchBar'

export default function NavBar({setCurrentPage}) {


  return (
    <div>
      <div>
      <div ><img   src="https://i.ibb.co/XSSGN8m/Pngtree-gray-toy-game-console-3775147.png" alt="" /></div>
        <div>
            <Link to='/home' onClick={() => setCurrentPage(1)}>
            <span >HOME</span>
            </Link>
            <Link to='/createGame'>
            <span>CREATE</span>
            </Link>
            <Link to='/about'>
            <span>ABOUT</span>
            </Link>
        </div>
      </div>
        <div><SearchBar setCurrentPage={setCurrentPage}/></div>  
    </div>
  )
}