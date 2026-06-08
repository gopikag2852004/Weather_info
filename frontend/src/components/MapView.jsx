import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapView = ({ routeData, floodZones }) => {
  if (!routeData) return (
    <div className="card" style={{
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem',
      background: 'linear-gradient(135deg, #EEF6FF, #D6E8FF)'
    }}>
      <span style={{ fontSize: '4rem' }}>🗺️</span>
      <p style={{ fontWeight: 700, color: '#718096', fontSize: '1.1rem' }}>
        Enter a route to see the map
      </p>
    </div>
  );

  const { coordinates, geometry, floodWarnings } = routeData;
  const center = [
    (coordinates.source.lat + coordinates.destination.lat) / 2,
    (coordinates.source.lon + coordinates.destination.lon) / 2
  ];

  // Convert GeoJSON to Leaflet coordinates
  const routeCoords = geometry.coordinates.map(([lon, lat]) => [lat, lon]);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <MapContainer
        center={center}
        zoom={9}
        style={{ height: '420px', width: '100%', borderRadius: '17px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Route line */}
        <Polyline
          positions={routeCoords}
          color="#4A90D9"
          weight={5}
          opacity={0.8}
        />

        {/* Source marker */}
        <Marker position={[coordinates.source.lat, coordinates.source.lon]}>
          <Popup>
            <strong>📍 {routeData.source}</strong>
          </Popup>
        </Marker>

        {/* Destination marker */}
        <Marker position={[coordinates.destination.lat, coordinates.destination.lon]}>
          <Popup>
            <strong>🏁 {routeData.destination}</strong>
          </Popup>
        </Marker>

        {/* Flood zone circles */}
        {floodWarnings && floodWarnings.map(zone => (
          <Circle
            key={zone.id}
            center={[zone.latitude, zone.longitude]}
            radius={3000}
            color={zone.risk_level ===