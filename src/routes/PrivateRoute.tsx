import { setMe, type MeState } from "@/features/user/meSlice";
import { useGetMeQuery } from "@/services/auth";
import { sk } from "date-fns/locale";
import { useEffect, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }: { children: JSX.Element}) => {
  const isLoggedIn = useSelector((state: MeState) => state.isLogin);
  const token = localStorage.getItem("access_token");

  const shouldSkip = isLoggedIn;
  const { data, isLoading, isError } = useGetMeQuery(undefined, {skip: shouldSkip});
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !isLoggedIn) {
      dispatch(setMe(data));
    }
  }, [data, isLoggedIn, dispatch]);

  if (isLoading && !isLoggedIn) return <div></div>;

  if (isError && !isLoggedIn) {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  if (!isLoggedIn && !token) return <Navigate to="/login" replace />;

  return children;
};