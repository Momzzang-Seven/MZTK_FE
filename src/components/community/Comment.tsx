import type { Comment } from "@types";
import { formatTimeAgo } from "@utils";
import { ActionList } from "@components/community";

interface Props {
  comment: Comment;
  showProfileImage?: boolean;
}

const CommentItem = ({ comment, showProfileImage = true }: Props) => {
  return (
    <div className={"flex gap-3 p-3"}>
      {/* 프로필 사진*/}
      {showProfileImage && comment.author.profileImage ? (
        <img
          src={comment.author.profileImage}
          alt={comment.author.nickname}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-yellow-400" />
      )}

      <div className="flex-1">
        {/* 프로필, 시간 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">
              {comment.author.nickname}
            </span>
            <span className="text-xs text-gray-400">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>
          <ActionList
            size="xs"
            type="comment"
            id={comment.id}
            authorId={comment.author.userId}
            commentContent={comment.description}
          />
        </div>

        {/* 본문 */}
        <p className="mt-1 text-sm leading-relaxed">{comment.description}</p>
      </div>
    </div>
  );
};

export default CommentItem;
