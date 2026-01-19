import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Lottie from "lottie-react";
import runnerAnimation from "@assets/runner.json";
import { MnemonicForm } from "@components/auth/MnemonicForm";
import { PinPad } from "@components/auth/PinPad";
import { CommonModal } from "@components/common/CommonModal";

const RegisterWallet = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<
    "MNEMONIC" | "PIN_SET" | "PIN_CONFIRM" | "SUCCESS"
  >("MNEMONIC");

  const [mnemonics, setMnemonics] = useState<string[]>(Array(12).fill(""));
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [wallet, setWallet] = useState<ethers.HDNodeWallet | null>(null);
  const [modal, setModal] = useState<{ title: string; desc: string } | null>(
    null
  );

  const validateMnemonic = () => {
    try {
      const phrase = mnemonics.map((m) => m.trim().toLowerCase()).join(" ");
      const recoveredWallet = ethers.Wallet.fromPhrase(phrase);
      setWallet(recoveredWallet);
      setStep("PIN_SET");
    } catch {
      setModal({
        title: "비밀복구 구문 확인에 실패했습니다.",
        desc: "올바른 구문을 입력해주세요.",
      });
    }
  };

  const handleFinalize = useCallback(async () => {
    if (!wallet) return;
    const encryptedJson = await wallet.encrypt(pin);
    localStorage.setItem("encrypted_wallet", encryptedJson);
    setStep("SUCCESS");
  }, [wallet, pin]);

  useEffect(() => {
    if (pin.length === 6 && step === "PIN_SET") setStep("PIN_CONFIRM");
    if (confirmPin.length === 6 && step === "PIN_CONFIRM") {
      if (pin === confirmPin) handleFinalize();
      else
        setModal({
          title: "PIN 번호 확인에 실패했습니다.",
          desc: "올바른 PIN 번호를 입력해주세요.",
        });
    }
  }, [pin, step, confirmPin, handleFinalize]);

  return (
    <div className="flex flex-col h-screen bg-white px-6 overflow-hidden">
      {step === "MNEMONIC" && (
        <MnemonicForm
          mnemonics={mnemonics}
          onChange={(idx, val) => {
            const next = [...mnemonics];
            next[idx] = val;
            setMnemonics(next);
          }}
          onSubmit={validateMnemonic}
        />
      )}

      {step === "PIN_SET" && (
        <PinPad
          title="PIN 번호를 등록해주세요"
          pin={pin}
          onInput={(n) => setPin((p) => p + n)}
          onDelete={() => setPin((p) => p.slice(0, -1))}
        />
      )}

      {step === "PIN_CONFIRM" && (
        <PinPad
          title="PIN 번호를 확인해주세요"
          pin={confirmPin}
          onInput={(n) => setConfirmPin((p) => p + n)}
          onDelete={() => setConfirmPin((p) => p.slice(0, -1))}
        />
      )}

      {step === "SUCCESS" && (
        <div className="flex flex-col h-full animate-in zoom-in duration-500 pt-16 pb-6">
          <h1 className="font-gmarket text-[28px] mb-4">
            모든 설정이 <br /> 완료되었습니다!
          </h1>
          <div className="flex-1 flex justify-center items-center">
            <Lottie animationData={runnerAnimation} className="w-80" />
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-full h-[60px] bg-main rounded-xl font-gmarket"
          >
            모두 이해했어요
          </button>
        </div>
      )}

      {modal && (
        <CommonModal
          title={modal.title}
          desc={modal.desc}
          confirmLabel="다시 시도하기"
          onConfirmClick={() => {
            setModal(null);
            if (step === "PIN_CONFIRM") setConfirmPin("");
          }}
        />
      )}
    </div>
  );
};

export default RegisterWallet;
