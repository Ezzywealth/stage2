import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Featured = () => {
	const { moviesLoading, moviesError, allMovies } = useSelector((state) => state.movies);
	console.log(allMovies);
	return (
		<section className='py-8'>
			<div className='container mx-auto'>
				<h2 className='text-2xl font-bold mb-4'>Featured Movies</h2>
				<div className='gap-y-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 py-8'>
					{allMovies.map((movie) => (
						<Link href={`/movies/${movie?.id}`} key={movie?.id}>
							<div data-testid='movie-card' key={movie?.id} className='bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out'>
								<img data-testid='movie-poster' src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt={movie.title} className='w-full h-auto mb-2' />
								<section className='flex flex-col gap-2'>
									<p className='text-[#9CA3AF] text-[12px] font-bold uppercase' data-testid='movie-title'>
										{movie?.original_language}, <span data-testid='movie-release-date'>{new Date(movie?.release_date).toUTCString()}</span>
									</p>
									<h3 data-testid='movie-title' className='text-lg font-bold text-[#111827] text-[18px] leading-[101%]'>
										{movie?.title}
									</h3>
									<div className='flex justify-between text-sm h-8 text-[#111827] font-normal'>
										<div className='flex items-center gap-2'>
											<Image src='/assets/images/imdb.svg' alt={movie?.title} width={10} height={10} layout='intrisic' className='w-auto h-6' />
											<p>{movie.vote_average}</p>
										</div>
										<div className='flex items-center gap-2'>
											<Image src='/assets/images/fruit.png' alt={movie?.title} layout='intrisic' height={50} width={50} className='w-6 h-6' />
											<p>{movie.vote_count}</p>
										</div>
									</div>
									<p className=' text-[14px] text-[#111827] font-semibold'>
										PG: <span className='text-[#80858d] text-[14px]'>{movie?.adult ? 'Yes' : 'No'}</span>
									</p>
								</section>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Featured;
