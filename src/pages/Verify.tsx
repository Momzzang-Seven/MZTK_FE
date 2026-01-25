import { useEffect, useState } from "react";
import { useLocationStore } from "@store";
import { useUserStore } from "@store/userStore";
import { MapView } from "@components/verify";
import { CommonModal } from "@components/common";
import { useNavigate } from "react-router-dom";
import { getDistanceFromLatLonInMeters } from "@utils/geo";
import joyIcon from "@assets/joy.svg";

const Verify = () => {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API;
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;
  const navigate = useNavigate();

  const [errModalOpen, setErrorModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);

  const { coor, setCoor } = useLocationStore();
  const { gymLocation, completeExercise } = useUserStore(); // Assuming completeExercise adds XP

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setCoor({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
        setErrorModalOpen(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [setCoor]);

  useEffect(() => {
    if (coor && !gymLocation) {
      setRegisterModalOpen(true);
    }

    if (coor && gymLocation) {
      const d = getDistanceFromLatLonInMeters(
        coor.lat, coor.lng,
        gymLocation.lat, gymLocation.lng
      );
      setDistance(Math.floor(d)); // Integer meters
    }
  }, [coor, gymLocation]);

  const handleVerify = () => {
    if (distance !== null && distance <= 20) {
      completeExercise(); // Call store action to add XP/mark done
      setSuccessModalOpen(true);

      // Auto redirect after 2s
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setFailModalOpen(true);
    }
  };

  const isNear = distance !== null && distance <= 20;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white px-5 pt-6 pb-4 rounded-b-[20px] shadow-sm">
        <h1 className="text-3xl font-bold text-[#FAB12F]">
          위치 인증하기
        </h1>
      </div>

      {/* Map Area */}
      <div className="flex-1 w-full relative">
        <MapView center={coor} mapKey={MAP_KEY} mapId={MAP_ID} />

        {/* Distance Info Overlay */}
        {/* Distance Info Overlay */}
        {gymLocation && distance !== null && (
          <div className="absolute top-28 left-0 right-0 z-20 flex flex-col items-center gap-2 pointer-events-none">
            {/* Slim Distance Pill */}
            <div className="bg-gray-100/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-gray-200">
              <span className="text-gray-800 font-bold text-lg">
                현재 헬스장까지 거리: {distance}m
              </span>
            </div>

            {/* Warning Message */}
            {!isNear && (
              <span className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-full font-bold shadow-sm border border-red-100">
                인증 반경(20m)을 벗어났습니다
              </span>
            )}
          </div>
        )}
      </div>

      {/* Verify Button */}
      <div className="absolute bottom-[110px] left-0 right-0 px-5 z-20">
        <button
          onClick={handleVerify}
          className={`w-full font-bold text-xl py-4 rounded-2xl shadow-lg transition-all active:scale-95
            ${isNear
              ? 'bg-[#FAB12F] text-white hover:bg-[#E09E2B]'
              : 'bg-gray-300 text-gray-500' // Visual "disabled" state but still clickable
            }`}
        >
          {isNear ? '위치 인증하기' : '인증 위치로 이동해주세요'}
        </button>
      </div>


      {/* Permission Error Modal */}
      {errModalOpen && (
        <CommonModal
          title="위치 권한을 허용해주세요"
          desc="서비스 이용을 위해 위치 정보 접근 권한이 필요합니다."
          confirmLabel="다시 시도하기"
          onConfirmClick={() => window.location.reload()}
        />
      )}

      {/* Registration Prompt Modal */}
      {registerModalOpen && (
        <CommonModal
          title=""
          desc="<span class='text-lg font-bold'>등록된 운동 위치가 없어요.<br/>등록하시겠어요?</span>"
          confirmLabel="운동 위치 등록하기"
          onConfirmClick={() => navigate("/location-register")}
        />
      )}

      {/* Verification Failure Modal */}
      {failModalOpen && (
        <CommonModal
          title="위치 인증에 실패했어요"
          confirmLabel="다시 시도하기"
          onConfirmClick={() => setFailModalOpen(false)}
        />
      )}

      {/* Success Overlay (Full Screen Design) */}
      {successModalOpen && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center pb-20 animate-fade-in">
          {/* Stickman Image */}
          <div className="relative mb-8">
            <img
              src={joyIcon}
              alt="Success Stickman"
              className="w-72 h-72 object-contain"
              onError={(e) => {
                // Fallback to runner animation or simple emoji if asset missing
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-[100px]">🏃</div>';
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-2 relative">
            {/* Text with Streak Badge */}
            <div className="relative">
              <h2 className="text-3xl font-bold text-[#FAB12F] tracking-tight">
                오늘도 운동 성공!
              </h2>
            </div>

            <p className="text-3xl font-bold text-[#FAB12F]/80">
              +100XP
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
