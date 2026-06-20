import React from 'react';
import Link from 'next/link'

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">About App</h1>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Author: AnnStarrySky</h2>
      
      <p className="text-gray-600 mb-6 max-w-md">
        This application is built as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-600 underline font-medium"
        >
          RS School React Course
        </a>
      </p>

      <Link 
        href="/" 
        className="px-6 py-3 bg-blue-500 text-white font-medium rounded shadow hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default About;