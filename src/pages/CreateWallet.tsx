import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ethers, HDNodeWallet } from "ethers";
import Lottie from "lottie-react";
import runnerAnimation from "@assets/runner.json";
import { MnemonicDisplay } from "../components/auth/MnemonicDisplay";
import { MnemonicVerify } from "../components/auth/MnemonicVerify";
import { PinPad } from "../components/auth/PinPad";
import { CommonModal } from "../components/common/CommonModal";

type Step = "SHOW" | "VERIFY" | "PIN_SET" | "PIN_CONFIRM" | "SUCCESS";

const CreateWallet = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("SHOW");

  const [wallet, setWallet] = useState<HDNodeWallet | null>(null);
  const [mnemonics, setMnemonics] = useState<string[]>([]);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [modal, setModal] = useState<{ title: string; desc: string } | null>(
    null
  );

  const emptyIndices = useMemo(() => [1, 4, 7, 10], []);

  useEffect(() => {
    const newWallet = ethers.Wallet.createRandom();
    const words = newWallet.mnemonic?.phrase.split(" ") || [];
    setWallet(newWallet);
    setMnemonics(words);

    const initial = [...words];
    emptyIndices.forEach((idx) => (initial[idx] = ""));
    setUserInputs(initial);
  }, [emptyIndices]);

  const handleVerify = () => {
    const isSuccess = userInputs.every((word, i) => word === mnemonics[i]);
    if (isSuccess) setStep("PIN_SET");
    else
      setModal({
        title: "비밀복구 구문 확인에 실패했습니다.",
        desc: "빈 칸을 올바르게 채워주세요.",
      });
  };

  const finalize = useCallback(async () => {
    if (!wallet) return;
    try {
      const encrypted = await wallet.encrypt(pin);
      localStorage.setItem("encrypted_wallet", encrypted);
      localStorage.setItem("wallet_address", wallet.address);
      setStep("SUCCESS");
    } catch {
      alert("보안 저장 중 오류가 발생했습니다.");
    }
  }, [wallet, pin]);

  useEffect(() => {
    if (pin.length === 6 && step === "PIN_SET") setStep("PIN_CONFIRM");
    if (confirmPin.length === 6 && step === "PIN_CONFIRM") {
      if (pin === confirmPin) finalize();
      else {
        setModal({
          title: "PIN 번호 확인에 실패했습니다.",
          desc: "올바른 PIN 번호를 입력해주세요.",
        });
      }
    }
  }, [pin, confirmPin, step, finalize]);

  return (
    <div className="flex flex-col h-screen bg-white px-6 overflow-hidden">
      {step === "SHOW" && (
        <MnemonicDisplay
          mnemonics={mnemonics}
          onNext={() => setStep("VERIFY")}
        />
      )}

      {step === "VERIFY" && (
        <MnemonicVerify
          userInputs={userInputs}
          emptyIndices={emptyIndices}
          onChange={(i, v) => {
            const next = [...userInputs];
            next[i] = v;
            setUserInputs(next);
          }}
          onVerify={handleVerify}
        />
      )}

      {(step === "PIN_SET" || step === "PIN_CONFIRM") && (
        <PinPad
          title={
            step === "PIN_SET"
              ? "PIN 번호를 등록해주세요"
              : "PIN 번호를 확인해주세요"
          }
          pin={step === "PIN_SET" ? pin : confirmPin}
          onInput={(n) =>
            step === "PIN_SET"
              ? setPin((p) => p + n)
              : setConfirmPin((p) => p + n)
          }
          onDelete={() =>
            step === "PIN_SET"
              ? setPin((p) => p.slice(0, -1))
              : setConfirmPin((p) => p.slice(0, -1))
          }
        />
      )}

      {step === "SUCCESS" && (
        <div className="flex flex-col h-full animate-in zoom-in duration-500 pt-16 pb-6 text-left">
          <h1 className="font-gmarket text-[28px] mb-4">
            모든 설정이 <br /> 완료되었습니다!
          </h1>
          <p className="body text-color-grey-deep mb-10">
            비밀 복구 구문을 안전하게 보관할 책임은 <br /> 본인에게 있습니다.
          </p>
          <div className="flex-1 flex justify-center items-center">
            <Lottie animationData={runnerAnimation} className="w-56" />
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <p className="body-bold text-black mb-3">안전한 보관 관련 팁</p>
            <ul className="text-[12.5px] text-color-grey-deep space-y-1.5 list-disc pl-4">
              <li>백업을 여러 장소에 보관하세요.</li>
              <li>구문을 누구와도 공유하지 마세요.</li>
              <li>피싱에 유의하세요.</li>
              <li>저희 서비스에선 비밀 복구 구문을 복구할 수 없습니다.</li>
            </ul>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-full h-[60px] bg-main rounded-xl font-gmarket text-lg active:scale-95 transition-all"
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

export default CreateWallet;
