// routes/PrivateRoute.tsx
import { useEffect, type JSX } from "react";
import { useGetMeQuery } from "@/services/auth";
import { setMe } from "@/features/user/meSlice";
import type { RootState } from "@/app/store";
import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hook";

export const PrivateRoute = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state: RootState) => state.me.isLogin);
  const { data, isLoading, isError } = useGetMeQuery(undefined);

  useEffect(() => {
    if (data && !isLogin) {
      dispatch(setMe(data));
    }
  }, [data, isLogin, dispatch]);

  return isLoading ? <></> : (data?.roles === 'ROLE_USER' ? <Outlet /> : <Navigate to="/host/tour-management" replace />);
};
