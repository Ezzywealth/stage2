import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai';
import Form from './Form';

const DetailsNav = () => {
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

	return (
		<nav className={`px-4 md:px-8 py-3 z-[99999999] shadow-md transition-all duration-300 ease-in-out fixed top-0 left-0 w-full ${height >= 150 ? 'bg-white' : 'bg-[#333]'}`}>
			<section className='relative'>
				<div className='container mx-auto flex justify-center items-center'>
					<div className='text-white text-center text-2xl font-bold'>
						<Link href='/'>
							<div className='md:p-4 text-xl flex items-center gap-3 font-bold'>
								<Image src='/assets/images/logo.svg' layout='intrisic' height={30} width={30} />
								<h1 className={`${height >= 150 ? 'text-[#333]' : 'text-white'} text-[24px] font-bold`}>Zik Movies</h1>
							</div>
						</Link>
					</div>
				</div>
			</section>
		</nav>
	);
};

export default DetailsNav;
