import { useState } from "react";
import type { AnswerPost, Comment } from "@types";
import {
  CommentItem,
  CommentInput,
  PostActionList,
} from "@components/community";
import { formatTimeAgo } from "@utils";

interface AnswerProps {
  answer: AnswerPost;
}

const Answer = ({ answer }: AnswerProps) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleToggleComments = async () => {
    if (isCommentsOpen) {
      setIsCommentsOpen(false);
      return;
    }

    try {
      const res = await fetch("/data/comments.json");
      const data: Comment[] = await res.json();

      setComments(data);
      setIsCommentsOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 px-4 py-5 bg-white ${
        answer.isSelected ? "border-l-4 border-[#22C55E]" : ""
      }`}
    >
      {/* 채택된 답변 딱지 */}
      {answer.isSelected && (
        <div className="flex">
          <div className="text-sm font-semibold text-[#15803D] bg-[#F0FDF4] px-4 py-2 rounded-lg">
            ✓ 채택된 답변
          </div>
        </div>
      )}

      {/* 작성자 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={answer.author.profileImage ?? "/icon/user.svg"}
            alt={answer.author.nickname}
            className="h-10 w-10 rounded-full bg-yellow-400"
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">
              {answer.author.nickname}
            </span>
            <span className="text-xs text-gray-400">
              {formatTimeAgo(answer.createdAt)}
            </span>
          </div>
        </div>
        <PostActionList
          type="answer"
          postId={answer.id}
          authorId={answer.author.userId}
          icon={
            <div className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <img src="/icon/more.svg" alt="더보기" className="w-4 h-4" />
            </div>
          }
        />
      </div>

      {/* 본문 */}
      <p className="text-base text-gray-700 whitespace-pre-line">
        {answer.description}
      </p>

      {/* 이미지 */}
      {answer.postImage && (
        <img
          src={answer.postImage}
          alt="answer"
          className="w-full rounded-lg object-cover"
        />
      )}

      {/* 댓글 버튼 */}
      <div
        onClick={handleToggleComments}
        className="flex items-center gap-2 pl-2 text-sm font-semibold text-gray-500 cursor-pointer"
      >
        <img src="/icon/comment.svg" alt="comment" className="w-5 h-5" />
        {answer.comments}
      </div>

      {/* 댓글 영역 */}
      {isCommentsOpen && (
        <div className="flex flex-col">
          <CommentInput isAnswerPost={true} postId={answer.id} />

          {comments.length === 0 && (
            <p className="text-xs text-gray-400">댓글이 없습니다.</p>
          )}

          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentItem comment={comment} showProfileImage={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Answer;
