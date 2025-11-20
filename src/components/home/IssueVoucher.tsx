import { useState } from "react";

interface IssueVoucherProps {
  onIssue: (code: string, amount: string) => void;
}

export const IssueVoucher = ({ onIssue }: IssueVoucherProps) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [amount, setAmount] = useState("1");

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Issue Voucher</h3>
      <input
        type="text"
        placeholder="Enter voucher code"
        value={voucherCode}
        onChange={(e) => setVoucherCode(e.target.value)}
        className="border p-1 mr-2"
      />
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-1 mr-2 w-20"
      />
      <button
        onClick={() => onIssue(voucherCode, amount)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Issue
      </button>
    </div>
  );
};
