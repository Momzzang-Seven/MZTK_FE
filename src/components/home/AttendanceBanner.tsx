import { useState } from "react";

const AttendanceBanner = () => {
    const [isAttended, setIsAttended] = useState(false);

    const handleAttendance = () => {
        if (isAttended) return;

        setIsAttended(true);
        alert("출석체크 완료! 10XP가 지급되었습니다.");
    };

    return (
        <div
            onClick={handleAttendance}
            className={`w-full rounded-xl p-4 text-white shadow-lg flex items-center gap-4 cursor-pointer hover:opacity-95 transition-all ${isAttended
                    ? "bg-[#A09CAB] cursor-default" // Grey-main from palette
                    : "bg-gradient-to-r from-[#FAB12F] to-[#FFCC00]"
                }`}
        >
            <div className="bg-white/20 p-2 rounded-full">
                {/* Alarm Clock Icon - Updated to match design */}
                <svg
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M22 6l-3-3" />
                    <path d="M5 3l-3 3" />
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2 2" />
                </svg>
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-lg">
                    {isAttended ? "오늘 출석 완료!" : "출석 인증하고 10XP 받기"}
                </span>
                <span className="text-sm opacity-90">
                    {isAttended ? "내일도 잊지 말고 출석하세요!" : "7일 연속 출석 시 +300XP 추가 보상"}
                </span>
            </div>
        </div>
    );
};

export default AttendanceBanner;
