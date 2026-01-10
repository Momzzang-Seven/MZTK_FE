import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "매일 운동하고\n인증하세요",
            description: "러닝, 헬스, 홈트레이닝...\n어떤 운동이든 사진 한 장이면 인증 완료!",
            icon: (
                <svg
                    width="140"
                    height="140"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#FAB12F]"
                >
                    <g clipPath="url(#clip0_7_1406)">
                        <path
                            d="M24.6305 5.47329C23.7586 6.70845 22.0633 6.99907 20.8282 6.15141C19.593 5.30376 19.3024 3.58423 20.15 2.34907C21.0219 1.11391 22.7172 0.82329 23.9524 1.67095C25.1875 2.5186 25.5024 4.23813 24.6305 5.47329ZM30.7821 8.50063L27.5852 13.1022C27.2219 13.6592 26.4711 13.7803 25.9141 13.417L21.3125 10.2202L16.3961 17.51L20.586 20.4405C20.9493 20.6827 21.2399 21.0944 21.3125 21.5303L22.4993 28.2389C22.6446 29.1592 22.0149 30.0553 21.0946 30.2249C20.1743 30.3702 19.2782 29.7405 19.1086 28.8202L18.043 22.7897L12.7633 19.0358C12.7633 19.0358 9.97817 23.0561 9.78442 23.2983C9.59067 23.5405 9.42113 23.8795 9.10629 24.0491C8.69457 24.2913 8.2102 24.3155 7.79848 24.2186L1.21098 22.4506C0.314886 22.2084 -0.217927 21.2881 0.0242603 20.3678C0.266448 19.4717 1.18676 18.9389 2.10707 19.1811L7.50785 20.61L16.1297 8.08891H12.8118L9.97817 12.1577C9.61489 12.7147 8.8641 12.8358 8.30707 12.4725C7.75004 12.1092 7.62895 11.3584 7.99223 10.8014L11.1891 6.22407C11.4313 5.86079 11.843 5.66704 12.2547 5.71548H17.7766C18.6 5.71548 19.4235 5.95766 20.1258 6.46626L21.8938 7.72563L26.2532 10.8014L28.8204 7.1686C29.1836 6.61157 29.9344 6.49048 30.4914 6.85376C31.0485 7.21704 31.1696 7.99204 30.7821 8.50063Z"
                            fill="currentColor"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_7_1406">
                            <rect width="31" height="31" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            ),
        },
        {
            id: 2,
            title: "인증하면\n코인을 드려요",
            description: "운동 완료 후 인증만 해도\n매일매일 코인이 차곡차곡 쌓여요.",
            icon: (
                <svg
                    width="140"
                    height="140"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#FAB12F]"
                >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 16V8l4 5 4-5v8" />
                </svg>
            ),
        },
        {
            id: 3,
            title: "모은 코인은\n마켓에서 쓰세요",
            description: "편의점, 카페, 상품권까지!\n땀 흘려 번 코인으로 마음껏 쇼핑하세요.",
            icon: (
                <svg
                    width="140"
                    height="140"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#FAB12F]"
                >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
            ),
        },
    ];

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide((prev) => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        // Optionally set a flag in localStorage so onboarding isn't shown again if you want
        // localStorage.setItem("hasCompletedOnboarding", "true");
        navigate("/");
    };

    return (
        <div className="flex flex-col h-screen bg-white px-6 pt-11 pb-6 relative overflow-hidden">
            {/* Skip Button - Absolute Position */}
            <div className="absolute top-6 right-6 z-10">
                <button
                    onClick={handleComplete}
                    className="text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
                >
                    Skip
                </button>
            </div>

            {/* Centered Content Group */}
            <div className="flex-1 flex flex-col items-center justify-center animate-fade-in w-full max-w-sm mx-auto pb-24">
                {/* Indicators */}
                <div className="flex justify-center gap-2 mb-12 shrink-0">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-[#FAB12F] w-6" : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>

                {/* Icon */}
                <div className="mb-12 p-6 bg-yellow-50 rounded-full shrink-0">
                    {slides[currentSlide].icon}
                </div>

                {/* Text */}
                <h1
                    className="text-3xl font-bold text-gray-800 text-center mb-10 whitespace-pre-line leading-tight shrink-0"
                    style={{ marginBottom: "20px" }}
                >
                    {slides[currentSlide].title}
                </h1>
                <p
                    className="text-gray-500 text-center whitespace-pre-line leading-relaxed mb-8 shrink-0"
                    style={{ marginBottom: "20px" }}
                >
                    {slides[currentSlide].description}
                </p>

                {/* Action Button */}
                <button
                    onClick={handleNext}
                    className="w-full bg-[#FAB12F] hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-md transition-all active:scale-[0.98] shrink-0"
                >
                    {currentSlide === slides.length - 1 ? "시작하기" : "다음"}
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
