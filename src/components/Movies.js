import React, { useState, useEffect } from 'react';
import { API_KEY, IMAGE_BASE_URL, WATCHLIST_KEY } from '../constant';
import { getWatchlistFromLocalStorage } from '../util';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [watchlist, setWatchlist] = useState(getWatchlistFromLocalStorage());

  const handleNextPage = () => {
    if (pageNumber < 500) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const isMediaAlreadyPresentInWatchlist = (mediaId) => {
    return watchlist.some((movie) => movie.id === mediaId);
  };

  const removeMediaFromLocalStorage = (mediaId) => {
    const updatedWatchlist = watchlist.filter((media) => media.id !== mediaId);
    setWatchlist(updatedWatchlist);
    updateLocalStorage(updatedWatchlist);
  };

  const saveToLocalStorage = (movieObj) => {
    if (!isMediaAlreadyPresentInWatchlist(movieObj.id)) {
      const updatedWatchlist = [
        ...watchlist,
        {
          id: movieObj.id,
          title: movieObj.title || movieObj.name,
          posterPath: movieObj.poster_path,
          releaseDate: movieObj.release_date,
          voteAverage: movieObj.vote_average,
          genreIds:movieObj.genre_ids,
        },
      ];

      setWatchlist(updatedWatchlist);
      updateLocalStorage(updatedWatchlist);
    }
  };

  const updateLocalStorage = (watchlist) => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  };

  const handleMovieClick = (movieObj) => {
    const { id: mediaId } = movieObj;

    if (isMediaAlreadyPresentInWatchlist(mediaId)) {
      removeMediaFromLocalStorage(mediaId);
    } else {
      saveToLocalStorage(movieObj);
    }
  };

  const fetchMovies = (url) => {
    setIsLoading(true);

    fetch(url, { method: 'GET', headers: { accept: 'application/json' } })
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?language=en-US&api_key=${API_KEY}&query=${searchQuery}&page=${pageNumber}`
      : `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${pageNumber}`;

    fetchMovies(url);
  }, [pageNumber, searchQuery]);

  return (
    <div>
      <div className="text-2xl my-8 font-bold text-center underline">
        Trending Movies
      </div>
      <div className="flex justify-end px-11">
        <input
          className="border-2 border-black-900"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-[20px] mb-[12px] flex flex-wrap ">
          {movies.map((movie, index) => {
            const { id, title, name, poster_path: posterPath } = movie;
            return (
              <div key={id} className="mb-3 cursor-pointer">
                <div
                  className="w-[160px] h-[30vh] bg-cover rounded-xl m-4 md:h-[40vh] md:w-[180px] hover:scale-110 duration-300 relative"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}/${posterPath})`,
                  }}
                >
                  <div
                    className="p-2 absolute right-0 text-2xl bg-gray-900 rounded opacity-75 "
                    onClick={() => handleMovieClick(movie)}
                  >
                    {isMediaAlreadyPresentInWatchlist(id) ? (
                      <span style={{ color: 'red' }}>&#x2764;</span>
                    ) : (
                      <span style={{ color: 'white' }}>&#x2764;</span>
                    )}
                  </div>

                  <div className="text-xl md:text-xl bg-gray-900 bg-opacity-60 p-4 text-white w-full rounded-b-lg absolute bottom-0">
                    {title || name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-evenly space-x-1 my-3">
        <button
          disabled={pageNumber === 1 || isLoading}
          onClick={handlePrevPage}
          style={{
            backgroundColor: 'rgb(31,41,55)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          Previous
        </button>
        <p className="font-bold">{pageNumber}</p>
        <button
          disabled={pageNumber === 500 || isLoading}
          onClick={handleNextPage}
          style={{
            backgroundColor: 'rgb(31,41,55)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;