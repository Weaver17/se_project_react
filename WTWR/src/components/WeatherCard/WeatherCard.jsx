import './WeatherCard.css'
import sunny from '../../assets/day/sunny.svg'

function WeatherCard({ weatherData }) {
    return (
        <section className='weather-card'>
        <p className="weather-card__temp-text">{weatherData.temp.F}° F</p>
        <img className='weather-card__image' src={sunny} alt="Sunny" />
    </section>
    )
}

export default WeatherCard


