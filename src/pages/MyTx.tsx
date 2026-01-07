import { CommonButton } from "@components/common";
import { RestTkn, WithdrawAddr, WithdrawAmt } from "@components/myTx";

const My = () => {
  const tokenAmt = 123456;
  return (
    <div className="flex flex-1 flex-col pt-[38px] px-[22px] gap-y-5 items-start justify-start">
      <RestTkn amt={tokenAmt} />
      <WithdrawAmt amt={tokenAmt} />
      <WithdrawAddr />

      <CommonButton label="송금 요청" padding="p-4" />
    </div>
  );
};

export default My;
