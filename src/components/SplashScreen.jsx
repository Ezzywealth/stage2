import Image from 'next/image';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const SplashScreen = () => {
	const { featuredMovie, moviesLoading, moviesError } = useSelector((state) => state.movies);

	if (moviesLoading) {
		return (
			<section className='bg-gray-50 w-full h-screen flex justify-center items-center'>
				<ColorRing visible={true} height='80' width='80' ariaLabel='blocks-loading' wrapperStyle={{}} wrapperClass='blocks-wrapper' colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
			</section>
		);
	}

	if (moviesError) {
		return (
			<section className='bg-gray-50 w-full h-screen flex justify-center items-center'>
				<h1 className='text-red-500 text-2xl font-bold'>{moviesError}</h1>
			</section>
		);
	}
	return (
		<section className='text-white w-full  flex px-4 justify-center items-center'>
			<div className='container mx-auto md:mx-16'>
				<div className='flex gap-4 w-full md:w-[60%] lg:w-[40%] justify-between flex-col font-semibold'>
					<h1 className='font-bold text-4xl md:text-5xl'>{featuredMovie?.title}</h1>
					<div className='flex gap-8 text-sm h-8 text-white font-normal'>
						<div className='flex items-center gap-2'>
							<Image src='/assets/images/imdb.svg' alt={featuredMovie?.title} width={10} height={10} layout='intrisic' className='w-auto h-6' />
							<p>{(featuredMovie?.vote_average * 10).toFixed(1)} / 100</p>
						</div>
						<div className='flex items-center gap-2 text-white'>
							<Image src='/assets/images/fruit.png' alt={featuredMovie?.title} layout='intrisic' height={50} width={50} className='w-6 h-6' />
							<p>{featuredMovie?.vote_count}</p>
						</div>
					</div>
					<p>{featuredMovie?.overview}</p>
					<button className='bg-[#BE123C] flex items-center justify-center rounded-lg py-4 px-6 gap-4 w-full md:w-[80%] lg:w-[70%]'>
						<Image src='/assets/images/trailer.svg' alt='trailer' layout='intrisic' height={10} width={10} className='w-6 h-6' />
						Watch Trailer
					</button>
				</div>
			</div>
		</section>
	);
};

export default SplashScreen;
