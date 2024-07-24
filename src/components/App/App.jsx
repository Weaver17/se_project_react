import { useState, useEffect } from 'react'

import './App.css'
import { coordinates, APIkey } from '../../utils/constants'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ItemModal from '../ItemModal/ItemModal'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import Footer from '../Footer/Footer'
import { getWeather, filterWeatherData } from '../../utils/weatherApi'

function App() {
  const [weatherData, setWeatherData] = useState({ 
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddClothesClick = () => {
    setActiveModal("add-garment");
  }

  const closeActiveModal = () => {
    setActiveModal('');
  }

  const handleEscapeClose = (e) => {
    if (e.key === 'Escape') {
          closeActiveModal();
    }
  };

  
  

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      const filteredData = filterWeatherData(data);
      setWeatherData(filteredData);
    })
    .catch(console.error);
  }, []);

  return (
    <div className='page'>
        <div className='page__content'>
          <Header handleAddClothesClick={handleAddClothesClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
      <ModalWithForm 
        title='New garment'
        name='add_garment'
        buttonText='Add garment' 
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
        handleEscapeClose={handleEscapeClose}
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
      <ItemModal 
        name='image'
        activeModal={activeModal} 
        card={selectedCard} 
        handleCloseClick={closeActiveModal}
        handleEscapeClose={handleEscapeClose}
      />
    </div>
  )
}

export default App