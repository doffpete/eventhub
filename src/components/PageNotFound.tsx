import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col gap-3 md:p-24 text-center bg-white min-h-[100vh] justify-center ">
      <div className="w-full flex flex-col md:items-start md:w-4/5 min-h-[70vh] justify-center gap-8">
        <p className="text-sm text-indigo-500 font-medium">Page Not Found</p>
        <h1 className="text-black font-bold text-3xl">
          We can't find the page
        </h1>
        <p className="text-black font-normal text-sm">
          Sorry, the page you’re looking for doesn’t exist or has been removed.
        </p>
        <Link to="/">
          <button className="bg-indigo-600 text-white px-4 py-4 hover:bg-indigo-800 rounded cursor-pointer font-medium text-sm text-center">
            Go back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
