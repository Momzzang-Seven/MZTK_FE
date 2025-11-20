import { headerByPath } from "@constant";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const currentHeader = headerByPath.find((part) => part.path === path);

  return (
    <div className="z-[998] w-full fixed max-w-[420px] rounded-b-[20px] bg-white top-0 flex flex-row justify-between items-center h-[72px] px-[20px] py-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.05)]">
      <div className="text-[32px] text-main font-bold">
        {currentHeader?.label ?? ""}
      </div>
    </div>
  );
};

export default Header;
