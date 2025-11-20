import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useAuthModalStore } from "@store";
import { CommonModal } from "@components/common";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { unauthorized, setUnauthorized } = useAuthModalStore();
  const hideLayoutPages = ["/login"];
  const shouldHideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <div className="bg-white w-full max-w-[420px] min-h-screen mx-auto flex flex-col items-center">
      {!shouldHideLayout && <Header />}
      <div
        className={`w-full flex flex-col flex-1 overflow-y-auto ${
          !shouldHideLayout ? "pb-[52px]" : ""
        }`}
      >
        {children}

        {unauthorized && (
          <CommonModal
            title="로그인이 필요해요"
            desc="  서비스를 이용하시려면 로그인이 필요해요. <br /> 로그인 페이지로 이동할까요?"
            confirmLabel="로그인 페이지로 이동"
            onConfirmClick={() => {
              setUnauthorized(false);
              navigate("/login");
            }}
          />
        )}
      </div>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default Layout;
