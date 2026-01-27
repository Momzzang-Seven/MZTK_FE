import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonModal } from "@components/common";

interface PostActionListProps {
  type: string;
  postId: number;
  authorId: number;
  icon: React.ReactNode;
}

const PostActionList = ({
  type,
  postId,
  authorId,
  icon,
}: PostActionListProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const stored = localStorage.getItem("user-storage");
  const userId = stored ? JSON.parse(stored)?.state?.user?.userId : null;
  const isMyPost = userId !== null && authorId === userId;

  const closeModal = () => setIsOpen(false);

  const handleEditClick = () => {
    if (type === "question") navigate("/community/edit/question/" + postId);
    if (type === "answer") navigate("/community/edit/answer/" + postId);
    if (type === "free") navigate("/community/edit/free/" + postId);
  };

  const myPostActions = (
    <div className="w-full flex flex-col gap-y-3">
      <div
        className="flex flex-row items-center justify-center bg-[#fab12f] text-white text-lg font-semibold p-[11.5px] border rounded-full cursor-pointer"
        onClick={handleEditClick}
      >
        수정하기
      </div>
      <div
        className="flex flex-row items-center justify-center bg-red-400 text-white text-lg font-semibold p-[11.5px] border rounded-full cursor-pointer"
        onClick={() => {}}
      >
        삭제하기
      </div>
      <div
        className="text-base font-normal underline cursor-pointer"
        onClick={closeModal}
      >
        취소
      </div>
    </div>
  );

  const otherPostActions = (
    <div className="w-full flex flex-col gap-y-3">
      <div
        className="flex flex-row items-center justify-center bg-red-400 text-white text-lg font-semibold p-[11.5px] border rounded-full cursor-pointer"
        onClick={() => {}}
      >
        신고하기
      </div>
      <div
        className="text-base font-normal underline cursor-pointer"
        onClick={closeModal}
      >
        취소
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{icon}</button>

      {isOpen && (
        <CommonModal>{isMyPost ? myPostActions : otherPostActions}</CommonModal>
      )}
    </>
  );
};

export default PostActionList;
