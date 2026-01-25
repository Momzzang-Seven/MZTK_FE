import { useNavigate } from "react-router-dom";
import type { QuestionPost } from "@types";
import { formatTimeAgo } from "@utils";

interface Props {
  post: QuestionPost;
}

const getStatus = (isSolved: boolean, answers: number) => {
  if (isSolved) return "completed";
  if (answers === 0) return "wating";
  return "answering";
};

const statusStyleMap: Record<string, { label: string; bg: string }> = {
  wating: { label: "답변대기", bg: "bg-[#F59E0B]" },
  answering: { label: "답변중", bg: "bg-[#9CA3AF]" },
  completed: { label: "채택완료", bg: "bg-[#27DDA1]" },
};

const QuestionPostCard = ({ post }: Props) => {
  const navigate = useNavigate();
  const status = getStatus(post.isSolved, post.answers);
  const statusStyle = statusStyleMap[status];

  return (
    <div className="rounded-2xl bg-white border-1 border-gray-100 shadow-xs px-5 py-4 hover:cursor-pointer">
      {/* 상단: 상태 배지 + 시간 */}
      <header className="mb-2 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs text-white font-normal ${statusStyle.bg}`}
        >
          {statusStyle.label}
        </span>
        <span className="text-xs text-gray-400 fontSize-12">
          {formatTimeAgo(post.createdAt)}
        </span>
      </header>

      {/* 제목 + 내용 미리보기 */}
      <div className="mb-2" onClick={() => navigate("/community/q/postId")}>
        <div className="mb-1 text-base font-medium text-gray-900 line-clamp-1">
          {post.title}
        </div>
        <p className="text-sm text-gray-500 font-normal line-clamp-2">
          {post.description}
        </p>
      </div>

      {/* 태그 */}
      <div className="mb-2 flex flex-wrap gap-1">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm text-[#4C6FFF]"
            onClick={() => navigate("/community/s/" + tag)}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 하단: 작성자 / 답변 수 / 토큰 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src={post.author.profileImage ?? "/icon/user.svg"}
              alt={post.author.nickname}
              className="h-6 w-6 rounded-full bg-yellow-400"
            />
            <span className="text-xs text-gray-500 font-semibold">
              {post.author.nickname}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-500">
            <img src="/icon/comment.svg" alt="comment" className="w-5 h-5" />
            <span>{post.answers}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm font-normal text-[#ffffff] bg-[#FAB12F] px-2 py-1 rounded-full">
          <img src="/icon/token.svg" alt="token" className="w-5 h-5" />
          <span>{post.bountyToken}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPostCard;
