import React, { useState } from 'react';
import Link from 'next/link'; // Use appropriate routing library
import { RiMovie2Fill, RiHomeFill, RiTvFill, RiCalendar2Fill } from 'react-icons/ri';
import Image from 'next/image';
import { MdOutlineLogout } from 'react-icons/md';
const navLinks = [
	{
		id: 1,
		name: 'Home',
		path: '/',
		icon: '/assets/images/home.svg',
	},
	{
		id: 2,
		name: 'Movies',
		path: '',
		icon: '/assets/images/Movie.svg',
	},
	{
		id: 3,
		name: 'TV Series',
		path: '',
		icon: '/assets/images/TV.svg',
	},
	{
		id: 4,
		name: 'Upcoming',
		path: '',
		icon: '/assets/images/Calendar.svg',
	},
];
const Sidebar = () => {
	const [active, setActive] = useState(2);

	const handleNavClick = (id) => {
		setActive(id);
	};
	return (
		<aside className='bg-white text-[#666666] flex-1 min-w-64 flex flex-col items-center h-screen rounded-tr-[45px]  rounded-br-[45px] border-[rgba(0, 0, 0, 0.30)] border-r'>
			<div className='p-4 text-xl flex items-center gap-3 font-bold'>
				<Image src='/assets/images/logo.svg' layout='intrisic' height={50} width={50} />
				<h1 className='text-[#333333] text-[24px] font-bold'>Zik Movies</h1>
			</div>
			<ul className='flex-grow mt-12 w-full '>
				{navLinks.map((link) => (
					<Link href={link?.path}>
						<li onClick={() => handleNavClick(link.id)} key={link.id} className={`transition-all ease-in-out duration-300 p-[25px] text-xl cursor-pointer flex items-center gap-[15px] font-semibold  hover:bg-[rgba(190, 18, 60, 0.10)] ${active === link.id ? 'bg-[#BE123C1A]/10 text-[#BE123C]' : 'text-[#666666]'}`}>
							<Image src={link.icon} layout='intrisic' height={25} width={25} />
							{link.name}
						</li>
					</Link>
				))}
			</ul>
			<section className='bg-[#F8E7EB66]/40 rounded-[20px] pt-[42px] p-5 flex justify-center flex-col items-center gap-2 mx-[28px]'>
				<p className='text-[#333333CC]/80 font-semibold text-base'>Play movie quizes and earn free tickets</p>
				<p className='text-[#666666] text-sm font-[500]'>50k people are playing now</p>
				<button className='text-[#BE123C] font-[500] text-sm p-2 flex w-[80%] justify-center items-center  bg-[#BE123C33]/20 rounded-[30px]'>Start playing</button>
			</section>
			<div className='p-4 mb-4 mt-auto w-full flex justify-center'>
				<button className=' text-[#666666] px-4 py-2 text-[20px] flex items-center gap-[12px] rounded-full w-full'>
					<MdOutlineLogout size={25} />
					Logout
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
