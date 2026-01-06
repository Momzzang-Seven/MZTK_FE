import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import { headerByPath } from "@constant";

export const SimpleHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const currentHeader = headerByPath.find((part) => part.path === path);

    return (
        <header className="flex items-center justify-between px-6 py-6 border-b border-gray-400">
            <img
                src="/icon/backArrow.svg"
                className="cursor-pointer w-5 h-4"
                onClick={() => navigate(-1)} />
            <h1 className="font-semibold text-lg">
                {currentHeader?.label ?? ""}
            </h1>
            <div className="w-5 h-4"></div>
      </header>
    )
}