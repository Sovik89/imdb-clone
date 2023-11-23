# Imdb-clone
IMDB clone

#Project Description:
We will be creating an IMDB where we will be fetching real time trending movie data and show in grd format. We will be designing the whole project using tailwind css

Features:

1.	Users should be able to see trending movies(TMDB API)
2.	Separate watchlist for users
3.	Filter according to genre
4.	Sort based on rating
5.	Pagination 
6.	Search for Movies
7.	Deploying at netlify
Wireframe:

 

 


1.	First we install react:

Command: npx create-react-app .

2.	Install tailwindcss via npm, and create your tailwind.config.js file.

 

3.	Configure tailwind.config.js
Add the paths to all of your template files in your tailwind.config.js file.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


4.	Add the Tailwind directives to your CSS
Add the @tailwind directives for each of Tailwind’s layers to your main CSS file.in our case its ./src/assests
5.	Start the Tailwind CLI build process
Run the CLI tool to scan your template files for classes and build your CSS.
npx tailwindcss -i ./src/assets/input.css -o ./src/assets/output.css –watch
Components:

6.	After this we create Banner.js:
function Banner() {
    return (
      <div className="h-[20vh] md:h-[60vh] bg-center flex items-end bg-cover" style={{
        backgroundImage: "url(https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/9c2d5089c2932f6e704e639cd334975f2e4ed028e5d5ef947cfbefc21d614f56._RI_TTW_SX1920_FMwebp_.jpg)"
      }}>
        <div className="text-xl md:text-3xl bg-gray-900 bg-opacity-60 p-4 text-white w-100">Aspirants</div>
      </div>
    );
  }
  
  export default Banner;
7.	Header.js
import { NavLink } from "react-router-dom";

function Header() {
  const navLinkStyle = {
    textDecoration: "none", // Remove default link underline
    transition: "background-color 0.3s, color 0.3s", // Add a smooth transition effect
  };

  const onFocusStyle = {
    backgroundColor: "blue", // Change the background color when in focus
    color: "white", // Change the text color when in focus
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'indigo-900', // Set your desired background color from Tailwind CSS
    zIndex: 1000, // Adjust the z-index as needed
  };

  return (
    <header style={headerStyle} className="flex border space-x-8 justify-between items-center py-2 px-2 bg-gray-800 text-gray-300">
      <div className="flex space-x-4">
        <NavLink to="/" style={navLinkStyle} activeStyle={onFocusStyle}>Movies</NavLink>
        <NavLink to="/watchlist" style={navLinkStyle} activeStyle={onFocusStyle}>Watchlist</NavLink>
      </div>
      <input placeholder="Search" />
    </header>
  );
}

export default Header;
8.	Movies.js
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { API_KEY, IMAGE_BASE_URL, WATCHLIST_KEY } from "../constant";
import { getWatchlistFromLocalStorage } from "../util";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const handleNextPage = () => {
    if (pageNumber === 500) return;
    setPageNumber(pageNumber + 1);
  };
9.	Watchlist.js
import { useState, useEffect } from "react";
import { IMAGE_BASE_URL } from "../constant";
import { getWatchlistFromLocalStorage } from "../util";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(getWatchlistFromLocalStorage());
  return (
    <div className="mx-[20px] mb-[12px] flex flex-wrap space-x-8">
          {watchlist.map((movie, index) => {
            const { title = "", name = "", posterPath } = movie;
            return (
              <div className="mb-3">
                <div
                  key={index}
                  className="w-[160px] h-[30vh] bg-cover rounded-xl m-4 md:h-[40vh] md:w-[180px] hover:scale-110 duration-300"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}/${posterPath})`,
                  }}
                >
                  <div className="text-xl md:text-3xl bg-gray-900 bg-opacity-60 p-4 text-white w-full rounded-lg">
                    {title || name}
                  </div>
                </div>
                {/* <button onClick={() => saveToLocalStorage(movie)}>
                  Add to Watchlist
                </button> */}
              </div>
            );
          })}
        </div>
  );
}

export default Watchlist;


  const handlePrevPage = () => {
    if (pageNumber === 0) return;
    setPageNumber(pageNumber - 1);
  };

  const isMediaAlreadyPresentInWatchlist = (mediaId, watchlistMovies) => {
    return watchlistMovies.find((movie) => movie.id === mediaId);
  };

  const saveToLocalStorage = (movieObj) => {
    let currentWatchList = getWatchlistFromLocalStorage();

    if (isMediaAlreadyPresentInWatchlist(movieObj.id, currentWatchList)) return;

    currentWatchList = [
      ...currentWatchList,
      {
        id: movieObj.id,
        title: movieObj.title,
        name: movieObj.name,
        posterPath: movieObj.poster_path,
      },
    ];

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(currentWatchList));
  };

  const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${pageNumber}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  const getMovies = () => {
    setIsLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.err(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getMovies();
  }, [pageNumber]);

  return (
    <div>
      <div className="text-2xl my-8 font-bold text-center underline">
        Trending Movies
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-[20px] mb-[12px] flex flex-wrap space-x-8">
          {movies.map((movie, index) => {
            const { title = "", name = "", poster_path: posterPath } = movie;
            return (
              <div className="mb-3">
                <div
                  key={index}
                  className="w-[160px] h-[30vh] bg-cover rounded-xl m-4 md:h-[40vh] md:w-[180px] hover:scale-110 duration-300"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}/${posterPath})`,
                  }}
                >
                  <div className="text-xl md:text-3xl bg-gray-900 bg-opacity-60 p-4 text-white w-full rounded-lg">
                    {title || name}
                  </div>
                </div>
                <button onClick={() => saveToLocalStorage(movie)}>
                  Add to Watchlist
                </button>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-around space-x-2 my-5">
        <button
          disabled={pageNumber === 0 || isLoading}
          onClick={handlePrevPage}
        >
          Previous
        </button>
        <p>{pageNumber}</p>
        <button
          disabled={pageNumber === 500 || isLoading}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Movies;

All the above component adds up in the App.js folder

App.js

import "./App.css";

import Header from ".//components/Header";
import Banner from ".//components/Banner";
import Movies from ".//components/Movies";
import Watchlist from ".//components/Watchlist";
//import BackgroundVideo from "./components/BackgroundVideo";

import { BrowserRouter, Routes, Route } from "react-router-dom";
//import BackgroundVideo from "./components/BackgroundVideo";

function App() {
  return (
    
    <div className="App">
      
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={<Watchlist />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


Now the localstorage is used to keep the Watchlist in the utils.js

import { WATCHLIST_KEY } from "./constant";

export const getWatchlistFromLocalStorage = () => {
  const watchList = localStorage.getItem(WATCHLIST_KEY);

  let value;
  if (watchList) {
    value = JSON.parse(watchList);
  } else {
    value = [];
  }

  return value;
};


Constants.js

//export const API_KEY = "ed9945885ba0c6f7a7edc57b379191ae";
export const API_KEY = "dd6d36726946b61675460427655869a2";


export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const WATCHLIST_KEY = "WATCHLIST_KEY";



Filter by Genre and sort by rating will be done in Watchlist.

First we improve UI by introducing a Table for watchlist where we will have an option to delete the items


Now in Movies we do something like an empty Love button on clicked it will turn red and movie will be added to watchlist and if we click again the movie will get removed from watch list

 


Once it is clicked the love will be disabled. Only way it can be changed is if we delete from the delete button in the watchlist itself


To improve the first UI we keep the title at the bottom

Now we have just introduced the same state watchlist in the Movies.js file and in saveToLocalStorage we save it.

setWatchlist(currentWatchList);





 
Code change in Movie,js is as follows

return (
              <div className="mb-3">
                <div
                  key={index}
                  className="w-[160px] h-[30vh] bg-cover rounded-xl m-4 md:h-[40vh] md:w-[180px] hover:scale-110 duration-300 relative"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}/${posterPath})`,
                  }}
                >
                  <div className="text-xl md:text-xl bg-gray-900 bg-opacity-60 p-4 text-white w-full rounded-lg absolute bottom-0">
                    {title || name}
                  </div>
                </div>


O/P:

 

Little adjustment done for the title to look more beautiful and seamless

 



Love button:
Movies.js
 <div className="p-2 absolute right-0 text-2xl bg-gray-900 rounded opacity-75 ">
                    {isMediaAlreadyPresentInWatchlist(movie.id, watchlist)?<span style={{ color: 'red' }}>&#x2764;</span> : <span style={{ color: 'white' }}>&#x2764;</span> }
                  </div>



Now we introduce table in WatchList:

import { useState,useEffect } from "react";
import { IMAGE_BASE_URL, WATCHLIST_KEY } from "../constant";
import { getWatchlistFromLocalStorage } from "../util";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(getWatchlistFromLocalStorage());
  const removeMediaFromLocalStorage=(mediaId)=>{
    if (watchlist.length===1){
    watchlist.remove(WATCHLIST_KEY);
    setWatchlist([]);
    return;
    }
    let updatedWatchlist=watchlist.filter((media)=>{
      if(media.id===mediaId){
        return false
      }else{
        return true
      }
    });

    setWatchlist(updatedWatchlist)
  }
  return (
    
    <div className="my-12" >
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
          <thead class="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Id</th>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Release Date</th>
              <th scope="col" class="px-6 py-3">Average Rating</th>
              <th scope="col" class="px-6 py-3">Poster Link</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map(({id,title = "", name = "", posterPath,releaseDate,voteAverage})=>{
              
              return(
                <tr key={id} class="bg-white border-b day:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4">{id}</td>
                  <td class="px-6 py-4">{title||name}</td>
                  <td class="px-6 py-4">{releaseDate}</td>
                  <td class="px-6 py-4">{voteAverage}</td>
                  <td class="px-6 py-4">
                    <a href={`${IMAGE_BASE_URL}||${posterPath}`} target='_blank' rel="noreferrer">PosterLink</a>
                  </td>
                  <td class="px-6 py-4 cursor-pointer">
                    <button style={{fontWeight:'bold' }} className="text-red-800 hover:text-red-400" onClick={()=>removeMediaFromLocalStorage(id)}>Delete &#128465;</button>
                  </td>
                </tr>
              ) 
            })}
            
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Watchlist;


Sort by Id in watchlist:

const sortByID = () => {
    const temp = _.cloneDeep(watchlist)
    const updatedWatchlist = temp.sort(function (a, b) {
      return a.id - b.id
    });
    setWatchlist(updatedWatchlist);
  }


Search by trending movies:

 

Code changes

Search brought in Movies component from the Header component

Changes in the Movies are depicted in green:

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { API_KEY, IMAGE_BASE_URL, WATCHLIST_KEY } from "../constant";
import { getWatchlistFromLocalStorage } from "../util";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery,setSearchQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [watchlist, setWatchlist] = useState(getWatchlistFromLocalStorage());

  const handleNextPage = () => {
    if (pageNumber === 500) return;
    setPageNumber(pageNumber + 1);
  };

  const handlePrevPage = () => {
    if (pageNumber === 0) return;
    setPageNumber(pageNumber - 1);
  };

  const isMediaAlreadyPresentInWatchlist = (mediaId, watchlistMovies) => {
    return watchlistMovies.find((movie) => movie.id === mediaId);
  };

  const saveToLocalStorage = (movieObj) => {
    let currentWatchList = getWatchlistFromLocalStorage();
    //If movie already present in the watch list
    if (isMediaAlreadyPresentInWatchlist(movieObj.id, currentWatchList)) return;

    //adding the value in the localstorage along with what is present
    currentWatchList = [
      ...currentWatchList,
      {
        id: movieObj.id,
        title: movieObj.title,
        name: movieObj.name,
        posterPath: movieObj.poster_path,
        releaseDate:movieObj.release_date,
        voteAverage:movieObj.vote_average
      },
    ];

    //Now stringify the localStorage with the values present in it
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(currentWatchList));
    setWatchlist(currentWatchList);
  };

  const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${pageNumber}`;
  const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?language=en-US&api_key=${API_KEY}&query=${searchQuery}&page=${pageNumber}`;
  
  const options = { method: "GET", headers: { accept: "application/json" } };

  const getMovies = () => {
    setIsLoading(true);
    fetch(trendingMoviesUrl, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));//after everything is done we set the setIsLoading state to false
    
  };

  const searchMovie =(searchText)=>{
    setIsLoading(true);
    
    //https://api.themoviedb.org/3/search/movie
    fetch(searchMoviesUrl, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));//after everything is done we set the setIsLoading state to false
  }

  useEffect(() => {
    if(searchQuery){
      searchMovie(searchQuery);
    }else{
      getMovies();
    }
    
  }, [pageNumber,searchQuery]);//It will check for pageNumber as well as searchQuery changes

  //console.log(watchlist);

  return (
    <div >
      <div className="text-2xl my-8 font-bold text-center  underline">
        Trending Movies
      </div>
      <div className="flex justify-end px-11">
        <input 
        className="border-2 border-black-900"
        placeholder="Search" value={searchQuery} 
        onChange={(e)=>setSearchQuery(e.target.value)} />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-[20px] mb-[12px] flex flex-wrap ">
          {movies.map((movie, index) => {
            const { title = "", name = "", poster_path: posterPath } = movie;
            return (
              <div className="mb-3 cursor-pointer" onClick={() => saveToLocalStorage(movie)}>
                <div
                  key={index}
                  className="w-[160px] h-[30vh] bg-cover rounded-xl m-4 md:h-[40vh] md:w-[180px] hover:scale-110 duration-300 relative"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}/${posterPath})`,
                  }}
                >
                  <div className="p-2 absolute right-0 text-2xl bg-gray-900 rounded opacity-75 ">
                    {isMediaAlreadyPresentInWatchlist(movie.id, watchlist)?<span style={{ color: 'red' }}>&#x2764;</span> : <span style={{ color: 'white' }}>&#x2764;</span> }
                  </div>
                  
                  <div className="text-xl md:text-xl bg-gray-900 bg-opacity-60 p-4 text-white w-full rounded-b-lg absolute bottom-0">
                    {title || name}
                  </div>
                </div>
                {/* <button onClick={() => saveToLocalStorage(movie)}>
                  Add to Watchlist
                </button> */}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-evenly space-x-1 my-3">
        <button
          disabled={pageNumber === 0 || isLoading}
          onClick={handlePrevPage}
          style={{backgroundColor:"rgb(31,41,55)",color:"white",padding:"10px",borderRadius:"5px"}}
        >
          Previous
        </button>
        <p className="font-bold">{pageNumber}</p>
        <button
          disabled={pageNumber === 500 || isLoading}
          onClick={handleNextPage}
          style={{backgroundColor:"rgb(31,41,55)",color:"white",padding:"10px",borderRadius:"5px"}}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Movies;



Delete from watchlist after second click on trending list:

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

Filter by genre

i.	Send Genre ID to local storage
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

 

ii.	Map genre id with genre name
Subtask get dictionary from TMDB and do mapping

import { useState, useEffect } from "react";
import { API_KEY, IMAGE_BASE_URL, WATCHLIST_KEY } from "../constant";
import { getWatchlistFromLocalStorage } from "../util";

function Watchlist() {
  const [genreMap, setGenreMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(getWatchlistFromLocalStorage());

  const removeMediaFromLocalStorage = (mediaId) => {
    if (watchlist.length === 1) {
      localStorage.removeItem(WATCHLIST_KEY);
      setWatchlist([]);
      return;
    }

    let updatedWatchlist = watchlist.filter((media) => media.id !== mediaId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  };

  const sortByRating = () => {
    const temp = [...watchlist];
    const updatedWatchlist = temp.sort((a, b) => b.voteAverage - a.voteAverage);
    setWatchlist(updatedWatchlist);
  };

  const handleFilter = (event) => {
    const selectedGenreId = event.target.value;

    if (selectedGenreId === "All") {
      setWatchlist(getWatchlistFromLocalStorage());
    } else {
      const filteredWatchlist = getWatchlistFromLocalStorage().filter(({ genreIds }) =>
        genreIds.includes(parseInt(selectedGenreId))
      );
      setWatchlist(filteredWatchlist);
    }
  };

  const searchMovieUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  const getGenre = () => {
    setIsLoading(true);
    fetch(searchMovieUrl, options)
      .then((res) => res.json())
      .then(({ genres }) => {
        const computeGenreMap = genres.reduce((acc, genreObj) => {
          const { id, name } = genreObj;
          return { ...acc, [id]: name };
        }, {});
        setGenreMap(computeGenreMap);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getGenre();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {watchlist.length === 0 ? (
        "No Watchlisted Movies"
      ) : (
        <div className="px-4 mt-4">
          <div className="flex justify-between">
            <select
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onChange={handleFilter}
            >
              <option value="All">All</option>
              {getWatchlistFromLocalStorage().map(({ genreIds = [] }) => {
                return genreIds.map((genreId) => (
                  <option key={genreId} value={genreId}>
                    {genreMap[genreId]}
                  </option>
                ));
              })}
            </select>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={sortByRating}
            >
              Sort by Rating
            </button>
          </div>
          <div className="relative overflow-x-auto mx-auto  shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="text-xl px-6 py-3">
                    Poster
                  </th>
                  <th scope="col" className="text-xl px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="text-xl px-6 py-3">
                    Average Rating
                  </th>
                  <th scope="col" className="text-xl px-6 py-3">
                    Genre(s)
                  </th>
                  <th scope="col" className="text-xl px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map(
                  ({
                    id,
                    title = "",
                    genreIds = [],
                    voteAverage,
                    posterPath,
                  }) => (
                    <tr
                      key={id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <img
                          className="w-[160px] h-[30vh] min-h-[200px]"
                          src={`${IMAGE_BASE_URL}/${posterPath}`}
                          alt={title}
                        />
                      </td>
                      <td className="text-xl px-6 py-4 items-center">
                        {title}
                      </td>
                      <td className="text-xl px-6 py-4">{voteAverage}</td>
                      <td className="text-xl px-6 py-4">
                        {genreIds
                          .map((genreId) => genreMap[genreId] || "")
                          .join(", ")}
                      </td>
                      <td
                        className="text-xl space-x-1 px-6 py-4 text-right cursor-pointer text-red-200 hover:text-red-500"
                        onClick={() => removeMediaFromLocalStorage(id)}
                      >
                        <span>Delete</span>
                        <span>🗑️</span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Watchlist;







