import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { HOME_TEXT } from "@constant/home";

interface AuthChoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthChoiceModal = ({ isOpen, onClose }: AuthChoiceModalProps) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    // Handlers for each auth method
    const handleLocationAuth = () => {
        navigate("/verify");
        onClose();
    };

    const handleExerciseAuth = () => {
        navigate("/exercise-auth");
        onClose();
    };

    const handleRecordAuth = () => {
        navigate("/record-auth");
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl animate-fade-in-up z-10">
                <h2 className="text-center font-bold text-lg mb-8 tracking-tight">
                    {HOME_TEXT.MODAL.TITLE}
                </h2>

                <div className="flex justify-between items-center">
                    {/* Location Auth */}
                    <button
                        onClick={handleLocationAuth}
                        className="flex-1 flex flex-col items-center gap-3 group active:scale-95 transition-transform"
                    >
                        <div className="w-12 h-12 flex items-center justify-center text-[#FAB12F] mb-1">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <span className="text-base font-bold text-[#FAB12F]">{HOME_TEXT.MODAL.LOCATION}</span>
                    </button>

                    {/* Divider */}
                    <div className="w-[1.5px] h-16 bg-[#FAB12F]/20 mx-2"></div>

                    {/* Exercise Auth */}
                    <button
                        onClick={handleExerciseAuth}
                        className="flex-1 flex flex-col items-center gap-3 group active:scale-95 transition-transform"
                    >
                        <div className="w-12 h-12 flex items-center justify-center mb-1">
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "#FAB12F",
                                    maskImage: "url(/icon/dumbell.svg)",
                                    WebkitMaskImage: "url(/icon/dumbell.svg)",
                                    maskSize: "contain",
                                    WebkitMaskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    WebkitMaskRepeat: "no-repeat",
                                    maskPosition: "center",
                                    WebkitMaskPosition: "center"
                                }}
                            />
                        </div>
                        <span className="text-base font-bold text-[#FAB12F]">{HOME_TEXT.MODAL.EXERCISE}</span>
                    </button>

                    {/* Divider */}
                    <div className="w-[1.5px] h-16 bg-[#FAB12F]/20 mx-2"></div>

                    {/* Record Auth */}
                    <button
                        onClick={handleRecordAuth}
                        className="flex-1 flex flex-col items-center gap-3 group active:scale-95 transition-transform"
                    >
                        <div className="w-12 h-12 flex items-center justify-center mb-1">
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "#FAB12F",
                                    maskImage: "url(/icon/record.svg)",
                                    WebkitMaskImage: "url(/icon/record.svg)",
                                    maskSize: "contain",
                                    WebkitMaskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    WebkitMaskRepeat: "no-repeat",
                                    maskPosition: "center",
                                    WebkitMaskPosition: "center"
                                }}
                            />
                        </div>
                        <span className="text-base font-bold text-[#FAB12F]">{HOME_TEXT.MODAL.RECORD}</span>
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};
