import React from 'react';
import { fadeIn } from 'react-animations'
import Radium, {StyleRoot} from 'radium';
import './DisplayMovieResult.css'

const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

function DisplayMovieResult({ result, getMovieID }) {
  const isPosterUrlvalid = result.poster_path !== null ? `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}` : '/svgs/TMDB_LOGO.svg';

  return (
    <StyleRoot className='card' onClick={getMovieID} id={result.id} style={styles.fadeIn}>
        <img className='card-poster' src={`${isPosterUrlvalid}`} alt={`${result.title} Poster`}/>
        <div className='card-release_date'>{result.release_date && result.release_date.split('-')[0]}</div>
        <div className='card-title'>
          <p>{result.title}</p>
        </div>
    </StyleRoot>
  );
}

export default DisplayMovieResult;
