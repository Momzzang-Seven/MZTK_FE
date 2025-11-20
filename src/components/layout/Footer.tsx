import { footerItem } from "@constant";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="z-[998] w-full fixed max-w-[420px] rounded-t-[20px] bg-white bottom-0 flex flex-row justify-between items-center h-[82px] px-[20px] py-[10px] shadow-[0_-4px_8px_rgba(0,0,0,0.05)]">
      {/* footer item map */}
      <div className="w-full grid grid-cols-4 col-span-4">
        {footerItem.map((item) => {
          const path = location.pathname;
          const isActive = path === item.path;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={isActive ? item.activeSrc : item.src}
                alt={item.label}
                width="32px"
                height="32px"
              />
              <div
                className={`${
                  isActive ? "text-main body-bold" : "text-grey-main body"
                }`}
              >
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
