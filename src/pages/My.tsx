import {
  CurrentTkn,
  LevelProgress,
  LevelReward,
  TxTkn,
  UserProfile,
} from "@components/my";

const My = () => {
  return (
    <div className="flex flex-1 flex-col pt-[38px] px-[22px] gap-y-5 items-start justify-start">
      <UserProfile />
      <CurrentTkn />
      <TxTkn />
      <LevelProgress />
      <LevelReward />
    </div>
  );
};

export default My;
