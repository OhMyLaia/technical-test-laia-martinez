import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MapContainer({ businesses, onMarkerClick }) {
    return (
        <div className="map-container">
            <LeafletMap
                center={[41.3851, 2.1734]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {businesses.map((business) => (
                    <Marker
                        key={business.id}
                        position={[business.lat, business.lng]}
                        eventHandlers={{
                            click: () => onMarkerClick(business)
                        }}
                    >
                        <Popup>{business.name}</Popup>
                    </Marker>
                ))}
            </LeafletMap>
        </div>
    );
}

export default MapContainer;
