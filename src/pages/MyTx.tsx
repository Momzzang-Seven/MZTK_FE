import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CommonButton } from "@components/common";
import { RestTkn, WithdrawAddr, WithdrawAmt } from "@components/myTx";
import PinPad from "@components/auth/PinPad";
import { CommonModal } from "@components/common";
import Lottie from "lottie-react";
import runnerAnimation from "@assets/runner.json";

type MyStep = "MAIN" | "PIN_CHECK" | "SENDING" | "SUCCESS";

const MyToken = () => {
  const [step, setStep] = useState<MyStep>("MAIN");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [inputPin, setInputPin] = useState("");
  const [txHash, setTxHash] = useState("");
  const [errorModal, setErrorModal] = useState<string | null>(null);

  const RPC_URL = import.meta.env.VITE_RPC_URL;
  const MZT_ADDR = import.meta.env.VITE_TOKEN_ADDRESS;

  useEffect(() => {
    const fetchBalance = async () => {
      const userAddr = localStorage.getItem("wallet_address");
      if (!userAddr || !RPC_URL || !MZT_ADDR) return;

      try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const ABI = [
          "function balanceOf(address owner) view returns (uint256)",
          "function decimals() view returns (uint8)",
        ];
        const contract = new ethers.Contract(MZT_ADDR, ABI, provider);

        const [rawBalance, decimals] = await Promise.all([
          contract.balanceOf(userAddr),
          contract.decimals(),
        ]);

        setBalance(Number(ethers.formatUnits(rawBalance, decimals)));
      } catch (e) {
        console.error("잔액 조회 실패", e);
      }
    };

    fetchBalance();
  }, [step, RPC_URL, MZT_ADDR]);

  const handleTransfer = useCallback(
    async (pin: string) => {
      setStep("SENDING");
      try {
        const encryptedJson = localStorage.getItem("encrypted_wallet");
        if (!encryptedJson) throw new Error("지갑 정보가 없습니다.");

        const wallet = await ethers.Wallet.fromEncryptedJson(
          encryptedJson,
          pin
        );

        if (!RPC_URL) throw new Error("RPC URL이 설정되지 않았습니다.");
        if (!MZT_ADDR) throw new Error("토큰 주소가 설정되지 않았습니다.");

        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const signer = wallet.connect(provider);

        const ABI = [
          "function transfer(address to, uint256 amount) returns (bool)",
        ];
        const contract = new ethers.Contract(MZT_ADDR, ABI, signer);

        const toAddress = address.startsWith("0x") ? address : `0x${address}`;

        console.log("송금 지갑 주소:", toAddress);

        const tx = await contract.transfer(
          toAddress,
          ethers.parseUnits(amount, 18)
        );
        setTxHash(tx.hash);

        await tx.wait();
        setStep("SUCCESS");
      } catch (e) {
        console.error(e);
        setStep("MAIN");
        setErrorModal("PIN 번호가 틀렸거나 잔액이 부족합니다.");
        setInputPin("");
      }
    },
    [address, amount, RPC_URL, MZT_ADDR]
  );

  useEffect(() => {
    if (inputPin.length === 6 && step === "PIN_CHECK") {
      handleTransfer(inputPin);
      setInputPin("");
    }
  }, [inputPin, step, handleTransfer]);

  return (
    <div className="flex flex-1 flex-col bg-white">
      {step === "MAIN" && (
        <div className="flex flex-1 flex-col pt-[38px] px-[22px] gap-y-5 animate-in fade-in">
          <RestTkn amt={balance} />
          <WithdrawAmt amt={balance} value={amount} onChange={setAmount} />
          <WithdrawAddr value={address} onChange={setAddress} />

          <div className="mt-auto pb-10">
            <CommonButton
              label="송금 요청"
              padding="p-4"
              onClick={() => setStep("PIN_CHECK")}
              disabled={
                !address ||
                !amount ||
                Number(amount) > balance ||
                Number(amount) <= 0
              }
            />
          </div>
        </div>
      )}

      {step === "PIN_CHECK" && (
        <div className="flex flex-col h-screen bg-white px-6 overflow-hidden">
          <PinPad
            title="PIN 번호를 입력해주세요"
            pin={inputPin}
            onInput={(n) => setInputPin((p) => p + n)}
            onDelete={() => setInputPin((p) => p.slice(0, -1))}
          />
        </div>
      )}

      {(step === "SENDING" || step === "SUCCESS") && (
        <div className="flex flex-col h-full px-6 pt-20 pb-10 items-center animate-in zoom-in">
          <h1 className="font-gmarket text-[28px] leading-tight mb-4 text-center">
            {step === "SENDING"
              ? "송금이 진행 중입니다"
              : "송금이 완료되었습니다!"}
          </h1>
          <p className="body text-color-grey-deep text-center mb-10">
            {step === "SENDING"
              ? "블록체인 네트워크에 기록 중입니다..."
              : `성공적으로 전송되었습니다.\nTX: ${txHash.slice(0, 10)}...`}
          </p>
          <div className="flex-1 flex justify-center items-center">
            <Lottie animationData={runnerAnimation} className="w-64" />
          </div>
          {step === "SUCCESS" && (
            <button
              onClick={() => {
                setStep("MAIN");
                setAmount("");
                setAddress("");
              }}
              className="w-full h-[60px] bg-main text-black rounded-xl font-gmarket text-lg active:scale-95 transition-all"
            >
              확의
            </button>
          )}
        </div>
      )}

      {errorModal && (
        <CommonModal
          title="송금 실패"
          desc={errorModal}
          confirmLabel="다시 시도하기"
          onConfirmClick={() => setErrorModal(null)}
        />
      )}
    </div>
  );
};

export default MyToken;
