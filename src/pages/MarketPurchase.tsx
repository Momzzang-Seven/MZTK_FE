import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MarketPurchase = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<number | null>(15); // Default 15th selected
    const [selectedTime, setSelectedTime] = useState("09:00");
    const [request, setRequest] = useState("");

    // Simple Calendar Helpers for Jan 2026
    // Jan 1, 2026 is Thursday.
    const daysInMonth = 31;
    const firstDayOffset = 4; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu
    const weeks = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOffset) {
                week.push(null);
            } else if (day > daysInMonth) {
                week.push(null);
            } else {
                week.push(day);
                day++;
            }
        }
        weeks.push(week);
        if (day > daysInMonth) break;
    }

    const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

    return (
        <div className="flex flex-col h-full bg-white relative pb-[100px]">
            {/* Header */}
            <div className="flex items-center p-5 sticky top-0 bg-white z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <img src="/icon/backArrow.svg" alt="back" className="w-6 h-6" />
                </button>
                <div className="text-lg font-bold ml-2">체험권 구매 확정</div>
            </div>

            <div className="px-5 pb-10">
                {/* 1. Date Selection */}
                <div className="mb-8">
                    <h2 className="text-sm text-gray-700 mb-3 font-medium">가능한 날짜 선택</h2>
                    <div className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-center gap-4 mb-4 relative">
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <span className="font-bold text-gray-900">2026년 1월</span>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Days Header */}
                        <div className="grid grid-cols-7 mb-2">
                            {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
                                <div key={d} className={`text-center text-xs ${i === 0 ? "text-red-400" : "text-gray-400"}`}>
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="flex flex-col gap-1">
                            {weeks.map((week, wIdx) => (
                                <div key={wIdx} className="grid grid-cols-7">
                                    {week.map((d, dIdx) => (
                                        <div key={dIdx} className="aspect-square flex items-center justify-center">
                                            {d && (
                                                <button
                                                    onClick={() => setSelectedDate(d)}
                                                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors flex items-center justify-center ${selectedDate === d
                                                            ? "bg-[#FAB12F] text-white shadow-md"
                                                            : "text-gray-700 hover:bg-gray-100"
                                                        } ${dIdx === 0 ? "text-red-400" : ""}`}
                                                >
                                                    {d}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Time Selection */}
                <div className="mb-8">
                    <h2 className="text-sm text-gray-700 mb-3 font-medium">가능한 시간 선택</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {times.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-xl text-sm font-medium transition-all border ${selectedTime === time
                                        ? "bg-[#FAB12F] border-[#FAB12F] text-white shadow-md"
                                        : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Request Input */}
                <div className="mb-8">
                    <h2 className="text-sm text-gray-700 mb-3 font-medium">트레이너에게 요청사항</h2>
                    <textarea
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder="요청 사항이 있으면 입력해주세요"
                        className="w-full h-32 p-4 rounded-2xl bg-gray-50 border border-gray-100 resize-none text-sm outline-none focus:ring-2 focus:ring-[#FAB12F]/20 placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Bottom Button */}
            <div className="fixed bottom-0 w-full max-w-[420px] bg-white border-t border-gray-100 p-5 pb-8 z-[999]">
                <button
                    onClick={() => alert("구매가 완료되었습니다!")}
                    className="w-full bg-[#FAB12F] text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:opacity-90 transition-all active:scale-[0.98]"
                >
                    구매 확정 하기
                </button>
            </div>
        </div>
    );
};

export default MarketPurchase;
