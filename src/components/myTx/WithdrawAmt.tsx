import { useState } from "react";

export const WithdrawAmt = ({ amt }: { amt: number }) => {
  const [tknAmount, setTknAmount] = useState("");
  const percentageList = [25, 50, 75, 100];
  const handlePercentageClick = (percentage: number) => {
    const amount = percentage === 100 ? amt : (amt * percentage) / 100;

    setTknAmount(amount.toString());
  };

  return (
    <div className="flex flex-col rounded-lg w-full h-fit gap-y-3 items-start justify-start">
      <div className="flex justify-between w-full">
        <div className="text-grey-deep label">출금 금액</div>
      </div>

      <div className="flex flex-col rounded-lg p-6 w-full h-fit gap-y-3 items-start justify-start border border-1 border-grey-main">
        {/* token amount */}
        <div className="w-full flex flex-row gap-x-2 items-end justify-end">
          <input
            className="text-[30px] font-bold flex-1 w-full text-right outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={tknAmount}
            onChange={(e) => setTknAmount(e.target.value)}
            placeholder="0"
          />
          <div className="body shrink-0 pb-2">MZT</div>
        </div>

        {/* token percentage */}
        <div className="flex flex-row gap-x-2 w-full">
          {percentageList.map((percentage) => (
            <button
              key={percentage}
              type="button"
              onClick={() => handlePercentageClick(percentage)}
              className={`${
                percentage === 100
                  ? "bg-main text-white"
                  : "bg-grey-pale text-grey-deep"
              } w-full text-center rounded-xl py-2 px-3 label hover:opacity-80 transition-all`}
            >
              {percentage === 100 ? "전체" : `${percentage}%`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
