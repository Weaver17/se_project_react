import { useState } from 'react'

import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ItemModal from '../ItemModal/ItemModal'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import Footer from '../Footer/Footer'

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" })
  const [activeModal, setActiveModal] = useState("")

  const handleAddClothesClick = () => {
    setActiveModal('add-garment');
  }

  const closeActiveModal = () => {
    setActiveModal('')
  }

  return (
    <div className='page'>
      <div className='page__content'>
      <Header handleAddClothesClick={handleAddClothesClick} />
      <Main weatherData={weatherData} />
      <Footer />
    </div>
    <ItemModal />
    <ModalWithForm 
      title='New garment' 
      buttonText='Add garment' 
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}
    >      
        <label htmlFor="name" className='modal__label'>
          Name{" "}
          <input type="text" className='modal__input' id='name' placeholder='Name'/>    
        </label>
        <label htmlFor="imageUrl" className='modal__label'>
          Image{" "}
          <input type="url" className='modal__input' id='imageUrl' placeholder='Image URL'/>    
        </label>
        <fieldset className='modal__radio-btns'>
          <legend className='modal__legend'>
            Select the weather type:
         </legend>
          <label htmlFor="hot" className='modal__label modal__label_type_radio'>
            <input type="radio" className='modal__radio-input' id='hot' /> Hot
         </label>
        <label htmlFor="warm" className='modal__label modal__label_type_radio'>
          <input type="radio" className='modal__radio-input' id='warm' /> Warm
        </label>
       <label htmlFor="cold" className='modal__label modal__label_type_radio'>
         <input type="radio" className='modal__radio-input' id='cold' /> Cold
        </label>
       </fieldset>
    </ModalWithForm>

    </div>

  )
}

export default App
