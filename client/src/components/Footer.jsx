import React from 'react'
import {AiFillLinkedin, AiFillGithub} from 'react-icons/ai'
import {RiContactsLine} from 'react-icons/ri'

import  './Footer.css'

const Footer = () => {
  return (
    <footer className="container">
        <div className="hijo">
            <a href="https://www.linkedin.com/in/nancy-clavijo-varela-29353117a/?locale=es_ES" target="_blank">
              <AiFillLinkedin/>  
            </a>
            <a href="https://github.com/Nancyclavijo27" target="_blank">
            <AiFillGithub/>
            </a>
            <a href="https://personal-portafolio-delta.vercel.app/" target="_blank">
            <RiContactsLine/>
            </a>
            </div>
            <div>
                <p>Nancy Clavijo | Full Stack Developer</p>
            </div>
    </footer>
  )
}

export default Footer