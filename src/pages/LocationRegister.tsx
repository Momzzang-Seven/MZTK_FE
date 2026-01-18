import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/userStore";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const LocationRegister = () => {
    const navigate = useNavigate();
    const { setGymLocation } = useUserStore();

    const MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API || "";
    const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || "";

    // Default center (Seoul) if geolocation fails
    const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setCenter({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
            });
        }
    }, []);

    const handleRegister = () => {
        // Register the current map center (or marker position) as gym location
        setGymLocation(center);

        // In a real app, maybe confirm success with a toast
        alert("위치가 등록되었습니다!");
        navigate("/verify"); // Go back to verify page to proceed
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header */}
            <div className="px-5 pt-6 pb-4">
                <h1 className="text-3xl font-bold text-[#FAB12F]">
                    위치 등록하기
                </h1>
            </div>

            {/* Tip Banner */}
            <div className="px-5 mb-4 relative z-10">
                <div className="bg-[#FAB12F] text-white px-5 py-4 rounded-2xl shadow-md">
                    <p className="font-bold text-sm leading-relaxed">
                        Tip. 등록된 헬스장 위치는 마이페이지에서 바꿀 수 있어요. 운동 인증은 반경 5m 까지 가능해요!
                    </p>
                </div>
            </div>

            {/* Map Area - Using absolute to fill remaining space properly or flex-1 */}
            <div className="flex-1 w-full relative">
                <APIProvider apiKey={MAP_KEY}>
                    <Map
                        defaultCenter={center}
                        center={center}
                        defaultZoom={17}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        mapId={MAP_ID}
                        onCameraChanged={(ev) => setCenter(ev.detail.center)}
                        className="w-full h-full"
                    >
                        {/* Fixed Center Marker for Selection */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20 pointer-events-none pb-2">
                            <img src="/icon/marker.svg" alt="Marker" className="w-10 h-10 drop-shadow-md"
                                onError={(e) => {
                                    // Fallback if custom icon missing, though user didn't specify one, usually a pin
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            {/* Fallback CSS Pin if image fails or just use a standard svg inline */}
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="#FAB12F" stroke="white" strokeWidth="1.5" className="drop-shadow-lg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                    </Map>
                </APIProvider>

                {/* Action Button Floating at Bottom */}
                <div className="absolute bottom-8 left-0 right-0 px-5 z-20">
                    <button
                        onClick={handleRegister}
                        className="w-full bg-[#FAB12F] text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:bg-[#E09E2B] transition-colors active:scale-95"
                    >
                        여기로 등록할게요!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationRegister;
