import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  SearchBar,
  FreePostCard,
  QuestionPostCard,
} from "@components/community";
import { CommonButton } from "@components/common";
import type { BoardType, FreePost, QuestionPost } from "@types";

const Community = () => {
  const navigate = useNavigate();
  const [activeBoard, setActiveBoard] = useState<BoardType>("free");
  const [freePosts, setFreePosts] = useState<FreePost[]>([]);
  const [questionPosts, setQuestionPosts] = useState<QuestionPost[]>([]);

  const { tag } = useParams();
  const isSearchMode = Boolean(tag);

  useEffect(() => {
    if (isSearchMode) {
      if (activeBoard === "free") {
        setFreePosts([]);
      } else if (activeBoard === "question") {
        fetch("/data/questionPosts.json")
          .then((res) => res.json())
          .then((data) => setQuestionPosts(data.posts))
          .catch(console.error);
      }
      return;
    }

    if (activeBoard === "free") {
      fetch("/data/freePosts.json")
        .then((res) => res.json())
        .then((data) => setFreePosts(data.posts))
        .catch(console.error);
    } else if (activeBoard === "question") {
      fetch("/data/questionPosts.json")
        .then((res) => res.json())
        .then((data) => setQuestionPosts(data.posts))
        .catch(console.error);
    }
  }, [isSearchMode, activeBoard]);

  const handleCreatePost = () => {
    if (activeBoard === "free") {
      navigate("/community/f/new");
    } else {
      navigate("/community/q/new");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 mx-4 mt-4">
        {/* 상단 토글 */}
        <div className="relative flex h-[44px] rounded-xl bg-[#F2F2F2] p-1">
          {/* 슬라이드되는 선택 배경 */}
          <div
            className={`absolute top-1 left-1 h-[36px] w-49/100 rounded-lg bg-[#FAB12F] transition-transform duration-300 ease-out
        ${activeBoard === "question" ? "translate-x-full" : "translate-x-0"}`}
          />

          {/* 자유게시판 */}
          <div
            onClick={() => setActiveBoard("free")}
            className={`relative z-10 flex-1 flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer
        ${activeBoard === "free" ? "text-white" : "text-[#777]"}`}
          >
            자유게시판
          </div>

          {/* 질문게시판 */}
          <div
            onClick={() => setActiveBoard("question")}
            className={`relative z-10 flex-1 flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer
        ${activeBoard === "question" ? "text-white" : "text-[#777]"}`}
          >
            질문게시판
          </div>
        </div>

        <div className="p-2">
          <SearchBar initialKeyword={tag ?? ""} />
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="flex flex-col gap-4">
        {/* free 게시판 */}
        {activeBoard === "free" && (
          <>
            {freePosts.length > 0
              ? freePosts.map((post) => (
                  <FreePostCard key={post.id} post={post} />
                ))
              : isSearchMode && (
                  <p className="text-center text-gray-400 py-8">
                    검색 결과가 없습니다.
                  </p>
                )}
          </>
        )}

        {/* question 게시판 */}
        {activeBoard === "question" && (
          <>
            {questionPosts.length > 0
              ? questionPosts.map((post) => (
                  <div key={post.id} className="px-4">
                    <QuestionPostCard post={post} />
                  </div>
                ))
              : isSearchMode && (
                  <p className="text-center text-gray-400 py-8">
                    검색 결과가 없습니다.
                  </p>
                )}
          </>
        )}
      </div>

      <div className="fixed bottom-[100px] flex w-full max-w-[420px] flex-row items-end justify-end px-4">
        <CommonButton
          onClick={handleCreatePost}
          width="w-[60px]"
          padding="p-0"
          shadow={true}
          className="h-[60px] !rounded-full shadow-xl"
          label="十"
        />
      </div>
    </div>
  );
};

export default Community;
