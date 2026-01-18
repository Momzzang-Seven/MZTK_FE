import { useEffect, useState } from "react";
import { useLocationStore } from "@store";
import { useUserStore } from "@store/userStore";
import { MapView } from "@components/verify";
import { CommonModal } from "@components/common";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API;
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;
  const navigate = useNavigate();

  const [errModalOpen, setErrorModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const { coor, setCoor } = useLocationStore();
  const { gymLocation } = useUserStore();

  useEffect(() => {
    if (!navigator.geolocation || coor) return;

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoor({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => {
        setErrorModalOpen(true);
      }
    );
  }, [coor, setCoor]);

  useEffect(() => {
    if (coor && !gymLocation) {
      setRegisterModalOpen(true);
    }
  }, [coor, gymLocation]);

  return (
    <div className="flex flex-1 flex-col w-full relative">
      <div className="absolute top-0 left-0 right-0 z-10 bg-white px-5 pt-6 pb-4 rounded-b-[20px] shadow-sm">
        <h1 className="text-3xl font-bold text-[#FAB12F]">
          위치 인증하기
        </h1>
      </div>

      <MapView center={coor} mapKey={MAP_KEY} mapId={MAP_ID} />

      {/* Permission Error Modal */}
      {errModalOpen && (
        <CommonModal
          title="위치 권한을 허용해주세요"
          desc=""
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
        //    cancelLabel="닫기"
        //    onCancelClick={() => navigate(-1)} // Or just close modal if optional
        />
      )}
    </div>
  );
};

export default Verify;
