import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ExerciseAuth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"upload" | "analyzing" | "result">("upload");
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock Analysis Effect
  useEffect(() => {
    if (step === "analyzing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep("result");
            return 100;
          }
          return prev + 2; // Speed of progress
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

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
    // In a real app, handle actual file upload logic here
    setStep("analyzing");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full bg-white px-5 pt-6 pb-20 overflow-y-auto min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-left text-[#FAB12F] mb-8">
        운동 인증하기
      </h1>

      {/* Step 1: Upload */}
      {step === "upload" && (
        <div className="flex flex-col flex-1 animate-fade-in">
          {/* Guide Banner */}
          <div className="bg-[#FAB12F] text-white p-4 rounded-xl mb-6 shadow-md">
            <div className="flex items-start gap-2">
              <span className="font-bold bg-white text-[#FAB12F] rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 shrink-0">
                1
              </span>
              <p className="font-medium text-sm leading-relaxed">
                러닝 기록이 보이는 사진이나 파일을 올려주세요.
                <br />
                업로드하신 사진은 자동으로 분석됩니다.
              </p>
            </div>
          </div>

          {/* Image Upload Area */}
          <div
            onClick={triggerFileUpload}
            className="flex-1 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 mb-8 min-h-[300px] border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden relative"
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
              <>
                <div className="bg-gray-200 p-4 rounded-full mb-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <p className="text-sm">등록된 사진이 없습니다.</p>
                <p className="text-xs mt-1">권장 크기 750x750 (px)</p>
              </>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className={`w-full font-bold py-4 rounded-2xl shadow-md transition-colors text-lg ${
              selectedFile
                ? "bg-[#FAB12F] hover:opacity-90 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            등록
          </button>
        </div>
      )}

      {/* Step 2: Analyzing */}
      {step === "analyzing" && (
        <div className="flex flex-col flex-1 items-center justify-center animate-fade-in relative">
          {/* Tip Banner */}
          <div className="absolute top-0 w-full bg-gradient-to-r from-[#FAB12F] to-[#FFCC00] text-white p-4 rounded-xl mb-10 shadow-md">
            <p className="font-bold text-sm mb-1">Tip.</p>
            <p className="text-sm">
              열심히 운동할수록 더 큰 보상을 받을 수 있어요!
            </p>
          </div>

          <div className="relative w-64 h-64 flex items-center justify-center mt-20">
            {/* SVG Circular Progress */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#f3f4f6"
                strokeWidth="16"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#FAB12F"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>
            {/* Percentage Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#FAB12F]">
                {progress}%
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#FAB12F] font-bold text-lg mb-1">
              분석 중이에요.
            </p>
            <p className="text-gray-500 text-sm">잠시만 기다려주세요.</p>
          </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === "result" && (
        <div className="flex flex-col flex-1 items-center justify-center animate-fade-in">
          {/* Dumbbell Icon - FontAwesome Solid */}
          <div className="mb-8 text-[#FAB12F]">
            <svg
              width="120"
              height="77"
              viewBox="0 0 100 64"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="12" width="14" height="40" rx="7" />
              <rect x="19" y="0" width="14" height="64" rx="7" />
              <rect x="33" y="26" width="34" height="12" />
              <rect x="67" y="0" width="14" height="64" rx="7" />
              <rect x="86" y="12" width="14" height="40" rx="7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-[#FAB12F] mb-2">
            오늘도 운동 성공!
          </h2>
          <p className="text-[#FAB12F] font-bold mb-10 text-xl">+10XP</p>

          <button
            onClick={handleHome}
            className="w-full bg-[#FAB12F] hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-md transition-colors text-lg"
          >
            홈으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseAuth;
