import { useState } from "react";
import Lottie from "lottie-react";
import runnerAnimation from "@assets/runner.json";
import { CommonButton } from "@components/common";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("로그인 시도 확인~ 대시보드로 이동할게요:", { id, password });
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 bg-white min-h-screen">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <div className="flex flex-col text-[32px] font-bold mb-8 text-center leading-tight">
          <span className="text-main">몸짱코인</span>
          <span className="text-gray-800">ADMIN</span>
        </div>

        <div className="flex justify-center items-center w-64 h-64">
          <Lottie animationData={runnerAnimation} loop={true} />
        </div>

        <div className="w-full mt-8 space-y-4">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
            className="w-full bg-white border border-gray-300 rounded-[4px] p-4 focus:outline-none focus:ring-2 focus:ring-main transition-all"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full bg-white border border-gray-300 rounded-[4px] p-4 focus:outline-none focus:ring-2 focus:ring-main transition-all"
          />
        </div>

        <div className="w-full mt-8">
          <CommonButton label="로그인하기" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;
