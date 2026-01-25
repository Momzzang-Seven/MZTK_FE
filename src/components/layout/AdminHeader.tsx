import { adminHeaderByPath } from "@constant";
import { useLocation } from "react-router-dom";

export const AdminHeader = () => {
  const location = useLocation();

  const currentHeader = adminHeaderByPath.find(
    (item) => item.path === location.pathname
  );

  return (
    <header className="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-10 w-full">
      <h2 className="text-2xl font-bold text-gray-800">
        {currentHeader ? currentHeader.label : "대시보드"}
      </h2>

      <button
        onClick={() => {}}
        className="text-gray-400 hover:text-gray-800 transition-colors font-medium"
      >
        로그아웃
      </button>
    </header>
  );
};
