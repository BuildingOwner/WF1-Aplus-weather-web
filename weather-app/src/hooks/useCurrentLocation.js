import GOOGLE_MAP_KEY from "../private/google-map-key";
import { useState, useEffect } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    address: "",
  });

  const onSuccess = async (location) => {
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    // Google Geocoding API 호출
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_KEY}`
    );
    const data = await response.json();
    const address = data.results[0].formatted_address; // 첫 번째 결과의 주소를 사용

    setLocation({
      loaded: true,
      address
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useCurrentLocation;
