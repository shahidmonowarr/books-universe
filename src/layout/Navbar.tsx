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
    console.log("logout");
    localStorage.removeItem("token");
    dispatch(logoutState());
  };

  return (
    <nav className="fixed z-10 w-full h-16 top backdrop-blur-lg">
      <div className="w-full h-full bg-white/60">
        <div className="flex items-center justify-between w-full h-full mx-auto md:max-w-7xl ">
          <div>
            <img className="h-9" src={logo} alt="log" />
          </div>
          <div>
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
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/contact">Contact</Link>
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
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {!token && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
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
    </nav>
  );
}
