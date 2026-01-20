import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@store/userStore";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import runnerAnimation from "@assets/runner.json";

const RecordAuth = () => {
  const navigate = useNavigate();
  const { startAnalysis } = useUserStore();
  const [step, setStep] = useState<"upload" | "analyzing">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("사진을 등록해주세요!");
      return;
    }
    setStep("analyzing");
  };

  return (
    <div className="flex flex-col h-full bg-white px-5 pt-6 pb-20 overflow-y-auto min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold text-left text-[#FAB12F] mb-8">
        기록 인증하기
      </h1>

      {/* Step 1: Upload */}
      {step === "upload" && (
        <div className="flex flex-col flex-1 animate-fade-in">
          {/* Guide Banner */}
          <div className="bg-[#FAB12F] text-white px-4 py-3 rounded-2xl mb-2 shadow-sm mt-4">
            <p className="font-bold text-xl leading-relaxed whitespace-pre-line text-left">
              러닝 기록 사진이나 파일을 올려주세요.
              <br />
              업로드하신 사진은 자동으로 분석됩니다.
            </p>
          </div>

          {/* Image Upload Area */}
          <div
            onClick={triggerFileUpload}
            className="w-full bg-[#F3F4F6] rounded-xl flex flex-col items-center justify-center text-gray-400 mb-6 h-[500px] cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden relative"
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 -mt-20">
                <p className="text-gray-500 font-bold text-lg">
                  등록된 사진이 없습니다.
                </p>
                <p className="text-gray-400 text-sm">권장 크기 750x750 (px)</p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className={`w-full font-bold py-4 rounded-2xl border-2 text-xl transition-all ${
              selectedFile
                ? "bg-white border-[#FAB12F] text-[#FAB12F] shadow-md active:scale-95"
                : "bg-white border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            disabled={!selectedFile}
          >
            등록
          </button>
        </div>
      )}

      {/* Step 2: Analyzing (Async Wait Screen) */}
      {step === "analyzing" && (
        <div className="flex flex-col flex-1 items-center justify-center animate-fade-in h-[60vh]">
          <div className="w-80 h-80">
            <Lottie animationData={runnerAnimation} loop={true} />
          </div>

          <p className="text-[#FAB12F] font-bold text-3xl text-center leading-tight">
            분석이 완료되면
            <br />
            알려드릴게요!
          </p>
        </div>
      )}
    </div>
  );
};

export default RecordAuth;
