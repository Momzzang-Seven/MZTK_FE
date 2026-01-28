interface ConfirmReportProps {
  handleReportClick: () => void;
  handleCancelClick: () => void;
}

const ConfirmReport = ({
  handleReportClick,
  handleCancelClick,
}: ConfirmReportProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="text-16">
        신고사유 드롭다운
        <br />
        (추가예정)
      </div>
      <div
        className="flex flex-row items-center justify-center bg-red-400 text-white text-lg font-semibold p-[11.5px] border rounded-full cursor-pointer"
        onClick={handleReportClick}
      >
        신고하기
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

export default ConfirmReport;
