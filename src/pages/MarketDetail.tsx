import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MarketDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("프로그램 소개");

    // Dummy data database
    const products = {
        "1": {
            id: 1,
            title: "1:1 집중 웨이트 트레이닝",
            price: 500,
            description: "개인별 체형 분석을 통한 맞춤형 운동 프로그램을 제공합니다. 전문 트레이너와 함께하는 1:1 개인 레슨으로 효과적인 체형 교정과 근력 강화를 경험해보세요.",
            features: [
                "개인별 체형 분석 및 맞춤 운동 계획 수립",
                "전문 트레이너의 1:1 개인 지도",
                "식단 관리 가이드 제공",
                "운동 기구 사용법 교육"
            ],
            trainer: {
                name: "김철수 트레이너",
                title: "전문 퍼스널 트레이너",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop"
            },
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
        },
        "2": {
            id: 2,
            title: "힐링 요가 클래스",
            price: 280,
            description: "바쁜 일상 속 지친 몸과 마음을 치유하는 힐링 요가 클래스입니다. 전문 요가 강사와 함께 호흡과 명상을 통해 내면의 평화를 찾아보세요.",
            features: [
                "초보자도 쉽게 따라할 수 있는 난이도",
                "명상과 호흡법 지도",
                "유연성 향상 및 스트레스 해소",
                "소수 정예 그룹 수업"
            ],
            trainer: {
                name: "이영희 강사",
                title: "국제 요가 자격증 보유",
                image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop"
            },
            image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1460&auto=format&fit=crop"
        }
    };

    const product = products[id as keyof typeof products] || products["1"]; // Fallback to 1

    return (
        <div className="flex flex-col h-full bg-white relative pb-[100px]">
            {/* Header / Back Button - Separate */}
            <div className="flex justify-between items-center p-5 bg-white sticky top-0 z-30">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                    <img src="/icon/backArrow.svg" alt="back" className="w-6 h-6" />
                </button>

                <div className="bg-main rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                    <img src="/icon/token.svg" alt="token" className="w-4 h-4 brightness-200 invert" />
                    <span className="text-white font-bold text-sm">2,450</span>
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full h-[300px] shrink-0">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>

            {/* Content Container */}
            <div className="flex-1 -mt-6 rounded-t-[30px] bg-white relative z-10 px-5 pt-8">
                {/* Title & Price */}
                <h1 className="title text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    {product.title}
                </h1>
                <div className="text-[#FAB12F] font-bold text-xl mb-6">
                    {product.price} 토큰
                </div>

                {/* Trainer Info */}
                <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
                            <img src={product.trainer.image} alt="trainer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">{product.trainer.name}</div>
                            <div className="text-xs text-gray-500">{product.trainer.title}</div>
                        </div>
                    </div>
                    <button className="border border-[#FAB12F] text-[#FAB12F] px-4 py-1.5 rounded-full text-sm font-bold hover:bg-[#FAB12F]/10 transition-colors">
                        팔로우
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 mb-6 sticky top-0 bg-white z-10">
                    {["프로그램 소개", "위치", "후기(127)"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-sm font-bold text-center transition-colors relative ${activeTab.includes(tab.split("(")[0])
                                ? "text-gray-900"
                                : "text-gray-400"
                                }`}
                        >
                            {tab}
                            {activeTab.includes(tab.split("(")[0]) && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content based on Tab (Showing Program Intro mostly) */}
                <div className="space-y-6 pb-10">
                    <div>
                        <p className="body text-gray-600 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        <h3 className="font-bold text-gray-900 mb-3">프로그램 특징</h3>
                        <ul className="space-y-2">
                            {product.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="text-[#FAB12F] mt-0.5">✔</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Sticky Footer */}
            <div className="fixed bottom-0 w-full max-w-[420px] bg-white border-t border-gray-100 p-5 pb-8 z-[999] flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div>
                    <div className="text-xs text-gray-400 mb-0.5">총 가격</div>
                    <div className="text-[#FAB12F] font-bold text-xl">{product.price} 토큰</div>
                </div>
                <button
                    onClick={() => navigate(`/market/${id}/purchase`)}
                    className="bg-[#FAB12F] text-white w-[60%] py-3.5 rounded-xl font-bold shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
                >
                    구매하기
                </button>
            </div>
        </div>
    );
};

export default MarketDetail;
