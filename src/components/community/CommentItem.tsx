import { useState } from 'react';
import type { FreeComment } from '@types';
import { formatTimeAgo } from '@utils';

interface Props {
  comment: FreeComment;
  isReply?: boolean;
}

const CommentItem = ({ comment, isReply = false }: Props) =>{
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div
      className={`flex gap-3 px-4 py-3 border-b border-gray-200${
        isReply ? 'ml-12' : ''
      }`}
    >
      {/* 프로필 */}
      <img
        src={comment.author.profileImage?? '/icon/user.svg'}
        alt="profile"
        className="w-10 h-10 rounded-full bg-yellow-400 flex-shrink-0"
      />

      {/* 본문 */}
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">
            {comment.author.nickname}
          </span>
          <span className="text-gray-400 text-xs">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>

        <p className="mt-1 text-sm leading-relaxed">
          {comment.content}
        </p>

        {/* 액션 */}
        <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <span className="text-xs text-gray-600">답글 달기</span>
          </div>

          <div
            onClick={handleLike}
            className="flex items-center gap-1"
          >
            <img
              src={
                liked
                  ? '/icon/likeActive.svg'
                  : '/icon/like.svg'
              }
              alt="like"
              className="w-4 h-4"
            />
            <span className="text-xs text-gray-600">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;