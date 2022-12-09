import { useEffect, useState } from 'react';

import MovieList from './components/MovieList';
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorite from './components/AddFavorite';
import RemoveFavorite from './components/RemoveFavorite';


function App() {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favorites, setFavorites] = useState([]);


	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=7248391e`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}

	};

	// const getMovieRequest = async (searchValue) => {
	// 	const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

	// 	const response = await fetch(url, {
	// 		method: "GET",
	// 	});
	// 	const responseJson = await response.json();

	// 	if (responseJson.Search) {
	// 		setMovies(responseJson.Search);
	// 	}
	// };

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavorite = JSON.parse(
			localStorage.getItem('react-movie-app-favorites')
		);
		if (movieFavorite !== null) {
			setFavorites(movieFavorite);
		}
	}, []);

	const saveLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
	};

	const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
		saveLocalStorage(newFavoriteList);
	};

	const removeFavorite = (movie) => {
		const newFavoriteList = favorites.filter(
			(favorite) => movie.imdbID !== favorite.imdbID
		);
		setFavorites(newFavoriteList);
		saveLocalStorage(newFavoriteList);
	};

	return (
		<div className="movie-app">
			<div className='header'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue}
					setSearchValue={setSearchValue} />
			</div>
			<div className='movies'>
				<MovieList movies={movies}
					favoriteComponent={AddFavorite}
					handleFavoriteClick={addFavoriteMovie} />
			</div>
			<div className='header'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='favorites'>
				<MovieList movies={favorites}
					favoriteComponent={RemoveFavorite}
					handleFavoriteClick={removeFavorite}
				/>
			</div>
		</div>
	);
};

export default App;
