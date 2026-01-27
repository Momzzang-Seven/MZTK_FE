import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FreePost } from "@types";
import { formatTimeAgo } from "@utils";

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

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "몸짱코인 공유하기",
          url: "https://mztk.vercel.app/community/free/" + post.id,
        })
        .catch((error) => console.log("공유 실패:", error));
    } else {
      console.log("Web Share API를 지원하지 않는 환경입니다.");
    }
  };

  return (
    <article className="bg-white">
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <img
          src={post.author.profileImage ?? "icon/user.svg"}
          alt="profile"
          className="w-10 h-10 rounded-full bg-yellow-400"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold fontSize-16">
            {post.author.nickname}
          </span>
          <span className="text-xs text-gray-500 fontSize-14">
            {formatTimeAgo(post.createdAt)}
          </span>
        </div>
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
      <div className="flex items-center gap-4 px-4 py-3">
        {/* 좋아요 */}
        <button
          onClick={handleLikeClick}
          className="flex items-center gap-1 active:scale-95 transition"
        >
          <img
            src={liked ? "/icon/likeActive.svg" : "/icon/like.svg"}
            alt="like"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">{likeCount}</span>
        </button>

        {/* 댓글 */}
        <button
          onClick={handleCommentClick}
          className="flex items-center gap-1 active:scale-95 transition"
        >
          <img src="/icon/comment.svg" alt="comment" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">
            {post.comments}
          </span>
        </button>

        {/* 공유 */}
        <button
          onClick={handleShareClick}
          className="flex items-center gap-1 active:scale-95 transition"
        >
          <img src="/icon/share.svg" alt="share" className="w-5 h-5" />
        </button>
      </div>

      {/* 설명 */}
      <p className="px-4 pb-4 text-sm">{post.description}</p>
    </article>
  );
};

export default FreePostCard;
