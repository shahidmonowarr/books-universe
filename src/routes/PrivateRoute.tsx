import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { token } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!token) {
    return <Navigate to={"/login"} state={{ path: pathname }} />;
  }
  return children;
}
