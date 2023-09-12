import React from 'react';

const ErrorPage = ({ statusCode }) => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold mb-4'>Error {statusCode}</h1>
			<p className='text-lg text-gray-600'>Oops! Something went wrong.</p>
		</div>
	);
};

export default ErrorPage;
