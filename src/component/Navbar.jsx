import React from 'react'
import './Navbar.css'
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Navbar() {
  return (
    <div className='navbar'>
        <nav className='nav'>
          <ul className='n'>
            <h1 className='title'>Health <span style={{color:"white"}}>Bot</span></h1>
            <div className='n'>
              <a href="#home" style={{textDecoration:"none"}}><li>Home</li></a>
              <a href="https://github.com/bala227/ai_chatbot" target='blank'><GitHubIcon style={{fontSize:35,marginTop:5,color:"white"}}/></a>
            </div>
          </ul>
        </nav>
    </div>

  )
}
