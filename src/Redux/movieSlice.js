import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const token = process.env.NEXT_PUBLIC_MOVIESDB_API_KEY;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const api_key = process.env.NEXT_PUBLIC_MOVIESDB_API_KEY;
const initialState = {
	allMovies: [],
	movie: {},
	moviesLoading: false,
	moviesError: '',
	movieLoading: false,
	movieError: '',
};

console.log(token);
export const searchMovie = createAsyncThunk('movies/searchMovies', async (query) => {
	const { data } = await axios.get(`${baseUrl}/search/movie?query=${query}`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		contentType: 'application/json',
	});
	console.log(data);
	return data?.results;
});

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
	const { data } = await axios.get(`${baseUrl}/movie/popular?api_key=${api_key}`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		contentType: 'application/json',
	});
	console.log(data);
	return data?.results;
});

export const fetchMovie = createAsyncThunk('movies/fetchMovie', async (id) => {
	const { data } = await axios.get(`${baseUrl}/movie/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		contentType: 'application/json',
	});
	console.log(data);
	return data;
});

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchMovies.pending, (state) => {
			state.moviesLoading = true;
		});
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.moviesLoading = false;
			state.allMovies = action.payload;
		});
		builder.addCase(fetchMovies.rejected, (state, action) => {
			state.moviesLoading = false;
			state.moviesError = action.payload;
		});
		builder.addCase(fetchMovie.pending, (state) => {
			state.movieLoading = true;
		});
		builder.addCase(fetchMovie.fulfilled, (state, action) => {
			state.movieLoading = false;
			state.movie = action.payload;
		});
		builder.addCase(fetchMovie.rejected, (state, action) => {
			state.movieLoading = false;
			state.movieError = action.payload;
		});
	},
});

export default movieSlice.reducer;

// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
// https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
