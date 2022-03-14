import React from 'react';
import './FilterMovies.css'
import { ReactComponent as TrendingSvg } from '../assets/images/svgs/trending.svg';
import { ReactComponent as StarSvg } from '../assets/images/svgs/star.svg';
import { ReactComponent as PlaySvg } from '../assets/images/svgs/play.svg';


function FilterMovies({ showMoviesOnBtn }) {
  return (
    <div className='navlink-container'>
      <button  onClick={e => showMoviesOnBtn('popular')} className='filter-btn' id='popular'>
        <TrendingSvg className='popular' alt='popular'/>
        Popular
      </button>
      <button  onClick={e => showMoviesOnBtn('top_rated')} className='filter-btn' id='top-rated'>
        <StarSvg className='top_rated' alt='top rated'/>
        Top <br />
        Rated
      </button>
      <button  onClick={e => showMoviesOnBtn('now_playing')} className='filter-btn' id='now-playing'>
        <PlaySvg className='now_playing' alt='now playing'/>
        Now <br />
        Playing
      </button>
    </div>
  );
}

export default FilterMovies;
