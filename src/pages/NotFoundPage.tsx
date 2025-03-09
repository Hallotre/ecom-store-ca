import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="max-w-md p-10 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h1 className="mb-4 font-medium text-7xl text-primary">404</h1>
        <h2 className="mb-6 text-2xl font-medium text-gray-900">
          Page Not Found
        </h2>
        <p className="max-w-sm mx-auto mb-8 text-base text-gray-500">
          We couldn't find the page you're looking for. It might have been moved
          or doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 text-sm font-medium transition-all duration-300 border rounded-lg text-primary border-primary hover:bg-primary"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
