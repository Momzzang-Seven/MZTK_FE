import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FreePost } from "@types";
import { formatTimeAgo } from "@utils";
import { SharePost, ActionList } from "@components/community";

interface Props {
  post: FreePost;
}

const FreePostCard = ({ post }: Props) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentClick = () => {
    navigate("/community/free/" + post.id);
  };

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {post.writer.profileImage ? (
            <img
              src={post.writer.profileImage}
              alt={post.writer.nickname}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-main" />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold fontSize-16">
              {post.writer.nickname}
            </span>
            <span className="text-xs text-gray-500 fontSize-14">
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
        </div>
        <ActionList
          id={post.id}
          type="free"
          authorId={post.writer.userId}
          size="sm"
        />
      </div>

      {/* 게시물 이미지 */}
      <div className="mt-3 w-full">
        <img
          src={post.postImage}
          alt="post"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* 액션 영역 */}
      <div className="flex items-center gap-4 px-4 py-1">
        {/* 좋아요 */}
        <div
          onClick={handleLikeClick}
          className="flex items-center gap-1 active:scale-95 transition cursor-pointer"
        >
          <img
            src={liked ? "/icon/likeActive.svg" : "/icon/like.svg"}
            alt="like"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">{likeCount}</span>
        </div>

        {/* 댓글 */}
        <div
          onClick={handleCommentClick}
          className="flex items-center gap-1 active:scale-95 transition cursor-pointer"
        >
          <img src="/icon/comment.svg" alt="comment" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">
            {post.comments}
          </span>
        </div>

        {/* 공유 */}
        <SharePost type="free" postId={post.id} />
      </div>

      {/* 설명 */}
      <p className="px-4 pb-7 text-sm">{post.description}</p>
    </div>
  );
};

export default FreePostCard;
