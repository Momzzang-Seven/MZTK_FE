import { useState, useEffect } from "react";
import { useUserStore } from "@store/userStore";
import { useNavigate } from "react-router-dom";
import { ExerciseHeader } from "@components/exercise/ExerciseHeader";
import { ExercisePhotoUploader } from "@components/exercise/ExercisePhotoUploader";
import { ExerciseAnalyzing } from "@components/exercise/ExerciseAnalyzing";
import { CommonButton } from "@components/common";
import { EXERCISE_TEXT } from "@constant/exercise";

const ExerciseAuth = () => {
  const navigate = useNavigate();
  const { startAnalysis } = useUserStore();
  const [step, setStep] = useState<"upload" | "analyzing">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Async Analysis Redirect Effect
  useEffect(() => {
    if (step === "analyzing") {
      // Start the analysis (mock)
      startAnalysis("exercise");

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
      alert(EXERCISE_TEXT.ALERT_NO_FILE);
      return;
    }
    setStep("analyzing");
  };

  return (
    <div className="flex flex-col h-full bg-white px-5 pt-6 pb-20 overflow-y-auto min-h-screen">
      <ExerciseHeader />

      {/* Step 1: Upload */}
      {step === "upload" && (
        <>
          <ExercisePhotoUploader
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
          />

          <CommonButton
            label={EXERCISE_TEXT.BTN_REGISTER}
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
      {step === "analyzing" && <ExerciseAnalyzing />}
    </div>
  );
};

export default ExerciseAuth;
