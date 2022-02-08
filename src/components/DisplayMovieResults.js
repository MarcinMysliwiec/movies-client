import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import DisplayBtnResult from './DisplayMovieResult';
import './DisplayMovieResults.css'

// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// }


function DisplayMovieResults({ results, filterType, page, getMovieID, loadMovies }) {
  let filterHeader = '';
  const [scrollLock, setScrollLock] = useState(false);

  switch (filterType) {
    case 'popular':
      filterHeader = 'Popular Movies';
      break;
    case 'now_playing':
      filterHeader = 'Now Playing';
      break;
    case 'top_rated':
      filterHeader = 'Top Rated Movies';
      break;
    default:
      filterHeader = `Results for ${filterType}`;
      break;
  }

  const handleScroll = (e) => {
    if (scrollLock) return;
    const elementHeight = e.target.scrollHeight;
    const topDistance = e.target.scrollTop;
    const clientHeight = e.target.clientHeight
    const bottom = elementHeight - topDistance - (clientHeight * 1 / 9) <= clientHeight;
    console.log(bottom)
    if (bottom) {
      loadMovies(filterType, page + 1);
      console.log('bottom')
      // scroll delayer
      setScrollLock(true);
      setTimeout(() => {
        setScrollLock(false);
      }, 1000);
    }
  };

  const ref = useRef(null);
  // const [width, height] = useWindowSize();
  // const [containerWidth, setContainerWidth] = useState(0);
  // useEffect(() => {
  //   const padding = getComputedStyle(ref.current).padding.replaceAll("px","").split(" ")
  //   if (!padding[3]) padding[3] = padding[1]
  //   const calcWidth = ref.current.offsetWidth - padding[1] - padding[3];
  //   setContainerWidth(calcWidth)
  // }, [width]);

  return (
    <div className='card-container' onScroll={handleScroll} ref={ref}>
      {/*<div>*/}
      {/*  { containerWidth } { results.length } { 20 / (containerWidth / 300) } { (containerWidth / 300) }*/}
      {/*</div>*/}

      <h1>{filterHeader}</h1>
      {results.map((result) => {
        return <DisplayBtnResult key={result.id} result={result} getMovieID={getMovieID}/>;
      })}
    </div>
  );
}

export default DisplayMovieResults;
