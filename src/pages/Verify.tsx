import {
  APIProvider,
  useMap,
  Map,
  useMapsLibrary,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function RangeCircle({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  const maps = useMapsLibrary("maps");

  useEffect(() => {
    if (!map || !maps || !center) return;

    const circle = new maps.Circle({
      center,
      radius: 200,
      strokeColor: "#fab12f",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#fab12f",
      fillOpacity: 0.2,
      map,
    });

    return () => circle.setMap(null);
  }, [map, maps, center]);

  return null;
}

const Verify = () => {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API;
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

  const [coor, setCoor] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoor({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        console.log(pos.coords);
      },
      (err) => {
        console.error("Failed to get location:", err);
      }
    );
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-y-5 items-center justify-center">
      <APIProvider apiKey={MAP_KEY}>
        <Map
          mapId={MAP_ID}
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{
            lat: coor?.lat ?? 37.554531,
            lng: coor?.lng ?? 126.970663,
          }}
          defaultZoom={16}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {coor && <RangeCircle center={coor} />}
          {coor && (
            <AdvancedMarker position={coor}>
              <Pin
                background={"#fab12f"}
                glyphColor={"#fff"}
                borderColor={"#fab12f"}
              />
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default Verify;
