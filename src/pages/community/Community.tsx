import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FreePostCard } from "@components/community";
import { CommonButton } from "@components/common";
import type { BoardType, FreePost } from "@types";

const Community = () => {
  const [activeBoard, setActiveBoard] = useState<BoardType>("free");
  const [posts, setPosts] = useState<FreePost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeBoard !== "free") return;

    fetch("/data/freePosts.json")
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, [activeBoard]);

  const handleCreatePost = () => {
    if (activeBoard === "free") {
      navigate("/community/f/new");
    } else {
      navigate("/community/q/new");
    }
  };

  return (
    <div>
      {/* 상단 토글 */}
      <div className="relative flex h-[44px] rounded-xl bg-[#F2F2F2] mx-2 mt-4 p-1">
        {/* 슬라이드되는 선택 배경 */}
        <div
          className={`absolute top-1 left-1 h-[36px] w-49/100 rounded-lg bg-[#FAB12F] transition-transform duration-300 ease-out
        ${activeBoard === "question" ? "translate-x-full" : "translate-x-0"}`}
        />

        {/* 자유게시판 */}
        <div
          onClick={() => setActiveBoard("free")}
          className={`relative z-10 flex-1 flex items-center justify-center text-sm font-semibold transition-colors
        ${activeBoard === "free" ? "text-white" : "text-[#777]"}`}
        >
          자유게시판
        </div>

        {/* 질문게시판 */}
        <div
          onClick={() => setActiveBoard("question")}
          className={`relative z-10 flex-1 flex items-center justify-center text-sm font-semibold transition-colors
        ${activeBoard === "question" ? "text-white" : "text-[#777]"}`}
        >
          질문게시판
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {activeBoard === "free" &&
          posts.map((post) => <FreePostCard key={post.id} post={post} />)}

        {activeBoard === "question" && (
          <div className="flex flex-1 flex-col gap-y-5 items-center justify-center mt-20">
            <img src="/icon/error.svg" alt="errorIcon" width="60px" />
            <div className="title">준비중</div>
          </div>
        )}
      </div>

      <div className="fixed bottom-[90px] flex w-full max-w-[420px] flex-row items-end justify-end px-4">
        <CommonButton
          onClick={handleCreatePost}
          width="w-[60px]"
          padding="p-0"
          shadow={true}
          className="h-[60px] !rounded-full"
          label="十"
        />
      </div>
    </div>
  );
};

export default Community;
