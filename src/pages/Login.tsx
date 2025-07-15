import { Link } from "react-router-dom";
import logo from "../assets/images/books-logo-white-bg.png";
import { LoginForm } from "../components/LoginForm";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";
import { FiBook, FiBookOpen, FiUsers, FiStar } from "react-icons/fi";

export default function Login() {
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
                to="/signup"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "bg-white/90 backdrop-blur-sm hover:bg-white"
                )}
              >
                Sign Up
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
                  Welcome to Your Literary Journey
                </h2>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Discover, review, and share your favorite books with a
                  community of passionate readers.
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <FiBook className="text-white text-lg" />
                    </div>
                    <span className="text-gray-200">
                      Extensive book collection
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <FiStar className="text-white text-lg" />
                    </div>
                    <span className="text-gray-200">Rate and review books</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <FiUsers className="text-white text-lg" />
                    </div>
                    <span className="text-gray-200">Connect with readers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="flex-1 flex items-center justify-center p-8 lg:w-1/2">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-8">
                <Link to="/" className="flex items-center space-x-2">
                  <img className="h-10" src={logo} alt="Logo" />
                </Link>
              </div>

              {/* Login Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <FiBookOpen className="text-blue-600 text-2xl" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back
                  </h1>
                  <p className="text-gray-600">
                    Sign in to continue your reading journey
                  </p>
                </div>

                <LoginForm />

                {/* Divider */}
                <div className="mt-8 flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500">or</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our{" "}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
