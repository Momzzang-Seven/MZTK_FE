import { useTokenTransfer } from "@hooks/useTokenTransfer";
import { CommonModal } from "@components/common";
import {
  MyTxMainSection,
  MyTxPinSection,
  MyTxStatusSection,
} from "@components/token";
import { TOKEN_MESSAGES } from "@constant/token";

const MyToken = () => {
  const { state, actions } = useTokenTransfer();
  const {
    step,
    address,
    amount,
    balance,
    inputPin,
    txHash,
    errorModal,
    isAmountValid,
    isAddressValid,
  } = state;

  return (
    <div className="flex flex-1 flex-col bg-white">
      {step === "MAIN" && (
        <MyTxMainSection
          balance={balance}
          amount={amount}
          address={address}
          isAmountValid={isAmountValid}
          isAddressValid={isAddressValid}
          onChangeAmount={actions.setAmount}
          onChangeAddress={actions.setAddress}
          onNext={() => actions.setStep("PIN_CHECK")}
        />
      )}

      {step === "PIN_CHECK" && (
        <MyTxPinSection
          inputPin={inputPin}
          onInput={(n) => actions.setInputPin((p) => p + n)}
          onDelete={() => actions.setInputPin((p) => p.slice(0, -1))}
          onComplete={actions.handleTransfer}
        />
      )}

      {(step === "SENDING" || step === "SUCCESS") && (
        <MyTxStatusSection
          step={step}
          txHash={txHash}
          onReset={actions.resetForm}
        />
      )}

      {errorModal && (
        <CommonModal
          title={TOKEN_MESSAGES.MODAL.TITLE_FAILED}
          desc={errorModal}
          confirmLabel={TOKEN_MESSAGES.MODAL.CONFIRM_RETRY}
          onConfirmClick={() => actions.setErrorModal(null)}
        />
      )}
    </div>
  );
};

export default MyToken;
