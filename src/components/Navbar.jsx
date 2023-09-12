import { searchMovies } from '@/Redux/movieSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai';
import Form from './Form';

const Navbar = () => {
	const [height, setHeight] = useState(0);
	const [openForm, setOpenForm] = useState(false);

	// an effect to cal windows scroll height
	useEffect(() => {
		const handleScroll = () => {
			setHeight(window.scrollY);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [height]);

	console.log(openForm);
	return (
		<nav className={`px-4 md:px-8 py-3 z-[100000] shadow-lg transition-all duration-300 ease-in-out fixed top-0 left-0 w-full ${height >= 150 ? 'bg-white' : 'bg-none'}`}>
			<section className='relative'>
				<div className='container mx-auto flex justify-between items-center'>
					<div className='text-white text-2xl font-bold'>
						<Link href='/'>
							<div className='md:p-4 text-xl flex items-center gap-3 font-bold'>
								<Image src='/assets/images/logo.svg' layout='intrisic' height={30} width={30} />
								<h1 className={`${height >= 150 ? 'text-[#333]' : 'text-white'} text-[24px] font-bold`}>Zik Movies</h1>
							</div>
						</Link>
					</div>
					<div className='md:flex space-x-4 hidden  rounded-lg'>
						<div className='relative  rounded-lg'>
							<Form />
							<div className='absolute inset-y-0 right-0 flex items-center pr-3'>{/* Search icon (optional) */}</div>
						</div>
					</div>

					<div className={`${height >= 150 ? 'text-[#333]' : 'text-white'}`}>
						<Link href='/signin' className='font-semibold hidden md:flex'>
							Sign In
						</Link>
						<button type='button' className='flex md:hidden'>
							{openForm ? <AiOutlineClose size={35} onClick={(prev) => setOpenForm(!prev)} /> : <AiOutlineMenuUnfold size={35} onClick={(prev) => setOpenForm(!prev)} />}
						</button>
					</div>
				</div>
				{openForm && (
					<section className='absolute left-0 w-[350px] flex justify-center '>
						<Form />
					</section>
				)}
			</section>
		</nav>
	);
};

export default Navbar;
