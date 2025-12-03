import { useState } from "react";

function BusinessModal({ business, onClose }) {

    const [isFav, setIsFav] = useState(false);
    const [loading, setLoading] = useState();




    const toggleFav = async () => {
        const method = isFav ? 'DELETE' : 'POST';
        setLoading(true);
        
        try {
            const response = await fetch(`http://localhost:3001/api/favorites/${business.id}`, {
                method: method,
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                setIsFav(!isFav);
            }

        } catch (error) {
            console.error("Error adding favourite:", error);
            setLoading(false);
        }
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
            backgroundColor: isFav ? 'red' : '#007bff',
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
                    onClick={toggleFav}
                    style={styles.button}> 
                    {loading ? "Checking..." : (isFav ? "Remove Fav" : "Add Fav")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BusinessModal;