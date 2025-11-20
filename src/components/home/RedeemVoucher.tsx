import { useState } from "react";

interface RedeemVoucherProps {
  onRedeem: (code: string) => void;
}

export const RedeemVoucher = ({ onRedeem }: RedeemVoucherProps) => {
  const [redeemCode, setRedeemCode] = useState("");

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Redeem Voucher</h3>
      <input
        type="text"
        placeholder="Enter voucher code"
        value={redeemCode}
        onChange={(e) => setRedeemCode(e.target.value)}
        className="border p-1 mr-2"
      />
      <button
        onClick={() => onRedeem(redeemCode)}
        className="bg-green-500 text-white p-2 rounded"
      >
        Redeem
      </button>
    </div>
  );
};
