import { useNavigate, useLocation } from "react-router-dom";

const BoardToggle = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isQuestion = pathname.includes("/community/question");
  const isFree = pathname.includes("/community/free");

  return (
    <div className="relative flex h-[44px] rounded-xl bg-[#F2F2F2] p-1">
      {/* 슬라이드되는 선택 배경 */}
      <div
        className={`absolute top-1 left-1 h-[36px] w-49/100 rounded-lg bg-[#FAB12F] transition-transform duration-300 ease-out
        ${isQuestion ? "translate-x-full" : "translate-x-0"}`}
      />

      {/* 자유게시판 */}
      <div
        onClick={() => navigate("/community/free")}
        className={`relative z-10 flex-1 flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer
        ${isFree ? "text-white" : "text-[#777]"}`}
      >
        자유게시판
      </div>

      {/* 질문게시판 */}
      <div
        onClick={() => navigate("/community/question")}
        className={`relative z-10 flex-1 flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer
        ${isQuestion ? "text-white" : "text-[#777]"}`}
      >
        질문게시판
      </div>
    </div>
  );
};

export default BoardToggle;
