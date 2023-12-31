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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { logoutState } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function Navbar() {
  const { token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutState());
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="fixed z-10 w-full h-16 top backdrop-blur-lg">
      <div className="w-full h-full bg-white/60">
        <div className="flex items-center justify-between w-full h-full mx-auto md:max-w-7xl">
          <div>
            <img className="h-9" src={logo} alt="logo" />
          </div>
          <div className="md:hidden">
            {showMenu ? (
              <MdClose
                className="w-8 h-8 cursor-pointer"
                onClick={toggleMenu}
              />
            ) : (
              <MdMenu className="w-8 h-8 cursor-pointer" onClick={toggleMenu} />
            )}
          </div>
          <div
            className={`${
              showMenu ? "hidden" : "hidden"
            } md:flex md:items-center`}
          >
            <ul className="flex items-center">
              {!token && (
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/">Home</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/books">All Books</Link>
                    </Button>
                  </li>
                </>
              )}
              {token && (
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/">Home</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/books">All Books</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/add-new-book">Add New</Link>
                    </Button>
                  </li>
                  <li>
                    <ReadList />
                  </li>
                  <li>
                    <WishList />
                  </li>
                </>
              )}

              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {!token && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Sign In
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            Sign Up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {token && (
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden w-full sm:me-2 bg-white/95">
          <ul className="flex flex-col items-center justify-center space-y-4">
            {!token && (
              <>
                <li>
                  <Button variant="link" asChild>
                    <Link to="/">Home</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="link" asChild>
                    <Link to="/books">All Books</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="link" asChild>
                    <Link to="/add-new-book">Add New</Link>
                  </Button>
                </li>
              </>
            )}
            {token && (
              <>
                <li>
                  <Button variant="link" asChild>
                    <Link to="/">Home</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="link" asChild>
                    <Link to="/books">All Books</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="link" asChild>
                    <Link to="/add-new-book">Add New</Link>
                  </Button>
                </li>
                <li>
                  <ReadList />
                </li>
                <li>
                  <WishList />
                </li>
              </>
            )}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar>
                    <AvatarImage src="https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!token && (
                    <>
                      <Link to="/login">
                        <DropdownMenuItem className="cursor-pointer">
                          Sign In
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/signup">
                        <DropdownMenuItem className="cursor-pointer">
                          Sign Up
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  {token && (
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
