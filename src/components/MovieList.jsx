import React from 'react';

const MovieList = ({ movies, favoriteComponent, handleFavoriteClick }) => {
	const FavoriteComponents = favoriteComponent;
	return (
		<>
			{movies.map((movie, index) => (
				<div className='img__box' key={index}>
					<img src={movie.Poster} alt='movie' />
					<div className='overlay'
						onClick={() => handleFavoriteClick(movie)}
					>
						<FavoriteComponents />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;