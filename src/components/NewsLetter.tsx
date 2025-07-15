import { useState } from "react";

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail("");
  };

  return (
    <section className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative p-8 sm:p-12 lg:p-16">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12"></div>

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full px-4 py-2">
                  <span className="text-cyan-600 dark:text-cyan-400 text-xl">
                    📧
                  </span>
                  <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                    Stay Updated
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    Never Miss a
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                      Great Story
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Get notified about new book releases, exclusive content, and
                    special offers. Join our community of book lovers today.
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Weekly updates
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      No spam ever
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Exclusive content
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Unsubscribe anytime
                    </span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribed ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Subscribed!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Subscribe to Newsletter
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                  By subscribing, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
