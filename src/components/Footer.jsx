import React from 'react';

const Footer = () => {
	return (
		<footer className='bg-white text-white py-4'>
			<div className='container mx-auto flex gap-4 flex-col justify-center '>
				<div className='space-x-4 flex w-full justify-center gap-4 '>
					<a href='#' className='text-gray-300 hover:text-white'>
						<img src='/assets/images/fb.png' alt='facebook' className='w-6 h-6' />
					</a>
					<a href='#' className='text-gray-300 hover:text-white'>
						<img src='/assets/images/twit.svg' alt='twitter' className='w-6 h-6' />
					</a>
					<a href='#' className='text-gray-300 hover:text-white'>
						<img src='/assets/images/ig.svg' alt='instagram' className='w-6 h-6' />
					</a>
					<a href='#' className='text-gray-300 hover:text-white'>
						<img src='/assets/images/yt.svg' alt='youtube' className='w-6 h-6' />
					</a>
				</div>
				<div className='flex flex-col md:flex-row gap:3 items-center md:gap-8 text-[#111827] font-bold text-lg justify-center'>
					<p>Conditions of Use</p>
					<p>Privacy & Policy</p>
					<p>Press Room</p>
				</div>
				<div className='flex mb-8 text-[#6B7280] font-bold text-lg justify-center'>&copy; {new Date().getFullYear()} Ziks Movies by Ezzywealth</div>
			</div>
		</footer>
	);
};

export default Footer;
