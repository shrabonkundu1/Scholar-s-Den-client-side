import React from 'react';

const ErrorElement = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-xl mt-2">Oops! The page you are looking for does not exist.</p>
        <p className="text-gray-600 mt-1">It might have been moved or deleted.</p>
        <a href="/" className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Go Home
        </a>
      </div>
    );
};

export default ErrorElement;