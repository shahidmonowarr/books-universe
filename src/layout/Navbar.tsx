import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/images/books-logo.png";
import ReadList from "../components/ReadList";
import WishList from "../components/WishList";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { logoutState } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function Navbar() {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutState());
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="fixed z-50 w-full top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex-shrink-0">
              <img className="h-10 w-auto" src={logo} alt="logo" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <ul className="flex items-center space-x-1">
              <li>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Home
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    to="/books"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    All Books
                  </Link>
                </Button>
              </li>
              {token && (
                <li>
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      to="/add-new-book"
                      className="text-gray-700 hover:text-gray-900 font-medium"
                    >
                      Add New
                    </Link>
                  </Button>
                </li>
              )}
            </ul>
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {token && (
              <>
                <ReadList />
                <WishList />
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none ring-2 ring-transparent hover:ring-gray-200 transition-all rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png" />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                    SM
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg w-48 mr-4">
                {!token ? (
                  <>
                    <Link to="/login">
                      <DropdownMenuItem className="cursor-pointer text-gray-700 hover:bg-gray-50 font-medium">
                        Sign In
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/signup">
                      <DropdownMenuItem className="cursor-pointer text-gray-700 hover:bg-gray-50 font-medium">
                        Sign Up
                      </DropdownMenuItem>
                    </Link>
                  </>
                ) : (
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 hover:bg-red-50 font-medium"
                  >
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              {showMenu ? (
                <MdClose className="w-6 h-6" />
              ) : (
                <MdMenu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-2">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="justify-start"
              >
                <Link
                  to="/"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Home
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="justify-start"
              >
                <Link
                  to="/books"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  All Books
                </Link>
              </Button>
              {token && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="justify-start"
                >
                  <Link
                    to="/add-new-book"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Add New
                  </Link>
                </Button>
              )}
            </div>

            {token && (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                <ReadList />
                <WishList />
              </div>
            )}

            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png" />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold text-sm">
                    SM
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col space-y-2">
                {!token ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="justify-start"
                    >
                      <Link
                        to="/login"
                        className="text-gray-700 hover:text-gray-900 font-medium"
                      >
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="justify-start"
                    >
                      <Link
                        to="/signup"
                        className="text-gray-700 hover:text-gray-900 font-medium"
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
