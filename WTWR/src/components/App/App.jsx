import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ItemModal from '../ItemModal/ItemModal'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import Footer from '../Footer/Footer'

function App() {
  return (
    <div className='page'>
      <div className='page__content'>
      <Header />
      <Main />
      <Footer />
    </div>
    <ItemModal />
    <ModalWithForm />
    </div>
  )
}

export default App
