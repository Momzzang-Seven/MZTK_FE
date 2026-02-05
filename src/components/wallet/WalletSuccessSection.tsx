import type { ReactNode } from "react";
import Lottie from "lottie-react";
import runnerAnimation from "@assets/runner.json";
import { CommonButton } from "@components/common";

type WalletSuccessSectionProps = {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  onConfirm: () => void;
  buttonLabel?: string;
};

export const WalletSuccessSection = ({
  title,
  description,
  children,
  onConfirm,
  buttonLabel = "모두 이해했어요",
}: WalletSuccessSectionProps) => {
  return (
    <div className="flex flex-col h-full animate-in zoom-in duration-500 pt-16 pb-6">
      <h1 className="font-gmarket text-[28px] mb-4">
        {title ?? (
          <>
            모든 설정이 <br /> 완료되었습니다!
          </>
        )}
      </h1>

      {description && (
        <p className="body text-color-grey-deep mb-6">{description}</p>
      )}

      <div className="flex-1 flex justify-center items-center mb-6">
        <Lottie animationData={runnerAnimation} className="w-64" />
      </div>

      {children}

      <CommonButton
        label={buttonLabel}
        bgColor="bg-main"
        textColor="text-black"
        className="mt-6 h-[60px] rounded-xl font-gmarket text-lg active:scale-95 transition-all"
        onClick={onConfirm}
      />
    </div>
  );
};
