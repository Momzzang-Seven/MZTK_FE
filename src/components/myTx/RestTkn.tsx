export const RestTkn = () => {
  const tknAmount = 1234567;
  const handleClickRefresh = () => {
    alert("잔액이 새로고침 되었습니다.");
  };

  return (
    <div className="flex flex-col rounded-lg p-6 bg-gradient-to-r from-main to-sub w-full h-fit items-start justify-center text-white">
      {/* token label */}
      <div className="flex flex-row w-full gap-x-4 items-center justify-between">
        <div className="flex flex-row gap-x-2 items-center">
          <img
            src="/icon/token.svg"
            alt="tokenIcon"
            className="bg-white/20 rounded-full w-8 h-8 p-1"
          />
          <div className="label-bold">사용 가능한 잔액</div>
        </div>
        <div
          className="flex flex-row gap-x-2 bg-white/20 rounded-lg py-1 px-3"
          onClick={handleClickRefresh}
        >
          <img src="/icon/refresh.svg" alt="refreshIcon" /> 새로고침
        </div>
      </div>
      {/* token amount */}
      <div className="flex flex-row gap-x-4 items-center">
        <div className="text-[30px] font-bold">
          {tknAmount.toLocaleString()}
        </div>
        <div className="body">MZT</div>
      </div>
    </div>
  );
};
