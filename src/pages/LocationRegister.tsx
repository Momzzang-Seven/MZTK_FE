import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/userStore";
import {
    APIProvider,
    Map,
    useMap
} from "@vis.gl/react-google-maps";
import Lottie from "lottie-react";
import runnerAnimation from "@assets/runner.json";

// Search Component - Disabled to prevent API Deprecation Error
// const PlaceAutocomplete = ...

// Map Controller Component
const MapController = ({ panTo, onPanComplete }: { panTo: { lat: number; lng: number } | null, onPanComplete: () => void }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !panTo) return;

        map.panTo(panTo);
        onPanComplete();
    }, [map, panTo, onPanComplete]);

    return null;
};

const LocationRegister = () => {
    const navigate = useNavigate();
    const { registerGymLocation } = useUserStore();

    const MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API || "";
    const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || "";

    const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 });
    const [panTarget, setPanTarget] = useState<{ lat: number; lng: number } | null>(null);
    // const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [address, setAddress] = useState<string>("위치를 선택해주세요");
    const [isRegistering, setIsRegistering] = useState(false);

    // Get Current Location
    const handleCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newCenter = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    };
                    // setCenter(newCenter); // Don't enforce center state immediately, let map pan to it
                    setPanTarget(newCenter);
                    setAddress("등록 위치");
                },
                (err) => {
                    console.error("Geolocation error:", err);
                },
                { enableHighAccuracy: true }
            );
        }
    }, []);

    useEffect(() => {
        handleCurrentLocation();
    }, [handleCurrentLocation]);

    // Camera change handler for dragging - updates data but doesn't force map move
    const handleCameraChanged = (ev: { detail: { center: { lat: number; lng: number } } }) => {
        setCenter(ev.detail.center);
    };

    const handleRegister = async () => {
        setIsRegistering(true);
        // Wait for 2 seconds animation
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Register the current map center
        await registerGymLocation({
            lat: center.lat,
            lng: center.lng,
            address: address
        });

        navigate("/verify");
    };

    return (
        <div className="flex flex-col h-[100dvh] w-full bg-white relative overflow-hidden">
            {/* Header Area - Matches Verify.tsx style */}
            <div className="absolute top-0 left-0 right-0 z-30 bg-white px-5 pt-6 pb-4 rounded-b-[20px] shadow-sm">
                <h1 className="text-3xl font-bold text-[#FAB12F] mb-2">
                    위치 등록하기
                </h1>
                <div className="bg-[#FAB12F] text-white px-4 py-3 rounded-xl shadow-md">
                    <p className="font-bold text-xs leading-relaxed">
                        Tip. 지도를 움직여 헬스장 위치를 맞춰주세요 (반경 5m)
                    </p>
                </div>
            </div>

            {/* Map Area - Full Screen */}
            <div className="flex-1 w-full h-full relative bg-gray-100">
                <APIProvider apiKey={MAP_KEY}>
                    {/* <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} /> */}
                    <MapController panTo={panTarget} onPanComplete={() => setPanTarget(null)} />

                    <Map
                        defaultCenter={center}
                        defaultZoom={17}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        mapId={MAP_ID}
                        style={{ width: '100%', height: '100%' }}
                        onCameraChanged={handleCameraChanged}
                    >
                        {/* No Markers inside Map - We use an overlay pin */}
                    </Map>

                    {/* Fixed Center Pin (Visual) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none pb-[38px]">
                        {/* Adjusted translate-y and padding to make the pin TIP land exactly on center */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                            <path d="M12 0C7.58172 0 4 3.58172 4 8C4 13.5 12 24 12 24C12 24 20 13.5 20 8C20 3.58172 16.4183 0 12 0Z" fill="#FAB12F" />
                            <circle cx="12" cy="8" r="3.5" fill="white" />
                        </svg>
                    </div>

                    {/* Current Location Button with Tooltip */}
                    <div className="absolute bottom-[180px] right-5 z-40 flex items-center gap-3 select-none">
                        {/* Tooltip: "현위치" */}
                        <div className="bg-gray-700 text-white text-xs font-bold px-2 py-1.5 rounded-md relative shadow-md animate-fade-in-right">
                            현위치
                            {/* Arrow pointing right */}
                            <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-0 h-0 
                                            border-t-[6px] border-t-transparent
                                            border-l-[8px] border-l-gray-700
                                            border-b-[6px] border-b-transparent">
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleCurrentLocation}
                            className="bg-white p-3 rounded-xl shadow-lg active:bg-gray-50 transition-all active:scale-95"
                            aria-label="현 위치로 이동"
                        >
                            <img src="/icon/aim.svg" alt="My Location" className="w-6 h-6"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = '📍';
                                }}
                            />
                        </button>
                    </div>

                    {/* Address Info Card (Floating) */}
                    <div className="absolute top-[180px] left-5 right-5 z-20 pointer-events-none flex justify-center">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center gap-2">
                            {/* Pin Icon */}
                            <img src="/icon/pin.svg" alt="Pin" className="w-5 h-5"
                                onError={(e) => {
                                    // Fallback SVG if /icon/pin.svg doesn't exist
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.insertAdjacentHTML('afterend', `
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FAB12F"/>
                                        </svg>
                                    `);
                                }}
                            />
                            {/* Fallback container in case img fails and we need to inject svg manually above */}

                            <span className="text-sm font-bold text-gray-700 truncate max-w-[200px]">
                                {address}
                            </span>
                        </div>
                    </div>

                </APIProvider>
            </div>

            {/* Action Button - Moved outside map area for guaranteed visibility */}
            <div className="absolute bottom-[100px] left-0 right-0 px-5 z-50">
                <button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="w-full bg-[#FAB12F] text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:bg-[#E09E2B] transition-colors active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isRegistering ? '등록 중...' : '여기로 등록할게요!'}
                </button>
            </div>

            {/* Registration Loading Overlay */}
            {isRegistering && (
                <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
                    <div className="w-64 h-64 mb-4">
                        <Lottie animationData={runnerAnimation} loop={true} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#FAB12F] mb-2">위치 등록중...</h2>
                    <p className="text-xl font-bold text-[#FAB12F]">조금만 기다려주세요!</p>
                </div>
            )}
        </div>
    );
};

export default LocationRegister;
