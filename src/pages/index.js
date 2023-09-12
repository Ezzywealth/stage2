import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchMovies } from '@/Redux/movieSlice';
import SplashScreen from '@/components/SplashScreen';
import Featured from '@/components/Featured';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ColorRing } from 'react-loader-spinner';

export default function Home() {
	const dispatch = useDispatch();
	const { featuredMovie } = useSelector((state) => state.movies);

	useEffect(() => {
		dispatch(fetchMovies());
	}, [dispatch]);

	return (
		<main>
			<section className='mb-8 w-full bg-blend-color h-[80vh] flex flex-col justify-center items-center' style={{ backgroundImage: `url(${featuredMovie?.poster_path ? `https://image.tmdb.org/t/p/original${featuredMovie?.poster_path}` : '/assets/images/default.jpg'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: 'rgba(0,0,0,0.6)' }}>
				<Navbar />
				<SplashScreen />
			</section>
			<Featured />
			<Footer />
		</main>
	);
}
