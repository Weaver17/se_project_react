import './WeatherCard.css'
import sunny from '../../assets/SunnyReal.svg'

function WeatherCard() {
    return (
        <section className='weather-card'>
        <p className="weather-card__temp-text">75° F</p>
        <img className='weather-card__image' src={sunny} alt="Sunny" />
    </section>
    )
}

export default WeatherCard


