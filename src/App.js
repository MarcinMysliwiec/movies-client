import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FilterMovies from './components/FilterMovies';
import DisplayMovieResults from './components/DisplayMovieResults';
import SearchMovies from './components/SearchMovies';
import DisplayMovieDetails from './components/DisplayMovieDetails';
import Alert from './components/Alert';
import './App.css';

const moviesDefault = {
  results: [], filterType: '', isSearch: false, movieDetails: '', alertMsgPosition: '', page: 0
};

function App () {
  const TMDB_KEY = process.env.REACT_APP_TMDB_API;
  const [movies, setMovies] = useState(moviesDefault);

  const resetMovies = () => {
    setMovies(moviesDefault);
  };

  const appendMovies = (result, type, page, isSearch = false) => {
    // let currMovies = [...movies.results];
    // result.forEach(newItem => {
    //   const index = currMovies.findIndex(existingItem => existingItem.id === newItem.id)
    //   index === -1 ? currMovies.push({...newItem}) : console.log("object already exists")
    // })
    // setMovies((prevState) => {
    //   return {
    //     ...prevState, results: [...currMovies], filterType: type, isSearch: isSearch, page: page
    //   };
    // });

    setMovies((prevState) => {
      return {
        ...prevState, results: [...prevState.results, ...result], filterType: type, isSearch: isSearch, page: page
      };
    });
  };

  const loadMovies = (type, page = 1) => {
    return axios(`https://api.themoviedb.org/3/movie/${type}?api_key=${TMDB_KEY}&language=en-US&page=${page}`)
      .then((data) => {
        return data.data.results;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  const searchForMovie = (searchQuery, page = 1) => {
    return axios(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`)
      .then((data) => {
        return data.data.results;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  const loadMovieDetails = (movieID) => {
    return axios(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_KEY}&language=en-US`)
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  const paddingMovies = (type) => {
    if ((movies.isSearch && movies.filterType === '') || (!movies.isSearch && type === '')) {
      return;
    }
    const page = movies.page + 1;

    const req_1 = (movies.isSearch) ? searchForMovie(movies.filterType, page) : loadMovies(type, page);
    const req_2 = (movies.isSearch) ? searchForMovie(movies.filterType, page + 1) : loadMovies(type, page + 1);

    axios.all([req_1, req_2]).then(axios.spread((...responses) => {
      appendMovies(responses[0], type, page, movies.isSearch);
      appendMovies(responses[1], type, page + 1, movies.isSearch);
    }));
  };

  // Get data from api when user selects Popular/NowPlaying/TopRated button
  // Load Popular movies data when page loads
  const showMoviesOnBtn = (target) => {
    closeMovieDetails();
    resetMovies();

    const req_1 = loadMovies(target, 1);
    const req_2 = loadMovies(target, 2);
    const req_3 = loadMovies(target, 3);

    axios.all([req_1, req_2, req_3]).then(axios.spread((...responses) => {
      appendMovies(responses[0], target, 1);
      appendMovies(responses[1], target, 2);
      appendMovies(responses[2], target, 3);
    }));
  };

  // Get data from api based on user search term.
  const showMoviesOnSearch = (searchQuery, e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const searchingMovie = searchQuery.value;
      const req_1 = searchForMovie(searchingMovie, 1);
      const req_2 = searchForMovie(searchingMovie, 2);
      const req_3 = searchForMovie(searchingMovie, 3);

      axios.all([req_1, req_2, req_3]).then(axios.spread((...responses) => {
        if (responses[0].length === 0) {
          alertMsgModal();
        } else {
          closeMovieDetails();
          resetMovies();
          appendMovies(responses[0], searchingMovie, 1, true);
          appendMovies(responses[1], searchingMovie, 2, true);
          appendMovies(responses[2], searchingMovie, 3, true);
        }
      }));
      clearSearchField(searchQuery);
    }
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

  // Get information about a movies from api based on movies id
  const showMovieDetails = (movieID) => {
    let req = loadMovieDetails(movieID);

    req.then(result => {
      setMovies((prevState) => {
        return { ...prevState, isSearch: false, movieDetails: result };
      });
    });
  };

  // Clear input field
  const clearSearchField = (e) => {
    e.value = '';
    e.blur();
  };

  //Get movies id when user clicks on card and pass it to showMovieDetails()
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
    setMovies((prevState) => {
      return { ...prevState, movieDetails: '' };
    });
  };

  // Show alert if user search term not found
  const alertMsgModal = () => {
    setMovies((prevState) => {
      return { ...prevState, alertMsgPosition: '40px' };
    });
    setTimeout(() => {
      setMovies((prevState) => {
        return { ...prevState, alertMsgPosition: '-600px' };
      });
    }, 2000);
  };

  // Load Popular movies when page loads
  useEffect(() => {
    closeMovieDetails();
    resetMovies();

    const target = 'popular';
    const req_1 = loadMovies(target, 1);
    const req_2 = loadMovies(target, 2);

    axios.all([req_1, req_2]).then(axios.spread((...responses) => {
      appendMovies(responses[0], target, 1);
      appendMovies(responses[1], target, 2);
    }));
  }, []);

  return (<div className="App">
    <header>
      <SearchMovies getUserSearchQuery={getUserSearchQuery} closeMovieDetails={closeMovieDetails}/>
    </header>
    <main>
      <aside>
        <FilterMovies showMoviesOnBtn={showMoviesOnBtn} closeMovieDetails={closeMovieDetails}/>
      </aside>
      <section>
        {typeof movies.movieDetails !== 'object' ?
          <DisplayMovieResults results={movies.results} filterType={movies.filterType}
                               getMovieID={getMovieID} paddingMovies={paddingMovies}/> :
          <DisplayMovieDetails movieDetails={movies.movieDetails} closeMovieDetails={closeMovieDetails}/>}
      </section>
      <Alert alertMsgModal={movies.alertMsgPosition}/>
    </main>
  </div>);
}

export default App;
