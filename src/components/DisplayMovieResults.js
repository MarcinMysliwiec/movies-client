import React, {useEffect, useRef, useState} from 'react';
import DisplayBtnResult from './DisplayMovieResult';
import './DisplayMovieResults.css'

function DisplayMovieResults({results, filterType, getMovieID, paddingMovies}) {
  const [filterHeader, setFilterHeader] = useState('');
  const [scrollLock, setScrollLock] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    switch (filterType) {
      case 'popular':
        setFilterHeader('Popular Movies');
        break;
      case 'now_playing':
        setFilterHeader('Now Playing');
        break;
      case 'top_rated':
        setFilterHeader('Top Rated Movies');
        break;
      default:
        setFilterHeader(`Results for ${filterType}`);
        break;
    }
  }, [filterType]);

  const handleScroll = (e) => {
    if (scrollLock) return;
    const elementHeight = e.target.scrollHeight;
    const topDistance = e.target.scrollTop;
    const clientHeight = e.target.clientHeight
    const bottom = elementHeight - topDistance - (clientHeight / 5) <= clientHeight;
    // console.log(bottom)
    if (bottom) {
      paddingMovies(filterType);
      // console.log('bottom')
      // scroll delayer
      setScrollLock(true);
      setTimeout(() => {
        setScrollLock(false);
      }, 500);
    }
  };

  return (
    <div className='card-container' onScroll={handleScroll} ref={ref}>
      <h1>{filterHeader}</h1>
      {results.map((result) => {
        return <DisplayBtnResult key={result.id} result={result} getMovieID={getMovieID}/>;
      })}
    </div>
  );
}

export default DisplayMovieResults;
