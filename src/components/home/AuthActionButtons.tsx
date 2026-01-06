


interface ActionButtonsProps {
    onExerciseClick: () => void;
    onLocationClick: () => void;
}

const AuthActionButtons = ({ onExerciseClick, onLocationClick }: ActionButtonsProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <button
                onClick={onExerciseClick}
                className="w-full bg-[#FAB12F] hover:opacity-90 text-white font-bold py-5 rounded-2xl shadow-md flex items-center justify-center gap-3 transition-colors text-xl"
            >
                {/* Runner Icon - FontAwesome Running Solid */}
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M384 176c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM19.2 249.6c-4.4 12.2 .4 25.7 11.2 32.7l77.4 50.3c15.1 9.8 19.3 29.8 9.6 44.9l-25.1 39.1c-13.4 20.8-7.5 48.7 13.3 62.1s48.7 7.5 62.1-13.3l25.1-39.1c32.3-50.2 18.2-117.1-32.2-149.8L111.4 244l40.4-20.2c47-23.5 103.8-13.9 140.2 22.5l29 29 0 0c14.6 14.6 35.8 19.3 55.3 12.2l48-17.5c16.1-5.9 24.6-23.9 18.7-40s-23.9-24.6-40-18.7l-35.1 12.8-24.6-24.6c-54.6-54.6-139.8-69.1-210.4-33.8L59.6 198.2c-15.6 7.8-25.9 24.2-25.4 41.6c.5 17.5 11.2 33.3 27.6 39.5L19.2 249.6zM288 304l-30.1-52.7c-9.1-16 1.1-36.1 19.3-38.3l85.2-10.7c20.3-2.5 35.8 17.6 28.6 36.8L348.6 352c-7.9 21-33.3 31.9-54.3 23c-20.7-8.7-30.8-31.9-22.3-52.4l16-38.6z" />
                </svg>
                운동 인증하기
            </button>

            <button
                onClick={onLocationClick}
                className="w-full bg-[#FAB12F] hover:opacity-90 text-white font-bold py-5 rounded-2xl shadow-md flex items-center justify-center gap-3 transition-colors text-xl"
            >
                {/* Pin Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
                위치 인증하기
            </button>
        </div>
    );
};

export default AuthActionButtons;
