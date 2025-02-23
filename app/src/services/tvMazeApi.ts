export const fetchTvShows = async () => {
	const response = await fetch("https://api.tvmaze.com/shows");
	const data = await response.json();
	return data;
};

export const fetchTvShowDetails = async (id: number) => {
	const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
	const data = response.json();
	return data;
};

export const fetchCastDetails = async (id: number) => {
	const response = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
	const data = response.json();
	return data;
};
