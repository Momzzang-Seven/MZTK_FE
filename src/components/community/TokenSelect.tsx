import { CurrentTkn } from "@components/my";
import { useTokenBalance } from "@hooks";

interface TokenSelectProps {
  setRewardToken: React.Dispatch<React.SetStateAction<number>>;
}

const TokenSelect = ({ setRewardToken }: TokenSelectProps) => {
  const { balance } = useTokenBalance();

  const onIncrease = () => {
    setRewardToken((prev) => {
      if (prev + 1 > Number(balance)) return prev;
      return prev + 1;
    });
  };

  const onDecrease = () => {
    setRewardToken((prev) => {
      if (prev - 1 < 0) return prev;
      return prev - 1;
    });
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
