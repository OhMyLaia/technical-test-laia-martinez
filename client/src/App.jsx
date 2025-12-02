import { useState, useEffect } from 'react'
import './App.css'
import MapContainer from './components/MapContainer'
import SearchBar from './components/SearchBar'
import BusinessModal from './components/BusinessModal'
import 'leaflet/dist/leaflet.css';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const fetchBusinesses = async (search = '', category = '') => {
    try {
      let url = `http://localhost:3001/api/businesses?`;
      if (search) url += `search=${search}&`;
      if (category) url += `category=${category}`;

      const response = await fetch(url);
      const data = await response.json();
      setBusinesses(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="logo">Vuélvete Local</div>
      </header>

      <SearchBar onSearch={fetchBusinesses} />

      <MapContainer
        businesses={businesses}
        onMarkerClick={setSelectedBusiness}
      />

      {selectedBusiness && (
        <BusinessModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      )}
    </div>
  )
}

export default App
