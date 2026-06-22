import React from 'react';
import Link from 'next/link'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center dark:bg-gray-900 dark:text-white">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        This page does not exist
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

export default NotFound;