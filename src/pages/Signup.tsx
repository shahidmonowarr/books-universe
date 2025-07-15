import { Link } from "react-router-dom";
import logo from "../assets/images/books-logo-white-bg.png";
import { SignupForm } from "../components/SignUpForm";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";
import {
  FiUserPlus,
  FiBookOpen,
  FiHeart,
  FiMessageCircle,
  FiTrendingUp,
} from "react-icons/fi";

export default function Signup() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 p-4 md:p-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img className="h-8" src={logo} alt="Logo" />
            </Link>
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-gray-600 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm"
                )}
              >
                Home
              </Link>
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "bg-white/90 backdrop-blur-sm hover:bg-white"
                )}
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex min-h-screen">
          {/* Left Panel - Hero Section */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
              }}
            />
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center p-12 text-white">
              <div className="max-w-md">
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  Join Our Reading Community
                </h2>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Create your account and start building your personal library
                  today.
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <FiBookOpen className="text-white text-lg" />
                    </div>
                    <span className="text-gray-200">
                      Track your reading progress
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <FiHeart className="text-white text-lg" />
                    </div>
                    <span className="text-gray-200">Create your wishlist</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <FiMessageCircle className="text-white text-lg" />
                    </div>
                    <span className="text-gray-200">
                      Share reviews and recommendations
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <FiTrendingUp className="text-white text-lg" />
                    </div>
                    <span className="text-gray-200">
                      Discover trending books
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Signup Form */}
          <div className="flex-1 flex items-center justify-center p-8 lg:w-1/2">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-8">
                <Link to="/" className="flex items-center space-x-2">
                  <img className="h-10" src={logo} alt="Logo" />
                </Link>
              </div>

              {/* Signup Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <FiUserPlus className="text-green-600 text-2xl" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Create your account
                  </h1>
                  <p className="text-gray-600">
                    Join thousands of readers and start your journey
                  </p>
                </div>

                <SignupForm />

                {/* Divider */}
                <div className="mt-8 flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500">or</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Sign in instead
                    </Link>
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Benefits Banner */}
              <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiBookOpen className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Free to join</h3>
                    <p className="text-sm text-blue-700">
                      Start exploring our vast collection immediately
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
