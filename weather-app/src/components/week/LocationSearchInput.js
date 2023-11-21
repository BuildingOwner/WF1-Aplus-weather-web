import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePlacesWidget } from "react-google-autocomplete";
import PlacesAPI from "../../private/PlacesKey";
import FavorateWeek from "./favorate-week";
import { useSelector } from "react-redux";
import "../../css/week/location-search-input.css";

const Input = ({ onPlaceSelected }) => {
  const { ref } = usePlacesWidget({
    apiKey: PlacesAPI,
    onPlaceSelected,
  });

  return (
    <div class="input-group">
    <input
      className="favorate-input"
      type="text"
      ref={ref}
      placeholder="장소를 입력하세요"
    />
    <span class="input-group-text" id="basic-addon2"><i className="bi bi-search"></i></span>
    </div>
  );
};

const LocationSearchInput = () => {
  const auth = useSelector((state) => state.user.username);
  const isLoggedIn = auth !== null;
  const [address, setAddress] = useState(null);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getFavoriteLocations", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("get" + response.data); // 응답 데이터 출력
        if (Array.isArray(response.data)) {
          // 데이터가 배열인지 확인
          const locationArray = response.data.map((locationString) => {
            const locationObject = JSON.parse(locationString);
            return locationObject.location;
          });
          console.log(locationArray);
          setFavoriteLocations(locationArray);
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handlePlaceSelected = (place) => {
    if (place) {
      console.log(place);
      console.log(place.formatted_address);
      setAddress(place.formatted_address);
    }
  };

  return (
    <>
      <div className="favorate-current-week-container">
        <Input onPlaceSelected={handlePlaceSelected} />
      </div>
      {address && <FavorateWeek location={address} valid={true} />}
      {favoriteLocations.map((address, index) => (
        <FavorateWeek key={index} location={address} valid={false} />
      ))}
    </>
  );
};

export default LocationSearchInput;
