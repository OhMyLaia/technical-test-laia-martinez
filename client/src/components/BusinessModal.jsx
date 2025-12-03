import { useState } from "react";
import { useFavourites } from "../context/FavouritesContext";

function BusinessModal({ business, onClose }) {

    const [loading, setLoading] = useState(false);
    // Destructure the function and state from the context
    const { toggleFavourite, favourites } = useFavourites();

    // Check if the current business ID exists in the context array
    const isFav = favourites.includes(business.id);

    const handleToggle = async () => {
        setLoading(true);
        // Call the centralized logic from context
        await toggleFavourite(business.id);
        setLoading(false);
    }

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        content: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        close: {
            position: 'absolute',
            top: '10px',
            right: '15px',
            fontSize: '24px',
            cursor: 'pointer',
            fontWeight: 'bold'
        },
        button: {
            padding: '10px 20px',
            backgroundColor:  isFav ? 'red' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '15px',
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.content} onClick={(e) => e.stopPropagation()}>
                <span style={styles.close} onClick={onClose}>&times;</span>
                
                <h2 style={{ marginTop: 0 }}>{business.name}</h2>
                
                <p style={{ 
                    display: 'inline-block', 
                    padding: '4px 8px', 
                    backgroundColor: '#eee', 
                    borderRadius: '4px',
                    fontSize: '0.9em',
                    marginBottom: '4px',
                    marginRight: '4px',
                    marginTop: '4px'
                }}>
                    {business.category}
                </p>

                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="material-icons">place</i>
                    <span>{business.address}</span>
                </p>

                <p>{business.description}</p>
                
                <div>
                    <button
                        onClick={handleToggle}
                        disabled={loading}
                        style={{...styles.button, opacity: loading ? 0.7 : 1}}
                    > 
                        {loading ? "Loading..." : (isFav ? "Delete Fav" : "Add Fav")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BusinessModal;