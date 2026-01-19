interface Props {
  userInputs: string[];
  emptyIndices: number[];
  onChange: (idx: number, val: string) => void;
  onVerify: () => void;
}

export const MnemonicVerify = ({
  userInputs,
  emptyIndices,
  onChange,
  onVerify,
}: Props) => (
  <div className="flex flex-col h-full pt-16 animate-in slide-in-from-right duration-300">
    <h1 className="font-gmarket text-[28px] leading-tight mb-4">
      비밀복구구문을 <br /> 확인해주세요
    </h1>
    <p className="body text-color-grey-deep mb-10">
      빈 칸을 올바르게 채운 후, <br /> 입력 완료 버튼을 눌러주세요
    </p>

    <div className="grid grid-cols-3 gap-3 my-10">
      {userInputs.map((word, i) => (
        <input
          key={i}
          value={word}
          onChange={(e) => onChange(i, e.target.value)}
          disabled={!emptyIndices.includes(i)}
          className={`h-[52px] border rounded-xl text-center text-sm outline-none transition-all ${
            emptyIndices.includes(i)
              ? "border-main bg-white"
              : "border-gray-100 bg-gray-50 text-gray-400"
          }`}
        />
      ))}
    </div>
    <button
      onClick={onVerify}
      className="w-full h-[60px] bg-main text-black rounded-xl font-gmarket mt-auto mb-6"
    >
      입력 완료했어요
    </button>
  </div>
);
