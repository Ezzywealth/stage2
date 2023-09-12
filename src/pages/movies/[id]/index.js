import { fetchMovie } from '@/Redux/movieSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import { ColorRing } from 'react-loader-spinner';
import DetailsNav from '@/components/DetailsNav';
const Index = () => {
	const { movieLoading, movieError, movie } = useSelector((state) => state.movies);
	const dispatch = useDispatch();
	const router = useRouter();
	const { id } = router.query;
	useEffect(() => {
		dispatch(fetchMovie(id));
	}, [id]);
	console.log(movie);

	function formatPrice(price) {
		// Check if the input is a valid number
		if (typeof price !== 'number') {
			return;
		}
		return price.toLocaleString(undefined, { minimumFractionDigits: 2 });
	}

	return (
		<main className='grid md:grid-cols-7 lg:grid-cols-10 h-screen overscroll-auto box-border'>
			<section className='hidden md:flex col-span-2 h-screen z-[10000000] '>
				<Sidebar />
			</section>
			{movieLoading ? (
				<section className='md:col-span-5 lg:col-span-8 w-full h-screen flex justify-center items-center'>
					<ColorRing visible={true} height='80' width='80' ariaLabel='blocks-loading' wrapperStyle={{}} wrapperClass='blocks-wrapper' colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
				</section>
			) : (
				<>
					{movieError ? (
						<section className='bg-gray-50 w-full md:col-span-5 lg:col-span-8 h-screen flex justify-center items-center'>
							<h1 className='text-red-500 text-2xl font-bold'>{movieError}</h1>
						</section>
					) : (
						<article className='md:col-span-5 lg:col-span-8 z-[1000] px-4 md:px-8 py-20 md:py-12 block w-full h-screen overflow-auto'>
							<section className='fixed top-0 md:hidden mb-8'>
								<DetailsNav />
							</section>
							<div className='w-full h-[400px]  relative flex-wrap'>
								<Image layout='fill' objectFit='cover' data-testid='movie-poster' src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt={movie?.title} className='w-full rounded-xl z-[10]' priority />
							</div>
							<section>
								<div className='flex justify-between mb-12'>
									<div className='flex flex-wrap font-semibold gap-3 items-center text-base mt-4 text-[#404040]'>
										<h1 data-testid='movie-title' className='m-0 text-2xl w-auto font-bold'>
											{movie?.title}
										</h1>
										.<p data-testid='movie-release-date'>{new Date(movie?.release_date).getFullYear()}</p>.<p>PG-{movie?.adult ? '18' : '13'}</p>.
										<p data-testid='movie-runtime'>
											{Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
										</p>
										<ul className='flex items-center gap-2 text-[#B91C1C] w-full md:w-auto flex-wrap text-[15px] font-[500]'>
											{movie?.genres?.map((genre) => (
												<li className='shadow-lg border border-[#F8E7EB]  px-4 flex items-center justify-center rounded-xl' key={genre.id}>
													{genre?.name}
												</li>
											))}
										</ul>
									</div>
									<div className=' flex items-start pt-4  w-fit gap-1'>
										<section className='flex w-6 h-6 gap-4'>
											<Image src='/assets/images/star.svg' alt='Star' width={10} height={10} layout='intrisic' className='w-6 h-6' />
										</section>
										<section className='flex'>{movie?.vote_average?.toFixed(1)}</section>
										<section className='flex gap-2 ml-1 items-center'>
											<span>|</span>
											<span>{movie?.vote_count}</span>
										</section>
									</div>
								</div>
								<section className='grid md:grid-cols-3 gap-6'>
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
												{movie?.spoken_languages?.map((lang) => (
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
					)}
				</>
			)}
		</main>
	);
};

export default Index;
