interface MyPostActionsProps {
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  handleCancelClick: () => void;
}

const MyPostActions = ({
  handleEditClick,
  handleDeleteClick,
  handleCancelClick,
}: MyPostActionsProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3">
      <div
        className="flex flex-row items-center justify-center bg-main text-white text-lg font-semibold p-[11.5px] border rounded-full cursor-pointer"
        onClick={handleEditClick}
      >
        수정하기
      </div>
      <div
        className="flex flex-row items-center justify-center bg-red-400 text-white text-lg font-semibold p-[11.5px] border rounded-full cursor-pointer"
        onClick={handleDeleteClick}
      >
        삭제하기
      </div>
      <div
        className="text-base font-normal underline cursor-pointer"
        onClick={handleCancelClick}
      >
        취소
      </div>
    </div>
  );
};

export default MyPostActions;
