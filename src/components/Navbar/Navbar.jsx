import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/searchIcon.svg'
import bell from '../../assets/bell.svg'
import profile from '../../assets/profile.png'
import dropdown from '../../assets/dropdown.svg'
import { logout } from '../../firebase'

const Navbar = () => {

  const navRef= useRef();

  useEffect(()=>{
    window/addEventListener('scroll',()=>{
      if(window.scrollY>= 80){
        navRef.current.classList.add('nav-dark')
      }
      else{
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Netflix Icon"/>
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="" className='icons'/>
        <p>Children</p>
        <img src={bell} alt="" className='icons'/>
        <div className="navbar-profile">
          <img src={profile} alt="" className='profile'/>
          <img src={dropdown} alt=""/>

          <div className="dropdown">
            <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar