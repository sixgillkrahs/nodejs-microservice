import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useForm } from "react-hook-form";
import { Card, CardMedia, Modal } from "@mui/material";
import { getCurrentAddress } from "../../utils/utils";
import { searchAddress } from "../../services/base/api";
import { Image } from "@mui/icons-material";
import { useMessage } from "../../utils";

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const mockData = [
  {
    id: 1,
    name: "Nhà trọ A",
    address: "Chi Nê - Trung Hòa - Chương Mỹ - Hà Nội",
    lat: 20.927,
    lng: 105.6946,
    price: "5,000,000",
  },
  {
    id: 2,
    name: "Căn hộ B",
    address: "Quận 1 - TP.HCM",
    lat: 10.7769,
    lng: 106.7009,
    price: "8,000,000",
  },
];

const HomePage = () => {
  const [locations, setLocations] = useState(mockData);
  const [selectedRental, setSelectedRental] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState([10.7769, 106.7009]);
  const [searchQuery, setSearchQuery] = useState("");
  const { message } = useMessage();

  const handleMarkerClick = (rental: any) => {
    message("success", "hihi");
    setSelectedRental(rental);
    setIsModalOpen(true);
  };

  const getCurrentPosition = () => {
    if (getCurrentAddress()) {
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setUserLocation([
              position.coords.latitude,
              position.coords.longitude,
            ]);
          },
          (error) => {
            console.error("Lỗi lấy vị trí:", error);
          }
        );
      } else {
        console.error("Trình duyệt không hỗ trợ Geolocation.");
      }
    }
  };

  const search = async (query: string) => {
    const data = await searchAddress(query);
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setUserLocation([parseFloat(lat), parseFloat(lon)]);
    } else {
      alert("Không tìm thấy địa chỉ, vui lòng nhập lại!");
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const onSubmit = (data: any) => {
    setLocations(data.query);
  };

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Nhập địa chỉ..."
      />
      <button onClick={() => search(searchQuery)}>Tìm kiếm</button>
      {/* </form> */}
      <MapContainer
        center={userLocation}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapUpdater center={userLocation} />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup className="w-40 h-40">
              <div className="flex flex-col">
                <div>
                  <Image />
                </div>
                <div>2</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default HomePage;
