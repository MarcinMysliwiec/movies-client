import React from 'react';

function SearchMovies({ getUserSearchQuery, closeMovieDetails }) {
  return (
    <section className='search-container'>
      <img src='/svgs/logo.svg' alt='logo' className='logo' onClick={closeMovieDetails} />
      <img src='/svgs/search.svg' alt='search' className='search-icon' onClick={getUserSearchQuery} />
      <input type='text' name='searchMovie' placeholder='Search Movies...' onKeyPress={getUserSearchQuery} />
    </section>
  );
}

export default SearchMovies;
