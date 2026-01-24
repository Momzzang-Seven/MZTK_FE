import React, { useState } from "react";

interface Props {
  mnemonics: string[];
  onChange: (idx: number, value: string) => void;
  onBulkChange: (words: string[]) => void;
  onSubmit: () => void;
}

export const MnemonicForm = ({
  mnemonics,
  onChange,
  onBulkChange,
  onSubmit,
}: Props) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" && idx < 11) {
      e.preventDefault();
      document.getElementById(`mnemonic-${idx + 1}`)?.focus();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const words = text.trim().split(/\s+/);
      if (words.length === 12) {
        onBulkChange(words);
      } else {
        showToast("클립보드에 12개의 단어가 필요합니다");
      }
    } catch {
      showToast(
        "클립보드 접근이 거부되었습니다. 브라우저 설정에서 허용해주세요"
      );
    }
  };

  const handleClearAll = () => {
    onBulkChange(Array(12).fill(""));
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

      <div className="flex flex-col gap-y-2 my-10">
        <div className="flex items-center justify-between">
          <span className="label-bold text-color-grey-deep">니모닉</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-color-grey-deep hover:text-red-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              </svg>
              모두삭제
            </button>
            <button
              type="button"
              onClick={handlePaste}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-color-grey-deep hover:text-main transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              붙여넣기
            </button>
          </div>
        </div>
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

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-xl text-sm animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[90%] text-center">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default MnemonicForm;
