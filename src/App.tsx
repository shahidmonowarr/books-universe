/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "@fortawesome/fontawesome-free/css/all.css";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/MainLayout";
import { loginState } from "./redux/features/auth/authSlice";
import { useAppDispatch } from "./redux/hook";

function App() {
  const dispatch = useAppDispatch();

  const userToken = localStorage.getItem("token");
  const parsedToken = userToken ? JSON.parse(userToken!) : null;

  // check token expiration
  if (parsedToken) {
    const decodedToken = jwtDecode(parsedToken) as { exp: number };
    if (decodedToken.exp * 1000 < Date.now() / 1000) {
      localStorage.removeItem("token");
    }
  }

  // set token into state for header request
  if (userToken) {
    dispatch(loginState({ accessToken: parsedToken }));
  }
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={1000} />
      <MainLayout />
    </div>
  );
}

export default App;
