interface ConfirmDeleteProps {
  handleConfirmClick: () => void;
  handleCancelClick: () => void;
}

const ConfirmDelete = ({
  handleConfirmClick,
  handleCancelClick,
}: ConfirmDeleteProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-16">
        정말 이 게시물/댓글을 삭제하시겠습니까?
        <br />
        삭제된 게시물은 복구할 수 없습니다.
      </div>
      <div
        className="flex flex-row items-center justify-center bg-red-400 text-white text-lg font-semibold p-[11.5px] border rounded-full cursor-pointer"
        onClick={handleConfirmClick}
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

export default ConfirmDelete;
