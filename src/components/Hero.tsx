export default function Hero() {
  return (
    <section className="relative min-h-fit bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/5 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-fit py-16">
          
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Animated Tag */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-cyan-100 dark:border-cyan-800">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                📚 Discover Your Next Great Read
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-none">
                Book
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  Universe
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-light">
                Where stories come alive and imagination has no limits
              </p>
            </div>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-600 dark:text-cyan-400 text-xl">📖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Vast Library</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">10,000+ Books</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Instant Access</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Read Anywhere</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/books"
                className="group relative overflow-hidden bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Books
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a 
                href="/add-new-book"
                className="group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Book
                </span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">⭐ Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-300 dark:border-cyan-600 animate-spin" style={{animationDuration: '12s'}}></div>
              
              {/* Image */}
              <div className="relative bg-white dark:bg-gray-800 rounded-full p-8 shadow-2xl">
                <div className="w-full h-96 sm:h-[500px] lg:h-[600px] rounded-full overflow-hidden">
                  <img
                    src="https://i.ibb.co/WPyVwqF/hero.jpg"
                    alt="Book Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-xl">📚</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">New Release</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Just Added</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">🔥</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Trending</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Most Popular</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-xl flex items-center justify-center">
                    <span className="text-cyan-600 dark:text-cyan-400 text-xl">⭐</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Best Rated</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">5.0 Stars</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}