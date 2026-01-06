import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PostLogin } from "@services/auth";
import { useUserStore } from "@store";

const Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const setAccessToken = useUserStore((state) => state.setAccessToken);
    const loginAttempted = useRef(false);

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state"); // Use state to identify provider

        if (!code) {
            alert("로그인 실패: 인증 코드가 없습니다.");
            navigate("/login");
            return;
        }

        if (loginAttempted.current) return;
        loginAttempted.current = true;

        const login = async () => {
            try {
                // Simple provider detection based on state or hardcoded for now.
                // You should pass 'kakao' or 'google' in state when redirecting.
                let provider: "KAKAO" | "GOOGLE" = "KAKAO";
                if (state === "google") provider = "GOOGLE";

                const redirectUri = window.location.origin + "/callback";

                const response = await PostLogin(provider, code, redirectUri);

                if (response.data) {
                    const { userInfo, accessToken } = response.data;
                    setUser(userInfo);
                    setAccessToken(accessToken);
                    navigate("/");
                }
            } catch (error: any) {
                console.error("Login failed", error);
                alert(`로그인 실패: ${error.message || JSON.stringify(error)}`);
                navigate("/login");
            }
        };

        login();
    }, [searchParams, navigate, setUser, setAccessToken]);

    const providerName = searchParams.get("state") === "google" ? "구글" : "카카오";

    return (
        <div className="flex justify-center items-center h-screen flex-col gap-4">
            <div className="text-xl font-bold">{providerName} 로그인 중입니다...</div>
            <div className="text-gray-500">잠시만 기다려주세요.</div>
        </div>
    );
};

export default Callback;
