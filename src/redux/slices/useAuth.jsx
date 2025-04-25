import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUserToken } from "./authSlice"; // Action này dùng để refresh token

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra xem cookie có chứa refreshToken hay không (cookie này sẽ giúp làm mới accessToken)
    const refreshToken = document.cookie.split("; ").find(row => row.startsWith("refreshToken="));

    if (refreshToken) {
      // Gọi API để làm mới accessToken bằng refreshToken
      dispatch(refreshUserToken());
    }
  }, [dispatch]);
};

export default useAuth;
