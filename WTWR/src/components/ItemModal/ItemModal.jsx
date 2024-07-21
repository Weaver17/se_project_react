import './ItemModal.css'

function ItemModal({ activeModal, handleCloseClick, card }) {
    return (
        <div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
            <div className="modal__content modal__conten_type_image">
                <button className='modal__close-btn' type='button' onClick={handleCloseClick}></button>
                <img src={card.link} alt={card.name} className="modal__image" />
                <div className='modal__card-info'>
                    <h3 className="modal__card-title">{card.name}</h3>
                    <p className='modal__card-weather'>Weather: {card.weather}</p>
                </div>
            </div>
        </div>
    )
} 
export default ItemModal


