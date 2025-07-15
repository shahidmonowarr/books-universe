export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  const socialLinks = [
    { name: "Twitter", icon: "🐦", href: "#", color: "bg-blue-500" },
    { name: "Facebook", icon: "📘", href: "#", color: "bg-blue-600" },
    { name: "Instagram", icon: "📷", href: "#", color: "bg-pink-500" },
    { name: "GitHub", icon: "🐙", href: "#", color: "bg-gray-800" },
  ];

  const usefulLinks = [
    { name: "About Us", href: "#" },
    { name: "Blog", href: "#" },
    { name: "GitHub", href: "https://github.com/shahidmonowarr" },
    { name: "Free Books", href: "#" },
  ];

  const otherResources = [
    { name: "License", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-bold text-white">
                  Book Universe
                </h3>
                <p className="text-lg text-gray-400 max-w-md">
                  Connecting readers with amazing stories from around the world.
                  Join our community and discover your next favorite book.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Follow Us</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl`}
                    >
                      <span className="text-xl">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Stay Connected
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  Get the latest updates and book recommendations delivered to
                  your inbox.
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors duration-200">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">
                  Useful Links
                </h4>
                <ul className="space-y-3">
                  {usefulLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-cyan-400 rounded-full group-hover:w-2 transition-all duration-200"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Resources</h4>
                <ul className="space-y-3">
                  {otherResources.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-200"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {year} Book Universe. All rights reserved.
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Built with ❤️ by</span>
                <a
                  href="https://github.com/shahidmonowarr"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shahid Monowar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
