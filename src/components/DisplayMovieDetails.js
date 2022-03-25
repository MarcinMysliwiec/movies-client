import React from 'react';
import './DisplayMovieDetails.css';

function DisplayMovieDetails ({ movieDetails, closeMovieDetails }) {
  let defaultPosterUrl = './popcorn.jpg';
  let posterUrl = `https://image.tmdb.org/t/p/w220_and_h330_face`;

  const { title, poster_path, backdrop_path, overview, release_date, runtime, genres } = movieDetails;

  let moviePoster = poster_path !== null ? `${posterUrl}${poster_path}` : defaultPosterUrl;
  let movieBackdrop = backdrop_path !== null ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}` : defaultPosterUrl;

  let genresList = genres
    .map((genre) => {
      return `${genre.name}`;
    })
    .join(', ');

  return (<div className="movie-detail-container">
      <div className="movie-detail-backdrop-container">
        <img src={movieBackdrop} className="movie-detail-backdrop" alt={`${movieDetails.title} Poster`}/>
        <div className="shadow"></div>
      </div>
      <div className="movie-detail">
        <div onClick={closeMovieDetails} className="movie-detail-close">
          <span>X</span>
        </div>

        <img src={`${moviePoster}`} className="movie-detail-poster" alt={`${title} Poster`}/>

        <div className="movie-detail-disc">
          <div className="movie-detail-title">{title}</div>
          <div className="movie-detail-genres">{`Genres: ${genresList}`}</div>
          <div> {`Runtime: ${runtime} min`}</div>
          <div>{`Release date: ${release_date}`}</div>
          <h4 style={{ color: '#eaeaea', marginTop: '30px' }}>Overview</h4>
          <div className="movie-detail-overview">{overview}</div>
        </div>
      </div>
    </div>);
}

export default DisplayMovieDetails;
