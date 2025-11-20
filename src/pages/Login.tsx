import { CommonButton, CommonModal } from "@components/common";
import { GetGoogleLogin, GetKakaoLogin } from "@services/auth";
import runner from "@assets/runner.json";
import Lottie from "lottie-react";
import { useState } from "react";
import { loginWithMetamask } from "@utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [metaModalOpen, setMetaModalOpen] = useState(false);

  const handleLogin = async (type: "metamask" | "kakao" | "google") => {
    try {
      if (type === "metamask") {
        if (!window.ethereum) {
          setMetaModalOpen(true);
          return;
        }
        await loginWithMetamask();
      } else if (type === "kakao") {
        const url = await GetKakaoLogin();
        window.location.href = url;
      } else if (type === "google") {
        const url = await GetGoogleLogin();
        window.location.href = url;
      }
      navigate("/", { replace: true });
    } catch {
      if (type === "metamask") setMetaModalOpen(true);
    }
  };

  return (
    <div className="flex flex-1 px-5 py-30 flex flex-col items-center">
      <div className="font-gmarket text-7xl text-main">
        몸짱
        <br />
        코인
      </div>
      <Lottie
        animationData={runner}
        style={{ width: "300px", height: "300px" }}
      />

      <div className="flex flex-col flex-1 justify-end gap-y-5 w-full">
        <CommonButton
          label="메타마스크로 시작하기"
          img="/icon/metamask.svg"
          bgColor="bg-[#ff5c16]"
          textColor="text-white"
          onClick={() => handleLogin("metamask")}
          className="w-full title shadow-[2px_2px_2px_0_rgba(0,0,0,0.12)]"
        />
        <CommonButton
          label="카카오로 시작하기"
          img="/icon/kakao.svg"
          bgColor="bg-[#FEE500]"
          textColor="text-black"
          onClick={() => handleLogin("kakao")}
          className="w-full title shadow-[2px_2px_2px_0_rgba(0,0,0,0.12)]"
        />
        <CommonButton
          label="구글로 시작하기"
          img="/icon/google.svg"
          bgColor="bg-[#EFEFEF]"
          textColor="text-black"
          onClick={() => handleLogin("google")}
          className="w-full title shadow-[2px_2px_2px_0_rgba(0,0,0,0.12)]"
        />
      </div>

      {metaModalOpen && (
        <CommonModal
          title="로그인을 할 수 없는 환경이에요"
          desc="MetaMask를 설치하시거나, <br/>다른 로그인 방법을 사용해주세요."
          confirmLabel="확인"
          onConfirmClick={() => setMetaModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Login;
