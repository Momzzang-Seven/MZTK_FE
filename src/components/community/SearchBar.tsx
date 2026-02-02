import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isQuestion = pathname.startsWith("/community/question");
  const isFree = pathname.startsWith("/community/free");

  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("tag");

  const [keyword, setKeyword] = useState(initialKeyword || "");

  useEffect(() => {
    setKeyword(initialKeyword || "");
  }, [pathname, initialKeyword]);

  const handleSearch = (searchKeyword: string) => {
    const trimmed = searchKeyword.trim();

    if (!trimmed) {
      if (isFree) navigate("/community/free", { replace: true });
      else if (isQuestion) navigate("/community/question", { replace: true });
      return;
    }

    const encoded = encodeURIComponent(trimmed);

    if (isFree) navigate(`/community/free?tag=${encoded}`);
    else if (isQuestion) navigate(`/community/question?tag=${encoded}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(keyword);
    }
  };

  return (
    <div className="relative flex w-full max-w-md">
      <div className="relative flex w-full items-center rounded-xl border-1 border-gray-200 bg-white">
        <img
          src="/icon/search.svg"
          alt="search"
          className="absolute left-3 h-5 w-5"
        />

        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="태그 검색"
          className="w-full rounded-full bg-transparent py-3 pl-12 pr-4 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar;
