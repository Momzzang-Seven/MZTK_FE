import React from "react";

interface Props {
  mnemonics: string[];
  onChange: (idx: number, value: string) => void;
  onSubmit: () => void;
}

export const MnemonicForm = ({ mnemonics, onChange, onSubmit }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" && idx < 11) {
      e.preventDefault();
      document.getElementById(`mnemonic-${idx + 1}`)?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mt-16 mb-10">
        <h1 className="font-gmarket text-[28px] leading-tight mb-4">
          비밀복구구문을 <br /> 입력해주세요
        </h1>
        <p className="body text-color-grey-deep">
          이미 사용 중인 지갑이 없다면, <br /> 뒤로 가기를 눌러 지갑을
          생성해주세요!
        </p>
      </div>

      <div className="flex flex-col gap-y-2 mb-8">
        <span className="label-bold text-color-grey-deep">니모닉</span>
        <div className="grid grid-cols-3 gap-3">
          {mnemonics.map((word, idx) => (
            <input
              key={idx}
              id={`mnemonic-${idx}`}
              type="text"
              value={word}
              onChange={(e) => onChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              placeholder={(idx + 1).toString()}
              className="w-full h-[52px] border border-gray-200 rounded-xl text-center font-sans focus:border-main outline-none transition-all"
              autoComplete="off"
            />
          ))}
        </div>
      </div>

      <div className="mt-auto pb-6">
        <button
          onClick={onSubmit}
          disabled={mnemonics.some((w) => w.trim() === "")}
          className="w-full h-[60px] bg-main text-black rounded-xl font-gmarket text-lg disabled:bg-gray-200 disabled:text-gray-400"
        >
          지갑 등록하기
        </button>
      </div>
    </div>
  );
};

export default MnemonicForm;
