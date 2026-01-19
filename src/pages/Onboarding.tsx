import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import runnerAnimation from "@assets/runner.json";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-white px-6 pt-20 pb-10">
      <div className="flex flex-col mb-8">
        <h1 className="font-gmarket text-[28px] leading-tight text-black mb-4">
          지갑을 <br /> 생성/연결 해볼까요?
        </h1>
        <p className="text-color-grey-deep text-[16px] leading-relaxed">
          이미 사용 중인 지갑이 없다면, <br /> 새 지갑을 간편하게 만들 수
          있습니다
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="w-80 h-80">
          <Lottie animationData={runnerAnimation} loop={true} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/create-wallet")}
          className="w-full h-[60px] bg-main text-black rounded-xl active:opacity-90 transition-opacity"
        >
          지갑 생성하기
        </button>

        <div className="relative">
          <button
            onClick={() => navigate("/register-wallet")}
            className="w-full h-[60px] bg-white text-black rounded-xl border-2 border-main active:bg-orange-50 transition-colors"
          >
            지갑 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
