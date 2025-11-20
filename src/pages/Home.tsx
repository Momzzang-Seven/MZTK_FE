import { IssueVoucher, RedeemVoucher } from "@components/home";
import { useVoucher } from "@hooks/useVoucher";

const VOUCHER_ADDRESS = import.meta.env.VITE_VOUCHER_ADDRESS;

const Home = () => {
  const { account, tokenBalance, issueVoucher, redeemVoucher } =
    useVoucher(VOUCHER_ADDRESS);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Voucher Dashboard</h2>
      <p>Connected account: {account}</p>
      <p>Voucher contract token balance: {tokenBalance}</p>

      <IssueVoucher onIssue={issueVoucher} />
      <RedeemVoucher onRedeem={redeemVoucher} />
    </div>
  );
};

export default Home;
