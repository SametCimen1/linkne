import React from 'react'

const ErrorPage = () => {
  return (
    <section className="flex items-center h-screen py-16">
	<div className="container  flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl mb-8  font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<a rel="noopener noreferrer" href="/" className="px-8 py-3 mt-4 font-semibold rounded btn btn-ghost border-2 border-blue-500">Return to home page</a>
		</div>
	</div>
</section>
  )
}

export default ErrorPage