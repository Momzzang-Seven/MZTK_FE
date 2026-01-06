import { AttendanceBanner, LevelProgress, AuthActionButtons } from "@components/home";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleExerciseAuth = () => {
    navigate("/exercise-auth");
  };

  const handleLocationAuth = () => {
    // Navigate to location auth page (future)
    console.log("Navigate to Location Auth");
    alert("위치 인증 페이지로 이동합니다 (준비중)");
  };

  return (
    <div className="flex flex-col h-full bg-white px-5 pt-6 pb-20 overflow-y-auto">
      {/* 1. Banner */}
      <AttendanceBanner />

      {/* 2. Level Progress (Center) */}
      <div className="flex-1 flex items-center justify-center">
        <LevelProgress />
      </div>

      {/* 3. Action Buttons (Bottom) */}
      <AuthActionButtons
        onExerciseClick={handleExerciseAuth}
        onLocationClick={handleLocationAuth}
      />
    </div>
  );
};

export default Home;
