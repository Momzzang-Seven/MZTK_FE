import type { PostType } from "@types";

interface SharePostProps {
  type: PostType;
  postId: number;
}

const SharePost = ({ type, postId }: SharePostProps) => {
  const handleShareClick = () => {
    if (!navigator.share) {
      console.log("Web Share API를 지원하지 않는 환경입니다.");
      return;
    }

    const basePathByType: Record<PostType, string> = {
      free: "https://mztk.vercel.app/community/free/",
      question: "https://mztk.vercel.app/community/question/",
    };

    const url = basePathByType[type] + postId;

    navigator
      .share({
        title: "몸짱코인 게시물 공유하기",
        url,
      })
      .catch((error) => console.log("공유 실패:", error));
  };

  return (
    <div
      className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
      onClick={handleShareClick}
    >
      <img src="/icon/share.svg" alt="공유" className="w-5 h-5" />
    </div>
  );
};

export default SharePost;
