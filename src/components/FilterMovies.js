import React from 'react';
import './FilterMovies.css'
import { ReactComponent as TrendingSvg } from '../assets/images/svgs/trending.svg';
import { ReactComponent as StarSvg } from '../assets/images/svgs/star.svg';
import { ReactComponent as PlaySvg } from '../assets/images/svgs/play.svg';


function FilterMovies({ showMoviesOnBtn }) {
  return (
    <div className='navlink-container'>
      <button onClick={showMoviesOnBtn} className='popular' id='filter-btn'>
        <TrendingSvg className='popular' alt='popular'/>
        Popular
      </button>
      <button onClick={showMoviesOnBtn} className='top_rated' id='filter-btn'>
        <StarSvg className='top_rated' alt='top rated'/>
        Top <br />
        Rated
      </button>
      <button onClick={showMoviesOnBtn} className='now_playing' id='filter-btn'>
        <PlaySvg className='now_playing' alt='now playing'/>
        Now <br />
        Playing
      </button>
    </div>
  );
}

export default FilterMovies;
