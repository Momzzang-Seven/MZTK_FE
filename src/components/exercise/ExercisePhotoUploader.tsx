import { useRef } from "react";
import { EXERCISE_TEXT } from "@constant/exercise";

interface ExercisePhotoUploaderProps {
    previewUrl: string | null;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ExercisePhotoUploader = ({ previewUrl, onFileChange }: ExercisePhotoUploaderProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col flex-1 animate-fade-in">
            {/* Guide Banner */}
            <div className="bg-main text-white px-4 py-3 rounded-2xl mb-2 shadow-sm mt-4">
                <p className="font-bold text-xl leading-relaxed whitespace-pre-line text-left">
                    {EXERCISE_TEXT.GUIDE_TITLE}
                    <br />
                    {EXERCISE_TEXT.GUIDE_DESC}
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
                    onChange={onFileChange}
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
                            {EXERCISE_TEXT.UPLOAD_NO_IMAGE}
                        </p>
                        <p className="text-gray-400 text-sm">{EXERCISE_TEXT.UPLOAD_SIZE_HINT}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
