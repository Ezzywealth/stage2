import { fetchMovie } from '@/Redux/movieSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
const Index = () => {
	const { movieLoading, movieError, movie } = useSelector((state) => state.movies);
	const dispatch = useDispatch();
	const router = useRouter();
	const { id } = router.query;
	useEffect(() => {
		dispatch(fetchMovie(id));
	}, [dispatch]);
	console.log(movie);

	function formatPrice(price) {
		// Check if the input is a valid number
		if (typeof price !== 'number') {
			throw new Error('Input is not a valid number');
		}

		// Use toLocaleString to format the number with commas
		return price.toLocaleString(undefined, { minimumFractionDigits: 2 });
	}
	return (
		<main className='grid grid-cols-10 h-screen overscroll-auto'>
			<section className='col-span-2 h-screen '>
				<Sidebar />
			</section>
			<article className='col-span-8 px-8 py-12 block w-full h-screen overflow-auto'>
				<div className='w-full h-[400px]  relative'>
					<Image layout='fill' objectFit='cover' data-testid='movie-poster' src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt={movie?.title} className='w-full rounded-xl' priority />
				</div>
				<section>
					<div className='flex justify-between mb-12'>
						<div className='flex flex-wrap font-semibold gap-3 items-center text-base mt-4 text-[#404040]'>
							<h1 data-testid='movie-title' className='m-0 text-2xl font-bold'>
								{movie?.title}
							</h1>
							.<p data-testid='movie-release-date'>{new Date(movie?.release_date).getFullYear()}</p>.<p>PG-{movie?.adult ? '18' : '13'}</p>.
							<p data-testid='movie-runtime'>
								{Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
							</p>
							<ul className='flex items-center gap-2 text-[#B91C1C] text-[15px] font-[500]'>
								{movie?.genres?.map((genre) => (
									<li className='shadow-lg border border-[#F8E7EB]  px-4 flex items-center justify-center rounded-xl' key={genre.id}>
										{genre?.name}
									</li>
								))}
							</ul>
						</div>
						<div className=' flex items-center w-fit gap-1'>
							<section className='flex gap-4'>
								<Image src='/assets/images/star.svg' alt='Star' width={10} height={10} layout='intrisic' className='w-auto h-6' />
							</section>
							<section className='flex'>{movie?.vote_average?.toFixed(1)}</section>
							<section className='flex gap-2 ml-1 items-center'>
								<span>|</span>
								<span>{movie?.vote_count}</span>
							</section>
						</div>
					</div>
					<section className='grid grid-cols-3 gap-6'>
						<article className='col-span-2 flex flex-col gap-3'>
							<div className='flex  gap-4'>
								<p data-testid='movie-overview' className='text-[#333333] text-lg font-semibold'>
									{movie?.overview}
								</p>
							</div>
							<div className='flex  gap-4'>
								<p className='font-semibold text-base'>Revenue :</p>
								<p data-testid='movie-overview' className='text-[#B91C1C] text-lg font-semibold'>
									${formatPrice(movie?.revenue)}
								</p>
							</div>
							<div className='flex  gap-4'>
								<p className='font-semibold text-base'>Spoken Languages :</p>
								<ul data-testid='movie-overview' className='flex items-center gap-2 text-[#B91C1C] text-[15px] font-[500]'>
									{movie?.spoken_languages.map((lang) => (
										<p className='shadow-lg border border-[#F8E7EB]  px-4 flex items-center justify-center rounded-lg' key={lang.id}>
											{lang?.english_name}
										</p>
									))}
								</ul>
							</div>
							<div className='flex  gap-4'>
								<p className='font-semibold text-base'>Tag line :</p>
								<p data-testid='movie-overview' className='text-[#B91C1C] text-lg font-semibold'>
									{movie?.tagline}
								</p>
							</div>
						</article>
						<article className='col-span-1'>
							<div className='flex flex-col gap-2'>
								<button className='bg-[#BE123C] py-2 px-4  gap-2 rounded-xl text-white flex justify-center items-center'>
									<Image src='/assets/images/Two Tickets.svg' alt='Star' width={10} height={10} layout='intrisic' className='w-auto ' />
									See Showtimes
								</button>
								<button className='bg-[#BE123C1A]/10 py-2 px-2 gap-4 rounded-xl border border-[#BE123C] text-[#333333]  flex justify-center items-center'>
									<Image src='/assets/images/List.svg' alt='Star' width={10} height={10} layout='intrisic' className='w-auto ' />
									More watch options
								</button>
							</div>

							<section className='flex gap-4 mt-8'>
								<Image src='/assets/images/Group.svg' alt='Star' width={10} height={10} layout='intrisic' className='w-auto ' />
							</section>
						</article>
					</section>
				</section>
			</article>
		</main>
	);
};

export default Index;
