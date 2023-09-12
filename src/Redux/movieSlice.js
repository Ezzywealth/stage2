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
	searchQuery: '',
	featuredMovie: {},
};

export const searchMovies = createAsyncThunk('movies/searchMovies', async (query) => {
	const { data } = await axios.get(`${baseUrl}/search/movie?query=${query}`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		contentType: 'application/json',
	});
	data.query = query;
	return data;
});

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
	const { data } = await axios.get(`${baseUrl}/movie/popular?api_key=${api_key}`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		contentType: 'application/json',
	});
	return data?.results;
});

export const fetchMovie = createAsyncThunk('movies/fetchMovie', async (id) => {
	const { data } = await axios.get(`${baseUrl}/movie/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		contentType: 'application/json',
	});
	return data;
});

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		likeMovie: (state, action) => {
			state.allMovies.map((movie) => {
				if (movie.id === action.payload) {
					movie.vote_count = movie.liked ? movie.vote_count - 1 : movie.vote_count + 1;
					movie.liked = !movie.liked;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMovies.pending, (state) => {
			state.moviesLoading = true;
		});
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.moviesLoading = false;
			state.movieError = '';
			state.allMovies = action.payload.map((movie) => {
				movie.liked = false;
				return movie;
			});
			state.featuredMovie = action.payload[0];
		});
		builder.addCase(fetchMovies.rejected, (state, action) => {
			state.moviesLoading = false;
			state.allMovies = [];
			state.moviesError = 'There was an error handling your request, please try again later.';
		});
		builder.addCase(fetchMovie.pending, (state) => {
			state.movieLoading = true;
			state.movieError = '';
		});
		builder.addCase(fetchMovie.fulfilled, (state, action) => {
			state.movieError = '';
			state.movieLoading = false;
			state.movie = action.payload;
		});
		builder.addCase(fetchMovie.rejected, (state, action) => {
			state.movieLoading = false;
			state.movie = {};
			state.movieError = 'There was an error fetching the details of this movie, please try again later.';
		});
		builder.addCase(searchMovies.pending, (state) => {
			state.moviesLoading = true;
			state.moviesError = '';
		});
		builder.addCase(searchMovies.fulfilled, (state, action) => {
			state.moviesError = '';
			state.moviesLoading = false;
			state.allMovies = action.payload.results.map((movie) => {
				movie.liked = false;
				return movie;
			});
			state.searchQuery = action.payload.query;
			state.featuredMovie = action.payload.results[0];
		});
		builder.addCase(searchMovies.rejected, (state, action) => {
			state.moviesLoading = false;
			state.allMovies = [];
			state.moviesError = 'There was an error handling your request, please try again later.';
		});
	},
});

export default movieSlice.reducer;
export const { likeMovie } = movieSlice.actions;

// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
// https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
