import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'



const TitleCards = ({title,category}) => {

  const [apiData,setApiData]=useState([]);
  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGQ0Yjk3OTQ3MTU3NzVmYjhmY2M3ZWEzZDRmMzI4YiIsInN1YiI6IjY2NGY4YTJhZGQ3ZjU4ZjY1OTk1NDVjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QGCenQatDpv79TMfAYtrRvH-jNQjbi579Nd7jHbW3Wk'
    }
  };
  
  
const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft+=event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel', handleWheel);
},[])
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards