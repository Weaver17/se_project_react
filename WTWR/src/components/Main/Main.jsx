import './Main.css'
import WeatherCard from '../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard'
import { defaultClothingItems } from '../../utils/constants'

function Main({ weatherData, handleCardClick }) {
    return (
        <main className='main'>
            <WeatherCard weatherData={weatherData} />
            <section>
            <h1 className="main__temp-text">Today is {weatherData.temp.F}° F / You may want to wear:</h1>
            <ul className='main__items-list'>
                    {defaultClothingItems
                    .filter((item) => {
                        return item.weather === weatherData.type;
                    })
                    .map((item) => {
                        return (
                            <ItemCard
                            key={item._id} 
                            item={item}
                            onCardClick={handleCardClick}
                            />
                        )
                    })}
                       
                </ul>
            </section>
        </main>
    ) 
}

export default Main


