import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="container">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-14 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center sm:p-3 mt-8 lg:mt-0 h-72 sm:h-100 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src="https://i.ibb.co/WPyVwqF/hero.jpg"
            alt=""
            className="object-contain mt-5 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
        <div className="flex flex-col justify-center text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="sm:text-5xl md:text-5xl lg:text-6xl   font-bold">
            Book Universe <br />
            <span className="dark:text-cyan-400 text-cyan-500">
              A Collections
            </span>{" "}
            of Wondrous Books
          </h1>
          <p className="px-1 mt-3 mb-3 text-sm sm:mb-5">
            So many books, so little time. A room without books is like a body
            without a soul.
            <br className="hidden md:inline lg:hidden" /> Choose your favorite
            book and start reading.
          </p>
          <div className="flex flex-col px-1 space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold rounded dark:bg-cyan-400 dark:text-gray-900 bg-cyan-400 hover:bg-cyan-600 hover:text-gray-100 dark:hover:bg-cyan-600 dark:hover:text-gray-100"
            >
              <Link to="/books">Browse</Link>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100 hover:bg-black hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
            >
              <Link to="/add-new-book">Add New</Link>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
