import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-6xl font-extrabold text-gray-300 dark:text-gray-700">
                404
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Page not found.
            </p>
            <Link
                to="/"
                className="mt-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
            >
                &larr; Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
