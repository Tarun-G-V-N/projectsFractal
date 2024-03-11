import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Oval } from "react-loader-spinner";

function Banner() {

  let [bannerMovie, setBanner] = useState("");

  useEffect(function() {
    (function() {
      axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US", {
        headers: {
          Accept:'application/json',
          Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzhiYzIwMzlmNDZjYzdhMjM1NThkZDUzZTE2NjMxYiIsInN1YiI6IjY1ZWE2OTZmNmEyMjI3MDE2Mzk1ZjJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hyGgSRrhMLFjjdHPjZka5YXDdQCQq_1lEx41r4dFOws'
        },
      }).then((res) => {
        console.log(res.data.results);
        setBanner(res.data.results[0]); })
    })()
  }, [])

  return ( 
    <>
    {
      bannerMovie == "" ? <div className="
      flex justify-center"><Oval
          height="80"
          width="80"
          radius="9"
          color="gray"
          secondaryColor='gray'
          ariaLabel="loading"

      /></div> : <div className={`h-[90vh] md:h-[85vh] bg-center bg-cover flex items-end`} 
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path})`}}>

      <div className='text-xl text-white text-center md:text-3xl p-4 bg-gray-900 bg-opacity-50 w-full'>{bannerMovie.title}</div>
      </div>
    }
    </>
    
  )
}

export default Banner