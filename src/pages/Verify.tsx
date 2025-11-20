import { useEffect, useState } from "react";
import { useLocationStore } from "@store";
import { MapView } from "@components/verify";
import { CommonModal } from "@components/common";

const Verify = () => {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API;
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

  const [errModalOpen, setErrorModalOpen] = useState(false);
  const { coor, setCoor } = useLocationStore();

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

  return (
    <div className="flex flex-1 flex-col w-full">
      <MapView center={coor} mapKey={MAP_KEY} mapId={MAP_ID} />

      {errModalOpen && (
        <CommonModal
          title="위치를 확인할 수 없어요"
          desc="위치 권한이 허용되어 있는지 확인해주세요."
          confirmLabel="확인"
          onConfirmClick={() => setErrorModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Verify;
