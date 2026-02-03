import { useState, useEffect } from "react";
import { useUserStore } from "@store/userStore";
import { useNavigate } from "react-router-dom";
import { RecordHeader } from "@components/record/RecordHeader";
import { PhotoUploader } from "@components/common/PhotoUploader";
import { RecordAnalyzing } from "@components/record/RecordAnalyzing";
import { CommonButton } from "@components/common";
import { RECORD_TEXT } from "@constant/record";

const RecordAuth = () => {
  const navigate = useNavigate();
  const { startAnalysis } = useUserStore();
  const [step, setStep] = useState<"upload" | "analyzing">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Async Analysis Redirect Effect
  useEffect(() => {
    if (step === "analyzing") {
      // Start the analysis (mock)
      startAnalysis("record");

      // Redirect to home after 2 seconds
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, navigate, startAnalysis]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert(RECORD_TEXT.ALERT_NO_FILE);
      return;
    }
    setStep("analyzing");
  };

  return (
    <div className="flex flex-col h-full bg-white px-5 pt-6 pb-20 overflow-y-auto min-h-screen">
      <RecordHeader />

      {/* Step 1: Upload */}
      {step === "upload" && (
        <>
          <PhotoUploader
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
            guideTitle={RECORD_TEXT.GUIDE_TITLE}
            guideDesc={RECORD_TEXT.GUIDE_DESC}
            uploadNoImageText={RECORD_TEXT.UPLOAD_NO_IMAGE}
            uploadSizeHintText={RECORD_TEXT.UPLOAD_SIZE_HINT}
          />

          <CommonButton
            label={RECORD_TEXT.BTN_REGISTER}
            onClick={handleUpload}
            disabled={!selectedFile}
            bgColor={selectedFile ? "bg-white" : "bg-white"}
            textColor={selectedFile ? "text-main" : "text-gray-300"}
            border={selectedFile ? "border-2 border-main" : "border-2 border-gray-300 cursor-not-allowed"}
            className={`font-bold py-4 rounded-2xl text-xl transition-all shadow-none ${selectedFile ? "shadow-md active:scale-95" : ""}`}
          />
        </>
      )}

      {/* Step 2: Analyzing (Async Wait Screen) */}
      {step === "analyzing" && <RecordAnalyzing />}
    </div>
  );
};

export default RecordAuth;
