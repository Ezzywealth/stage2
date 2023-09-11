import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='bg-blue-500 p-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='text-white text-2xl font-bold'>
					<Link href='/'>Logo</Link>
				</div>

				<div className='md:flex space-x-4 hidden'>
					<div className='relative'>
						<input type='text' placeholder='Search' className='px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300' />
						<div className='absolute inset-y-0 right-0 flex items-center pr-3'>{/* Search icon (optional) */}</div>
					</div>
					<Link href='/signin' className='text-white'>
						Sign In
					</Link>
				</div>

				<div className='md:hidden'>
					<button id='mobile-menu-button' className='text-white'>
						{/* Hamburger icon */}
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
