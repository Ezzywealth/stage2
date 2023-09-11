import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchMovies } from '@/Redux/movieSlice';
import SplashScreen from '@/components/SplashScreen';
import Featured from '@/components/Featured';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
	const dispatch = useDispatch();
	const { moviesLoading, moviesError, allMovies } = useSelector((state) => state.movies);

	useEffect(() => {
		dispatch(fetchMovies());
	}, [dispatch]);

	return (
		<main>
			<Navbar />
			<SplashScreen />
			<Featured />
			<Footer />
		</main>
	);
}
