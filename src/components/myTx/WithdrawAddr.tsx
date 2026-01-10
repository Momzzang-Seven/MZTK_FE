import { useState } from "react";

export const WithdrawAddr = () => {
  const [address, setAddress] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddress(text);
    } catch (err) {
      console.error("클립보드 읽기 실패:", err);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-3">
      {/* Label */}
      <div className="text-grey-deep label">출금 주소</div>

      <div className="flex items-center w-full p-4 rounded-lg border border-grey-main bg-white h-[80px] overflow-hidden">
        <input
          className="flex-1 min-w-0 bg-transparent outline-none text-[18px] placeholder:text-grey-pale pr-4"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="지갑 주소를 입력하세요"
          spellCheck="false"
        />

        <button
          type="button"
          onClick={handlePaste}
          className="flex shrink-0 items-center gap-x-2 bg-grey-pale/50 hover:bg-grey-pale px-4 py-2.5 rounded-lg transition-all active:scale-95"
        >
          <img
            src="/icon/paste.svg"
            alt="paste"
            className="w-5 h-5 opacity-70"
          />
          <span className="text-grey-deep font-medium text-[16px] whitespace-nowrap">
            붙여넣기
          </span>
        </button>
      </div>
    </div>
  );
};
