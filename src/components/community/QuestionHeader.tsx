import { useNavigate } from "react-router-dom";
import type { PostType, Writer } from "@types";
import { formatTimeAgo } from "@utils";
import { ActionList, SharePost } from "@components/community";

interface QuestionHeaderProps {
  type: PostType;
  postId: number;
  author: Writer;
  createdAt: string;
}

const QuestionHeader = ({
  type,
  postId,
  author,
  createdAt,
}: QuestionHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full max-w-[420px] h-[72px] bg-white border-b-1 border-gray-300 z-50 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          className="p-2 rounded-full hover:bg-gray-100  transition-colors cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img src="/icon/backArrow.svg" alt="뒤로가기" className="w-5 h-5" />
        </div>
        {author.profileImage ? (
          <img
            src={author.profileImage}
            alt={author.nickname}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-main" />
        )}
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
        <ActionList
          size="md"
          type={type}
          id={postId}
          authorId={author.userId}
        />
        <SharePost type={type} postId={postId} />
      </div>
    </div>
  );
};

export default QuestionHeader;
