import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const bogorCenter = [-6.5971, 106.806039];

const cafeIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getCafeCoordinates = (cafe) => {
  const latitude = Number(cafe.latitude ?? cafe.lat);
  const longitude = Number(cafe.longitude ?? cafe.lng ?? cafe.lon);

  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    return [latitude, longitude];
  }

  const coordinatesFromLink = cafe.mapsLink?.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  return coordinatesFromLink
    ? [Number(coordinatesFromLink[1]), Number(coordinatesFromLink[2])]
    : null;
};

function MapLocationPopup() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useMapEvents({
    click: ({ latlng }) => setSelectedLocation(latlng)
  });

  if (!selectedLocation) return null;

  return (
    <Popup position={selectedLocation} eventHandlers={{ remove: () => setSelectedLocation(null) }}>
      Lokasi dipilih
      <div>
        {selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}
      </div>
    </Popup>
  );
}

export default function CafeMap({ cafeData = [], onCafeClick }) {
  const cafesWithCoordinates = cafeData
    .map((cafe) => ({ cafe, coordinates: getCafeCoordinates(cafe) }))
    .filter(({ coordinates }) => coordinates);

  return (
    <MapContainer
      className="leaflet-map"
      center={bogorCenter}
      zoom={13}
      minZoom={10}
      maxZoom={19}
      scrollWheelZoom
      dragging
      touchZoom
      doubleClickZoom
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapLocationPopup />

      {cafesWithCoordinates.map(({ cafe, coordinates }) => (
        <Marker key={cafe.id} position={coordinates} icon={cafeIcon}>
          <Popup>
            <strong>{cafe.name}</strong>
            {cafe.address && <div>{cafe.address}</div>}
            {onCafeClick && (
              <button className="map-popup-button" onClick={() => onCafeClick(cafe.id)}>
                Lihat detail cafe
              </button>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}