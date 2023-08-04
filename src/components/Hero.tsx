export default function Hero() {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100 container">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-14 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src="https://i.ibb.co/WPyVwqF/hero.jpg"
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 mt-5"
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold sm:text-6xl">
            Book Universe <br />
            <span className="dark:text-cyan-400 text-cyan-500">
              A Collections
            </span>{" "}
            of Wondrous Books
          </h1>
          <p className="mt-3 mb-3 px-1 sm:mb-5 text-sm">
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
              Interested
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100 hover:bg-black hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
