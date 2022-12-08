import React from 'react';

const SearchBox = ({ searchValue, setSearchValue }) => {
	return (
		<div>
			<input className='inp__box'
				placeholder='Type to search...'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	);
};

export default SearchBox;