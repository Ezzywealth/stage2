import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	allMovies: [],
	activeMovie: {},
	moviesLoading: false,
	moviesError: '',
	movieLoading: false,
	movieError: '',
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
	const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=1a4f4b9f5c5f6e7c6f9c8d7e6f5d4c3b');
	const data = await response.json();
	return data.results;
});

export const fetchMovie = createAsyncThunk('movies/fetchMovies', async () => {
	const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=1a4f4b9f5c5f6e7c6f9c8d7e6f5d4c3b');
	const data = await response.json();
	return data.results;
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
			state.activeMovie = action.payload;
		});
		builder.addCase(fetchMovie.rejected, (state, action) => {
			state.movieLoading = false;
			state.movieError = action.payload;
		});
	},
});

export default movieSlice.reducer;
