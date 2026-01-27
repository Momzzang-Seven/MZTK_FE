import DOMPurify from "dompurify";
import { CommonButton } from "./CommonButton";

interface CommonModalProps {
  title?: string;
  desc?: string;
  confirmLabel?: string;
  onConfirmClick?: () => void;
  cancelLabel?: string;
  onCancelClick?: () => void;
  children?: React.ReactNode;
}

export const CommonModal = ({
  title,
  desc,
  confirmLabel,
  onConfirmClick,
  cancelLabel,
  onCancelClick,
  children,
}: CommonModalProps) => {
  return (
    <div className="z-[999] fixed inset-0 bg-black/38 flex flex-col justify-center items-center">
      <div className="rounded-[12px] flex flex-col justify-center items-center text-center gap-y-5 p-5 bg-white h-fit w-[350px]">
        {/* title & desc */}
        <div className="flex flex-col gap-y-2">
          <div className="title">{title}</div>
          <div
            className="body"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc ?? "") }}
          />
        </div>
        {children ?? (
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc ?? "") }}
          />
        )}
        <div className="w-full flex flex-row gap-x-4">
          {/* cancel btn */}
          {cancelLabel && (
            <CommonButton
              label={cancelLabel}
              onClick={onCancelClick}
              bgColor="bg-sub"
            />
          )}
          {/* cfm btn */}
          {confirmLabel && (
            <CommonButton label={confirmLabel} onClick={onConfirmClick} />
          )}
        </div>
      </div>
    </div>
  );
};
