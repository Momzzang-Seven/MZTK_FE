


const LevelProgress = () => {
    // Mock Data for now as userStore doesn't have XP/Level yet
    const level = 3;
    const currentXp = 45;
    const maxXp = 100;
    const percentage = (currentXp / maxXp) * 100;

    // SVG parameters
    const size = 280;
    const strokeWidth = 24;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex justify-center items-center py-8">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#f3f4f6" // gray-100
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#FAB12F" // Main Color
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                    />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-[#FAB12F] drop-shadow-sm">Lv.{level}</span>
                </div>
            </div>
        </div>
    );
};

export default LevelProgress;
