import { useNavigate } from "react-router-dom";
import type { Author } from "@types";
import { formatTimeAgo } from "@utils";

interface QuestionHeaderProps {
  postId: number;
  author: Author;
  createdAt: string;
}

const QuestionHeader = ({ postId, author, createdAt }: QuestionHeaderProps) => {
  const navigate = useNavigate();

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "몸짱코인 게시물 공유하기",
          url: "https://mztk.vercel.app/community/question/" + postId,
        })
        .catch((error) => console.log("공유 실패:", error));
    } else {
      console.log("Web Share API를 지원하지 않는 환경입니다.");
    }
  };

  return (
    <div className="fixed top-0 w-full max-w-[420px] h-[72px] bg-white border-b-1 border-gray-300 z-50 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          className="p-2 rounded-full hover:bg-gray-100  transition-colors cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img src="/icon/backArrow.svg" alt="뒤로가기" className="w-5 h-5" />
        </div>
        <img
          src={author.profileImage ?? "/icon/user.svg"}
          alt={author.nickname}
          className="h-10 w-10 rounded-full bg-yellow-400"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-base text-black">
            {author.nickname}
          </span>
          <span className="font-medium text-sm text-gray-500">
            {formatTimeAgo(createdAt)}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <img src="/icon/more.svg" alt="더보기" className="w-5 h-5" />
        </div>
        <div
          className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          onClick={handleShareClick}
        >
          <img src="/icon/share.svg" alt="공유" className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default QuestionHeader;
