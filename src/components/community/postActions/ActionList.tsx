import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonModal } from "@components/common";
import {
  MyPostActions,
  OtherPostActions,
  ConfirmDelete,
  ConfirmReport,
  EditComment,
} from "@components/community";
import type { ActionModalType } from "@types";

const sizeMap = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
} as const;

interface PostActionListProps {
  size?: "xs" | "sm" | "md" | "lg";
  type: string;
  id?: number;
  authorId: number;
  commentId?: number;
  commentContent?: string;
}

const ActionList = ({
  size = "md",
  type,
  id,
  authorId,
  commentContent = "",
}: PostActionListProps) => {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<ActionModalType>(null);

  const stored = localStorage.getItem("user-storage");
  const userId = stored ? JSON.parse(stored)?.state?.user?.userId : null;
  const isMine = userId !== null && authorId === userId;

  const openActionModal = () =>
    isMine ? setModalType("MY") : setModalType("OTHERS");

  const closeModal = () => setModalType(null);

  const handleEditClick = () => {
    if (type === "free") navigate("/community/edit/free/" + id);
    if (type === "question") navigate("/community/edit/question/" + id);
    if (type === "answer") navigate("/community/edit/answer/" + id);
    if (type === "comment") setModalType("EDIT_COMMENT");
  };

  const handleDeleteClick = () => {
    setModalType("DELETE_CONFIRM");
  };

  const handleReportClick = () => {
    setModalType("REPORT");
  };

  const handleConfirmDeletePostClick = () => {
    closeModal();
  };

  const handleConfirmReportPostClick = () => {
    closeModal();
  };

  const handleConfirmEditClick = () => {
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "MY":
        return (
          <MyPostActions
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleCancelClick={closeModal}
          />
        );

      case "OTHERS":
        return (
          <OtherPostActions
            handleReportClick={handleReportClick}
            handleCancelClick={closeModal}
          />
        );

      case "DELETE_CONFIRM":
        return (
          <ConfirmDelete
            handleConfirmClick={handleConfirmDeletePostClick}
            handleCancelClick={closeModal}
          />
        );

      case "REPORT":
        return (
          <ConfirmReport
            handleReportClick={handleConfirmReportPostClick}
            handleCancelClick={closeModal}
          />
        );

      case "EDIT_COMMENT":
        return (
          <EditComment
            commentContent={commentContent}
            handleEditClick={handleConfirmEditClick}
            handleCancelClick={closeModal}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div
        onClick={openActionModal}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
      >
        <img src="/icon/more.svg" alt="더보기" className={sizeMap[size]} />
      </div>

      {modalType && <CommonModal>{renderModalContent()}</CommonModal>}
    </>
  );
};

export default ActionList;
