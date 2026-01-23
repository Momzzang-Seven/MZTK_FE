import { useNavigate } from "react-router-dom";
import { useAuthModalStore } from "@store";
import { CommonModal } from "@components/common";
import { Header, Footer } from "@components/layout";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { unauthorized, setUnauthorized } = useAuthModalStore();

  const isAdminPage = location.pathname.startsWith("/admin");

  const hideFooterPages = [
    "/login",
    "/onboarding",
    "/create-wallet",
    "/register-wallet",
    "/community/free/postId",
    "/community/free/new",
    "/admin",
  ];
  /* Global header disabled for custom page headers */
  const showHeaderPages: string[] = [];
  const shouldShowHeader = showHeaderPages.includes(location.pathname);
  const shouldHideFooter = hideFooterPages.includes(location.pathname);

  return (
    <div
      className={`bg-white w-full min-h-screen mx-auto flex flex-col items-center ${isAdminPage ? "w-full" : "max-w-[420px]"}  `}
    >
      {shouldShowHeader && <Header />}
      <div
        className={`w-full flex flex-col flex-1 overflow-y-auto
          ${!shouldHideFooter ? "pb-[82px]" : ""}
          ${shouldShowHeader ? "pt-[72px]" : ""}
          `}
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
      {!shouldHideFooter && <Footer />}
    </div>
  );
};
