import React from 'react';
import './SearchMovies.css';
import { ReactComponent as LogoSvg } from '../assets/images/svgs/logo.svg';
import { ReactComponent as SearchSvg } from '../assets/images/svgs/search.svg';

function SearchMovies({ getUserSearchQuery, closeMovieDetails }) {
  return (
    <section className='search-container'>
      <LogoSvg className='logo' alt='logo' onClick={closeMovieDetails}/>
      <SearchSvg className='search-icon' alt='search' onClick={getUserSearchQuery}/>
      <input type='text' name='searchMovie' placeholder='Search Movies...' onKeyPress={getUserSearchQuery} />
    </section>
  );
}

export default SearchMovies;
