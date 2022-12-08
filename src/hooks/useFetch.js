import { useEffect, useState } from 'react';

const useFetch = (url, options) => {
	const [status, setStatus] = useState({
		loading: false,
		data: undefined,
		error: undefined,
	});

	function fetchNow(url, options) {
		setStatus({ loading: true });
		fetch(url, options)
			.then((res) => res.json())
			.then((res) => {
				setStatus({ loading: false, data: res.Search });
			})
			.catch((error) => {
				setStatus({ loading: false, error });
			});
	}

	useEffect(() => {
		if (url) {
			fetchNow(url, options);
		}
	}, [options]);

	return { ...status, fetchNow };
};

export default useFetch;