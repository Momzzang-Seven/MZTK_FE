import type { Comment } from "@types";
import { formatTimeAgo } from "@utils";

interface Props {
  comment: Comment;
  showProfileImage?: boolean;
}

const CommentItem = ({ comment, showProfileImage = true }: Props) => {
  return (
    <div className={"flex gap-3 p-3"}>
      {/* 프로필 */}
      {showProfileImage && (
        <img
          src={comment.author.profileImage ?? "/icon/user.svg"}
          alt="profile"
          className="w-10 h-10 rounded-full bg-yellow-400 flex-shrink-0"
        />
      )}

      {/* 본문 */}
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium">{comment.author.nickname}</span>
          <span className="text-xs text-gray-400">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>

        <p className="mt-1 text-sm leading-relaxed">{comment.description}</p>
      </div>
    </div>
  );
};

export default CommentItem;
