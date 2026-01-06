export const CurrentTkn = () => {
  const tknAmount = 1234567;

  return (
    <div className="flex flex-row rounded-lg p-4 bg-gradient-to-r from-main to-sub w-full h-20 items-center justify-between text-white">
      {/* token label */}
      <div className="flex flex-row gap-x-4 items-center">
        <img src="/icon/token.svg" alt="tokenIcon" />
        <div className="label-bold">보유 토큰</div>
      </div>
      {/* token amount */}
      <div className="flex flex-row gap-x-4 items-center">
        <div className="text-2xl font-bold">{tknAmount.toLocaleString()}</div>
        <div className="body">MZT</div>
      </div>
    </div>
  );
};
