import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@store/userStore";

// ... (existing imports, but this tool only replaces chunks, so I need to be careful with imports)
// Wait, I cannot add import at top and replace body in one go with replace_file_content unless contiguous.
// I will do two edits or use multi_replace.
// Let's use multi_replace.

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
    const { completeExercise } = useUserStore.getState();
    const result = completeExercise();
    if (result.success) {
      console.log("Exercise completed:", result.message);
    }
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full bg-white px-5 pt-6 pb-20 overflow-y-auto min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-left text-[#FAB12F] mb-14">
        운동 인증하기
      </h1>

      {/* Step 1: Upload */}
      {step === "upload" && (
        <div className="flex flex-col flex-1 animate-fade-in">
          {/* Guide Banner */}
          <div className="bg-[#FAB12F] text-white p-6 rounded-2xl mb-8 shadow-sm mt-2">
            <p className="font-bold text-lg leading-relaxed whitespace-pre-line text-left">
              땀 흘린 당신, 오늘의 운동을 인증하세요!
              <br />
              업로드하신 사진은 자동으로 분석됩니다.
            </p>
          </div>

          {/* Image Upload Area */}
          <div
            onClick={triggerFileUpload}
            className="flex-1 bg-[#F3F4F6] rounded-xl flex flex-col items-center justify-center text-gray-400 mb-8 min-h-[400px] cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden relative"
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
              <div className="flex flex-col items-center gap-2">
                {/* Red Badge for 2 if needed, but skipping for clean look as per text request first, or I can add a pseudo badge if user insists on exact match of the red bubbles. The user said 'screen like this', the red bubbles might be annotations. I will assume they are annotations. */}
                <p className="text-gray-500 font-bold text-lg">등록된 사진이 없습니다.</p>
                <p className="text-gray-400 text-sm">권장 크기 750x750 (px)</p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className={`w-full font-bold py-4 rounded-2xl border-2 text-xl transition-all ${selectedFile
              ? "bg-white border-[#FAB12F] text-[#FAB12F] shadow-md active:scale-95"
              : "bg-white border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            disabled={!selectedFile}
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
        <div className="flex flex-col flex-1 animate-fade-in">
          {/* Main Content (Centered) */}
          <div className="flex-grow flex flex-col items-center justify-center pt-32">
            {/* Dumbbell Icon - FontAwesome Solid */}
            <div className="mb-8 text-[#FAB12F]">
              <svg
                width="220"
                height="100"
                viewBox="0 0 150 64"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <rect x="0" y="12" width="14" height="40" rx="7" />
                <rect x="19" y="0" width="14" height="64" rx="7" />
                <rect x="33" y="27" width="84" height="10" />
                <rect x="117" y="0" width="14" height="64" rx="7" />
                <rect x="136" y="12" width="14" height="40" rx="7" />
              </svg>
            </div>

            <div className="h-32"></div>

            <h2 className="text-3xl font-bold text-[#FAB12F] mb-2">
              오늘도 운동 성공!
            </h2>
            <p className="text-[#FAB12F] font-bold text-3xl">+10XP</p>
          </div>

          {/* Bottom Button */}
          <div className="w-full pb-8">
            <button
              onClick={handleHome}
              className="w-full bg-[#FAB12F] hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-md transition-colors text-lg"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseAuth;
