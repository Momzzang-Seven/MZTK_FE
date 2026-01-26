import { useEffect, useState } from "react";
import { useAdminStore } from "@store/adminStore";

const SearchBar = () => {
    const { searchUsers, statusFilter, setStatusFilter } = useAdminStore();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            searchUsers(inputValue);
        }, 2000); // 2 seconds debounce

        return () => clearTimeout(timer);
    }, [inputValue, searchUsers]);

    return (
        <div className="relative w-full flex items-center gap-4">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:border-main focus:ring-1 focus:ring-main sm:text-sm transition-colors"
                    placeholder="사용자의 ID 혹은 닉네임을 검색하세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            {/* Dropdown for Status Filter */}
            <div className="relative">
                <select
                    className="appearance-none bg-white border border-gray-200 text-gray-700 py-4 pl-4 pr-10 rounded-xl leading-Tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm font-bold min-w-[120px] cursor-pointer"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'ACTIVE' | 'BANNED')}
                >
                    <option value="ALL">전체 상태</option>
                    <option value="ACTIVE">활동</option>
                    <option value="BANNED">정지</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>

            <button
                className="bg-main hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-colors"
                onClick={() => searchUsers(inputValue)} // Instant search on click
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                검색
            </button>
        </div>
    );
};

export default SearchBar;
