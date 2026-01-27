import {
  CurrentTkn,
  LevelProgress,
  LevelReward,
  TxTkn,
  UserProfile,
} from "@components/my";
import { useNavigate } from "react-router-dom";

const My = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col pt-[38px] px-[22px] gap-y-5 items-start justify-start pb-20 overflow-y-auto">
      <UserProfile />

      {/* Location Change Button */}
      <button
        onClick={() => navigate("/location-register", { state: { from: "my" } })}
        className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
      >
        운동 인증 위치 변경하기
      </button>

      <CurrentTkn />
      <TxTkn />
      <LevelProgress />
      <LevelReward />
      <div className="caption text-center flex justify-center w-full text-grey-main">
        지급 오류 또는 지연 관련 문의는
        <span className="text-main"> 다음 링크 </span>를 이용해 주세요.
      </div>
    </div>
  );
};

export default My;
