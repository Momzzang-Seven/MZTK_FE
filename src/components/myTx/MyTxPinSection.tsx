import PinPad from "@components/auth/PinPad";

type MyTxPinSectionProps = {
  inputPin: string;
  onInput: (digit: string) => void;
  onDelete: () => void;
};

export const MyTxPinSection = ({
  inputPin,
  onInput,
  onDelete,
}: MyTxPinSectionProps) => {
  return (
    <div className="flex flex-col h-screen bg-white px-6 overflow-hidden">
      <PinPad
        title="PIN 번호를 입력해주세요"
        pin={inputPin}
        onInput={(num: number) => onInput(num.toString())}
        onDelete={onDelete}
      />
    </div>
  );
};
