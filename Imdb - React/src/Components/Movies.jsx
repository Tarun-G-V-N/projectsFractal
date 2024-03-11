import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Oval } from "react-loader-spinner";
import Pagination from './Pagination';

function Movies() {

  let [movies, setMovies] = useState([]);

  let [pageNum, setPage] = useState(1);

  let [hovered, setHovered] = useState("");

  let [favourites, setFavourite] = useState([]);

  const onPrev = () => {
    if(pageNum > 1) setPage(pageNum - 1);
  }

  const onNext = () => {
    setPage(pageNum + 1);
  }

  const showEmoji = (movieId) => {
    setHovered(movieId);
  }

  const hideEmoji = (movieId) => {
    setHovered("");
  }

  const addToFavourites = (movieId) => {
    const newFavs = [...favourites, movieId];
    setFavourite(newFavs);
  }

  const removeFromFavourites = (movieId) => {
    const filteredFavs = favourites.filter(element => { return element != movieId; })
    setFavourite(filteredFavs);
  }

  useEffect(function() {
    (function() {
      axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US&page="+pageNum, {
        headers: {
          Accept:'application/json',
          Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzhiYzIwMzlmNDZjYzdhMjM1NThkZDUzZTE2NjMxYiIsInN1YiI6IjY1ZWE2OTZmNmEyMjI3MDE2Mzk1ZjJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hyGgSRrhMLFjjdHPjZka5YXDdQCQq_1lEx41r4dFOws'
        },
      }).then((res) => {
        //console.log(res.data.results);
        setMovies(res.data.results); })
    })()
  }, [pageNum])

  return (
    <div className='mt-8'>
        <div className='mb-8 font-bold text-2xl text-center'>Trending Movies</div>
        <div className='flex flex-wrap justify-center'>
          {
            movies.length == 0 ? <Oval
            height="80"
            width="80"
            radius="9"
            color="gray"
            secondaryColor='gray'
            ariaLabel="loading"
  
        /> : movies.map((movie) => {
              console.log(movie);
              return <div 
              onMouseOver={ () => { showEmoji(movie.id) } }
              onMouseLeave={ () => { hideEmoji(movie.id) } }
              key={movie.id} className={`bg-center bg-cover
              w-[180px] h-[30vh] md:h-[40vh] md:w-[200px] m-4 rounded-xl hover:scale-110 duration:300 flex items-end relative`} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`}}>
                <div className='p-1 bg-gray-800 absolute top-2 right-2 rounded-xl' style={{ display:hovered==movie.id?'block':'none' }}>
                  
                  {
                    favourites.includes(movie.id)==false ? <div className='text-xl cursor-pointer' onClick={() => {addToFavourites(movie.id)}}> ❤️ </div> : <div className='cursor-pointer' onClick={() => {removeFromFavourites(movie.id)}}> ❌ </div>
                  }
                </div>
                <div className='text-white text-center font-bold p-2 bg-gray-900 bg-opacity-50 w-full rounded-b-xl'>{movie.title}</div>
              </div>
            })
          }
           
        </div>
        <Pagination onPrev={onPrev}
        pageNum = {pageNum}
        onNext={onNext}>
        </Pagination>
    </div>
  )
}

export default Movies