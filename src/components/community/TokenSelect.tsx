import { CurrentTkn } from "@components/my";

interface TokenSelectProps {
  setRewardToken: React.Dispatch<React.SetStateAction<number>>;
}

const TokenSelect = ({ setRewardToken }: TokenSelectProps) => {
  const onIncrease = () => {
    setRewardToken((prev) => prev + 1);
  };

  const onDecrease = () => {
    setRewardToken((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <CurrentTkn />
      <div onClick={onIncrease}>+</div>
      <div onClick={onDecrease}>-</div>
    </div>
  );
};

export default TokenSelect;
