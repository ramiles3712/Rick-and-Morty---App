import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-green-500 mb-4">404</h1>
      <p className="text-2xl text-gray-300 mb-8">Wubba Lubba Dub Dub! Page not found.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
