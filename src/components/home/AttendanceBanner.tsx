import { useUserStore } from "@store";

export const AttendanceBanner = () => {
    const { attendanceStreak } = useUserStore();
    const maxStreak = 7;
    const remainingDays = maxStreak - attendanceStreak;

    return (
        <div className="w-full bg-[#FFC107] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
            {/* Left: Big Arrow Icon */}
            <div className="shrink-0 mr-6">
                <img
                    src="/icon/arrow_chart.svg"
                    alt="trend"
                    width={48}
                    height={48}
                    className="brightness-0 invert transform scale-125" // Scale up to match "Big" request
                />
            </div>

            {/* Right: Content */}
            <div className="flex flex-col flex-1 items-start gap-3">
                <span className="font-bold text-lg tracking-tight">이번 주 출석 챌린지</span>

                {/* Streak Dots */}
                <div className="flex gap-2">
                    {[...Array(maxStreak)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-white/40 ${i < attendanceStreak
                                ? "bg-white text-[#FFC107]"
                                : "bg-transparent text-white"
                                }`}
                        >
                            {i < attendanceStreak && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-sm font-bold opacity-90">
                    {attendanceStreak < 7
                        ? `${remainingDays}일만 더 인증하면 100XP 추가 보상!`
                        : "이번 주 목표 달성 완료! 🎉"}
                </p>
            </div>
        </div>
    );
};

export default AttendanceBanner;
