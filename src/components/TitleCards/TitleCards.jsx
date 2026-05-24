import React, {  useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useState } from 'react'



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2I0MGI1NTIyMmQ5ZGI3ZDA2OGU2NTQ3Mzk3MWQ2NyIsIm5iZiI6MTc3OTU4NTEwNy4yMDUsInN1YiI6IjZhMTI1MDUzMTAyNzcwZTc3ZGI5OTM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ntGPED3tE8Lc99YN30GpWvSky3ZeLsQNZoMWcXuPf8I'
  }
};



  const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaX;
}

useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel', handleWheel);
}, [])
  
return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
         return <div className='card' key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
         </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards


