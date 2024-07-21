import './ModalWithForm.css'

function ModalWithForm({ children, buttonText, title, activeModal, handleCloseClick }) {
    return (
        <div className={`modal ${activeModal === 'add-garment' && 'modal_opened'}`}>
            <div className="modal__content">
                <button className='modal__close-btn' type='button' onClick={handleCloseClick}></button>
                <h2 className='modal__title'>{title}</h2>
                <form className='modal__form'>
                    {children}
                    <button className='modal__submit-btn' type='submit'>{buttonText}</button>
                </form>
            </div>
        </div>
    ) 
}

export default ModalWithForm


