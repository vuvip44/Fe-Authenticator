import axiosInstance from "../api/axiosInstance";

/**
 * @param {string} endpoint - Đường dẫn API để kiểm tra quyền
 * @param {function} navigate - Hàm điều hướng (useNavigate)
 * @param {string} successPath - Đường dẫn cần chuyển đến khi có quyền
 * @param {string} fallbackMessage - Thông báo khi không có quyền
 */
export const checkAccessAndNavigate = async ({
  endpoint,
  navigate,
  successPath,
  fallbackMessage = "Bạn không có quyền truy cập.",
}) => {
  try {
    const res = await axiosInstance.get(endpoint);
    alert(res.data.message || "Truy cập thành công.");
    navigate(successPath);
  } catch (error) {
    console.error("Access denied:", error);
    alert(fallbackMessage);
  }
};
