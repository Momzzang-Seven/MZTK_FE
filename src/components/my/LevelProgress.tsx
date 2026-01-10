export const LevelProgress = () => {
  const level = 3;
  const nowXp = 1500;
  const restXp = 500;

  return (
   <div className="flex flex-col gap-x-3 rounded-lg p-4 gap-y-3 w-full h-fit items-center justify-center bg-white border border-main border-2">
      <div className="flex flex-row justify-between w-full">
        <div className="title">경험치 & 레벨</div>
        <div className="rounded-full bg-main text-white py-1 px-3">LV {level}</div>
      </div>
      {/* current xp */}
      <div className="flex flex-row justify-between w-full label text-grey-deep">
        <div>현재 경험치</div>
        <div>{nowXp.toLocaleString()} XP</div>
      </div>
      {/* progress bar */}
      <div className="w-full bg-grey-pale rounded-full h-4">
        <div
          className="bg-gradient-to-r from-main to-sub h-4 rounded-full"
          style={{ width: `${(nowXp / (nowXp + restXp)) * 100}%` }}
        />
      </div>
      {/* goal xp */}
      <div className="flex flex-row justify-between w-full label text-grey-deep">
        <div>목표 경험치</div>
      <div className="font-bold text-black">{restXp.toLocaleString()} XP</div>
      </div>
    </div>
  );
};
