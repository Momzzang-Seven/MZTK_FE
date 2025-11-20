import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

interface RangeCircleProps {
  center: { lat: number; lng: number };
  radius?: number;
  strokeColor?: string;
  fillColor?: string;
}

const RangeCircle = ({
  center,
  radius = 200,
  strokeColor = "#fab12f",
  fillColor = "#fab12f",
}: RangeCircleProps) => {
  const map = useMap();
  const maps = useMapsLibrary("maps");

  useEffect(() => {
    if (!map || !maps || !center) return;

    const circle = new maps.Circle({
      center,
      radius,
      strokeColor,
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor,
      fillOpacity: 0.2,
      map,
    });

    return () => circle.setMap(null);
  }, [map, maps, center, radius, strokeColor, fillColor]);

  return null;
};

export default RangeCircle;
