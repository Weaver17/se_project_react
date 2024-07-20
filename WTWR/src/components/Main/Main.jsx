import './Main.css'
import WeatherCard from '../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard'
import { defaultClothingItems } from '../../utils/constants'

function Main({ weatherData }) {
    return (
        <section className='main'>
            <div className="main__weather">
                <WeatherCard />
            </div>
            <div className="main__temp">
                <h1 className="main__temp-text">Today is 75° F / You may want to wear:</h1>
            </div>
            <div className="main__items">
                <ul className='main__items-list'>
                    {defaultClothingItems
                    .filter((item) => {
                        return item.weather === weatherData.type;
                    })
                    .map((item) => {
                        return <ItemCard key={item._id} item={item}/>
                    })}
                </ul>
            </div>
        </section>
    ) 
}

export default Main


