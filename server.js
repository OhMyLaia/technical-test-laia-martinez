const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Mock Data for Businesses
const businesses = [
    {
        id: 1,
        name: "Panadería El Barrio",
        lat: 41.3851,
        lng: 2.1734,
        category: "Alimentación",
        description: "Pan artesanal hecho con masa madre.",
        address: "Carrer del Pi, 5"
    },
    {
        id: 2,
        name: "Librería Lecturas",
        lat: 41.3870,
        lng: 2.1700,
        category: "Cultura",
        description: "Libros nuevos y de segunda mano.",
        address: "Carrer de laalla, 12"
    },
    {
        id: 3,
        name: "Frutería Fresca",
        lat: 41.3820,
        lng: 2.1760,
        category: "Alimentación",
        description: "Frutas y verduras de temporada.",
        address: "Carrer ample, 20"
    }
];

// API Endpoint for Businesses
app.get('/api/businesses', (req, res) => {
    const { search, category } = req.query;
    let results = businesses;

    if (search) {
        results = results.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
        results = results.filter(b => b.category === category);
    }

    res.json(results);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Technical test server running on http://localhost:${PORT}`);
});
