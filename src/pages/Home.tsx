import { CommonButton } from "@components/common";
import { IssueVoucher, RedeemVoucher } from "@components/home";
import { useVoucher } from "@hooks/useVoucher";
import { useNavigate } from "react-router-dom";

const VOUCHER_ADDRESS = import.meta.env.VITE_VOUCHER_ADDRESS;

const Home = () => {
  const navigate = useNavigate();
  const { account, tokenBalance, issueVoucher, redeemVoucher } =
    useVoucher(VOUCHER_ADDRESS);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Voucher Dashboard</h2>
      <p>Connected account: {account}</p>
      <p>Voucher contract token balance: {tokenBalance}</p>

      <IssueVoucher onIssue={issueVoucher} />
      <RedeemVoucher onRedeem={redeemVoucher} />

      <CommonButton
        label="로그인 체험 - 로컬 DB 기준 동작"
        className="mt-5"
        textColor="text-black"
        bgColor="bg-main"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};

export default Home;
