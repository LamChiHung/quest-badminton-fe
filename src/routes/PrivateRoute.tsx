// routes/PrivateRoute.tsx
import { useEffect, type JSX } from "react";
import { useGetMeQuery } from "@/services/auth";
import { setMe } from "@/features/user/meSlice";
import type { RootState } from "@/app/store";
import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hook";

export const PrivateRoute = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("access_token");

  const isLogin = useAppSelector((state: RootState) => state.me.isLogin);
  const { data, isLoading, isError } = useGetMeQuery(undefined);

  useEffect(() => {
    if (data && !isLogin) {
      dispatch(setMe(data));
    }
  }, [data, isLogin, dispatch]);

  // ❌ Không có token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ⏳ Đang verify token
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ❌ Token lỗi hoặc chưa login
  if (isError) {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  if (!isLoading) {
    if (!data) {
      localStorage.removeItem("access_token");
      return <Navigate to="/login" replace />;
    }
    if (data.roles === "ROLE_HOST") {
      return <Navigate to="/host/tour-management" replace />;
    }
  }

  return <Outlet />
};
