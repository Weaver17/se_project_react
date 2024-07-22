import './Header.css'
import logo from '../../assets/WTWRLogo.svg'
import avatar from '../../assets/avatar.svg'

function Header({ handleAddClothesClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return (
        <div className='header'>
            <img className='header__logo' src={ logo } alt="WTWR Logo" />
            <p className='header__date-location'>{currentDate}, {weatherData.city}</p>
            <button className='header__clothes-btn' type='button' onClick={handleAddClothesClick}>+ Add clothes</button>
            <div className='header__user-container'>
                <p className='header__username'>Username</p>
                <img className='header__user-avater' src={ avatar } alt="User Avatar" />
            </div>
        </div>
    )
}

export default Header

