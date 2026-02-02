import { useState, useEffect, useCallback, useMemo } from "react";
import { ethers } from "ethers";
import { CommonModal } from "@components/common";
import {
  MyTxMainSection,
  MyTxPinSection,
  MyTxStatusSection,
} from "@components/myTx";

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

  const isAmountValid = useMemo(() => {
    const numericAmount = Number(amount);
    if (!amount || Number.isNaN(numericAmount)) return false;
    if (numericAmount <= 0) return false;
    if (numericAmount > balance) return false;
    return true;
  }, [amount, balance]);

  const isAddressValid = useMemo(() => {
    if (!address) return false;
    try {
      return ethers.isAddress(
        address.startsWith("0x") ? address : `0x${address}`
      );
    } catch {
      return false;
    }
  }, [address]);

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
        setErrorModal(
          "PIN 번호가 틀렸거나 잔액이 부족하거나 주소가 유효하지 않습니다."
        );
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
        <MyTxMainSection
          balance={balance}
          amount={amount}
          address={address}
          isAmountValid={isAmountValid}
          isAddressValid={isAddressValid}
          onChangeAmount={setAmount}
          onChangeAddress={setAddress}
          onNext={() => setStep("PIN_CHECK")}
        />
      )}

      {step === "PIN_CHECK" && (
        <MyTxPinSection
          inputPin={inputPin}
          onInput={(n) => setInputPin((p) => p + n)}
          onDelete={() => setInputPin((p) => p.slice(0, -1))}
        />
      )}

      {(step === "SENDING" || step === "SUCCESS") && (
        <MyTxStatusSection
          step={step === "SENDING" ? "SENDING" : "SUCCESS"}
          txHash={txHash}
          onReset={() => {
            setStep("MAIN");
            setAmount("");
            setAddress("");
          }}
        />
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
