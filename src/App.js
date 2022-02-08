import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FilterMovies from './components/FilterMovies';
import DisplayMovieResults from './components/DisplayMovieResults';
import SearchMovies from './components/SearchMovies';
import DisplayMovieDetails from './components/DisplayMovieDetails';
import Alert from './components/Alert';
import './App.css';

function App() {
  const TMDB_KEY = process.env.REACT_APP_TMDB_API;
  const [movie, setMovie] = useState({
    results: [],
    filterType: '',
    movieDetails: '',
    alertMsgPosition: '',
    page: 0
  });

  const loadMovies = (type, page = 1) => {
    axios(`https://api.themoviedb.org/3/movie/${type}?api_key=${TMDB_KEY}&language=en-US&page=${page}`)
      .then((data) => {
        let results = data.data.results;
        setMovie((prevState) => {
          if (prevState.results.length > 0) {
            results = [...prevState.results, ...results]
          }
          return { ...prevState, results: results, filterType: type, page: page };
          // return { ...prevState, results: results, filterType: type, page: page };
        });
      })
      .catch((error) => console.log('Error:', error.message));
  }

  // Get data from api when user selects Popular/NowPlaying/TopRated button
  // Load Popular movie data when page loads
  const showMoviesOnBtn = (e) => {
    const buttonType = typeof e === 'string' ? e : e.target.className;
    closeMovieDetails();
    setMovie((prevState) => {
      return { ...prevState, results: [] };
    });

    loadMovies(buttonType)
  };

  // Get user search term from input field and pass it to showMoviesOnSearch()
  const getUserSearchQuery = (e) => {
    let searchQuery;
    if (e.target.className === 'search-icon') {
      searchQuery = e.target.nextElementSibling;
    } else {
      searchQuery = e.target;
    }
    showMoviesOnSearch(searchQuery, e);
  };

  // Get data from api based on user search term.
  const showMoviesOnSearch = (searchQuery, e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      closeMovieDetails();
      axios(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${searchQuery.value}&page=1&include_adult=false`)
        .then((data) => {
          let results = data.data.results;
          if (results.length > 0) {
            setMovie((prevState) => {
              return { ...prevState, results: results, filterType: searchQuery.value };
            });
          } else {
            alertMsgModal();
          }
        })
        .catch(() => clearSearchField(e));
      clearSearchField(searchQuery);
    }
  };

  // Get information about a movie from api based on movies id
  const showMovieDetails = (movieID) => {
    axios(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_KEY}&language=en-US`)
      .then((data) => {
        const movieDetails = data.data;
        setMovie((prevState) => {
          return { ...prevState, movieDetails: movieDetails };
        });
      })
      .catch((error) => console.log('Error', error.message));
  };

  // Clear input field
  const clearSearchField = (e) => {
    e.value = '';
    e.blur();
  };

  //Get movie id when user clicks on card and pass it to showMovieDetails()
  const getMovieID = (e) => {
    let selectMovieId;
    if (e.target.parentNode.className === 'card-title') {
      //Card title
      selectMovieId = e.target.parentNode.parentNode.id;
    } else {
      //Card poster
      selectMovieId = e.target.parentNode.id;
    }
    showMovieDetails(selectMovieId);
  };

  //Close <DisplayMovieDetails> div
  const closeMovieDetails = () => {
    setMovie((prevState) => {
      return { ...prevState, movieDetails: '' };
    });
  };

  // Show alert if user search term not found
  const alertMsgModal = () => {
    setMovie((prevState) => {
      return { ...prevState, alertMsgPosition: '40px' };
    });
    setTimeout(() => {
      setMovie((prevState) => {
        return { ...prevState, alertMsgPosition: '-600px' };
      });
    }, 2000);
  };

  // Load Popular movie when page loads
  useEffect(() => {
    showMoviesOnBtn('popular')
  } , []);

  return (
    <div className='App'>
      <header>
        <SearchMovies getUserSearchQuery={getUserSearchQuery} closeMovieDetails={closeMovieDetails}/>
      </header>
      <main>
        <aside>
          <FilterMovies showMoviesOnBtn={showMoviesOnBtn} closeMovieDetails={closeMovieDetails}/>
        </aside>
        <section>
          {typeof movie.movieDetails !== 'object' ?
            <DisplayMovieResults results={movie.results} filterType={movie.filterType} page={movie.page}
                                 getMovieID={getMovieID} loadMovies={loadMovies}/>
            :
            <DisplayMovieDetails movieDetails={movie.movieDetails} closeMovieDetails={closeMovieDetails}/>
          }
        </section>
        <Alert alertMsgModal={movie.alertMsgPosition}/>
      </main>
    </div>
  );
}

export default App;
