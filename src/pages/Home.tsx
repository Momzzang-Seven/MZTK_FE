import {
  AttendanceBanner,
  LevelProgress,
  AuthActionButtons,
  AuthChoiceModal,
} from "@components/home";
import { useState } from "react";

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleExerciseAuth = () => {
    setIsAuthModalOpen(true);
  };

  const handleLocationAuth = () => {
    // Navigate to location auth page (future)
    console.log("Navigate to Location Auth");
    alert("위치 인증 페이지으로 이동합니다 (준비중)");
  };

  return (
    <div className="flex flex-col h-full bg-white px-5 pt-6 pb-20 overflow-y-auto gap-5 relative">
      {/* 1. Banner */}
      <AttendanceBanner />

      {/* 2. Level Progress (Center) */}
      <div className="w-full flex justify-center -mt-4">
        <LevelProgress />
      </div>

      {/* 3. Action Buttons (Bottom) */}
      <AuthActionButtons
        onExerciseClick={handleExerciseAuth}
        onLocationClick={handleLocationAuth}
      />

      {/* Auth Method Selection Modal */}
      <AuthChoiceModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Home;
