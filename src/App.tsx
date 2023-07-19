/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwtDecode from "jwt-decode";
import { Toaster } from "./components/ui/Toaster";
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
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
