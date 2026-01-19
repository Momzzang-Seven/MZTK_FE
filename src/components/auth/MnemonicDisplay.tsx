import { useState } from "react";

interface Props {
  mnemonics: string[];
  onNext: () => void;
}

export const MnemonicDisplay = ({ mnemonics, onNext }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mnemonics.join(" "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="flex flex-col h-full pt-16 animate-in fade-in duration-500">
      <h1 className="font-gmarket text-[28px] leading-tight mb-4">
        비밀복구구문을 <br /> 확인해주세요
      </h1>
      <p className="body text-color-grey-deep mb-10">
        비밀 복구 구문을 안전하게 보관할 책임은 <br /> 본인에게 있습니다.
      </p>

      <div className="grid grid-cols-3 gap-3 my-10">
        {mnemonics.map((word, i) => (
          <div
            key={i}
            className="h-[52px] flex items-center justify-center border border-gray-100 rounded-xl bg-gray-50 font-sans text-sm text-black"
          >
            {word}
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-3 pb-6">
        <button
          onClick={handleCopy}
          className={`w-full h-[60px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            copied
              ? "bg-main text-black"
              : "bg-[#FFF4E0] text-main border border-main/20"
          }`}
        >
          {copied ? "복사 완료!" : "복사"}
        </button>
        <button
          onClick={onNext}
          className="w-full h-[60px] bg-main text-black rounded-xl font-gmarket text-lg"
        >
          복사 완료했어요
        </button>
      </div>
    </div>
  );
};
