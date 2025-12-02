function BusinessModal({ business, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-modal" onClick={onClose}>&times;</span>
                <h2>{business.name}</h2>
                <p className="category-tag">{business.category}</p>
                <p>
                    <i className="material-icons">place</i>
                    <span>{business.address}</span>
                </p>
                <p>{business.description}</p>
            </div>
        </div>
    );
}

export default BusinessModal;
