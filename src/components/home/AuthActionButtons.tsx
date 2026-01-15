import { useUserStore } from "@store";
import { useEffect, useState } from "react";

interface AuthActionButtonsProps {
    onExerciseClick: () => void;
    onLocationClick: () => void;
}

export const AuthActionButtons = ({ onExerciseClick, onLocationClick }: AuthActionButtonsProps) => {
    const { checkAttendance, lastAttendanceDate, lastExerciseDate } = useUserStore();
    const [isAttended, setIsAttended] = useState(false);
    const [isExerciseDone, setIsExerciseDone] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setIsAttended(lastAttendanceDate === today);
        setIsExerciseDone(lastExerciseDate === today);
    }, [lastAttendanceDate, lastExerciseDate]);

    const handleAttendance = () => {
        const result = checkAttendance();
        if (result.success) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    };

    const activeStyle = "bg-[#FFC107] text-white shadow-lg active:scale-95 border-none cursor-pointer";
    const inactiveStyle = "!bg-white border-2 border-dashed border-gray-300 text-gray-400 cursor-default";

    return (
        <div className="w-full flex flex-col gap-4">
            {/* Attendance Button */}
            <button
                onClick={isAttended ? undefined : handleAttendance}
                className={`w-full flex items-center gap-5 p-6 rounded-3xl transition-all text-left ${isAttended ? inactiveStyle : activeStyle}`}
            >
                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isAttended ? "bg-transparent" : "bg-white/25"}`}>
                    <img
                        src="/icon/clock.svg"
                        alt="clock"
                        className={`w-8 h-8 ${isAttended ? "brightness-0 opacity-40" : "brightness-0 invert"}`}
                    />
                </div>

                <div className="flex flex-col items-start gap-1">
                    <div className="font-bold text-xl">
                        {isAttended ? "오늘의 출석 완료!" : "출석 인증하고 10XP 받기"}
                    </div>
                    <div className={`text-sm font-medium ${isAttended ? "opacity-70" : "opacity-90"}`}>
                        {isAttended ? "수고하셨어요! 우리 내일 봐요 +_+" : "7일 연속 출석 시 +100XP 추가 보상"}
                    </div>
                </div>
            </button>

            {/* Exercise Button */}
            <button
                onClick={isExerciseDone ? undefined : onExerciseClick}
                className={`w-full flex items-center gap-5 p-6 rounded-3xl transition-all text-left ${isExerciseDone ? inactiveStyle : activeStyle}`}
            >
                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isExerciseDone ? "bg-transparent" : "bg-white/25"}`}>
                    <img
                        src="/icon/dumbell.svg"
                        alt="dumbell"
                        className={`w-8 h-8 ${isExerciseDone ? "brightness-0 opacity-40" : "brightness-0 invert"}`}
                    />
                </div>

                <div className="flex flex-col items-start gap-1">
                    <div className="font-bold text-xl">
                        {isExerciseDone ? "오늘의 운동 완료!" : "오늘의 운동 인증하기"}
                    </div>
                    <div className={`text-sm font-medium ${isExerciseDone ? "opacity-70" : "text-white/90"}`}>
                        {isExerciseDone ? "고생하셨어요! ( •̀ ω •́ )✧" : "하루에 1번 100XP 획득 가능!"}
                    </div>
                </div>
            </button>
        </div>
    );
};

export default AuthActionButtons;
