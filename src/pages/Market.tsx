import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Market = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("전체");

    // Dummy data representing the design
    const items = [
        {
            id: 1,
            title: "1:1 집중 웨이트 트레이닝",
            location: "역삼동",
            price: 350,
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
            category: "PT/헬스"
        },
        {
            id: 2,
            title: "힐링 요가 클래스",
            location: "청담동",
            price: 280,
            image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1460&auto=format&fit=crop",
            category: "요가/필라테스"
        }
    ];

    const categories = ["전체", "요가/필라테스", "PT/헬스", "크로스핏"];

    const filteredItems = selectedCategory === "전체"
        ? items
        : items.filter(item => item.category === selectedCategory);

    return (
        <div className="flex flex-col h-full bg-grey-pale min-h-screen pb-[100px]">
            {/* Header Area */}
            <div className="bg-white px-5 pt-6 pb-4 sticky top-0 z-10">
                <div className="flex items-center gap-3 mb-4">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="운동 체험권을 검색해보세요"
                            className="w-full bg-grey-pale rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-main/50 transition-all placeholder:text-gray-400"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Token Balance */}
                    <div className="bg-main rounded-lg px-3 py-2 flex items-center gap-1.5 shadow-sm shrink-0">
                        <img src="/icon/token.svg" alt="token" className="w-5 h-5 opacity-90 brightness-200 invert" />
                        {/* Note: Adjust icon color if needed, assuming token.svg exists */}
                        <span className="text-white font-bold text-sm">2,450</span>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${selectedCategory === cat
                                ? "bg-main border-main text-white shadow-sm"
                                : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Item List */}
            <div className="px-5 pt-4 flex flex-col gap-5">
                {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        {/* Image */}
                        <div className="h-48 bg-gray-200 relative">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                            <div className="flex items-center text-gray-400 text-sm mb-4">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {item.location}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center font-bold text-xl text-gray-900 gap-1">
                                    {/* <img src="/icon/orangeToken.svg" alt="token" className="w-6 h-6" /> */}
                                    <span>{item.price} 토큰</span>
                                </div>
                                <button
                                    onClick={() => navigate(`/market/${item.id}`)}
                                    className="bg-[#FAB12F] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md hover:opacity-90 transition-opacity active:scale-95"
                                >
                                    예약하기
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Market;
