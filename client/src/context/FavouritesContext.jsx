import { createContext, useState, useEffect, useContext } from 'react';

const FavouritesContext = createContext();

// Custom hook for easy access
export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    // Load initial favourites from server
    useEffect(() => {
        fetch('http://localhost:3001/api/favorites')
            .then(res => res.json())
            .then(data => setFavourites(data))
            .catch(err => console.error("Failed to fetch favourites", err));
    }, []);

    // Centralized logic to add/remove
    const toggleFavourite = async (businessId) => {
        const isFav = favourites.includes(businessId);
        const method = isFav ? 'DELETE' : 'POST';

        try {
            const res = await fetch(`http://localhost:3001/api/favorites/${businessId}`, {
                method,
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setFavourites(prev => 
                    isFav 
                        ? prev.filter(id => id !== businessId)
                        : [...prev, businessId]
                );
            }
        } catch (error) {
            console.error("Error toggling favourite", error);
        }
    };

    return (
        <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};