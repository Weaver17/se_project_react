import { useContext } from "react";

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__gallery">
        <h1 className="main__temp-text">
          Today is{" "}
          {currentTempUnit === "F" ? weatherData?.temp.F : weatherData?.temp.C}°{" "}
          {currentTempUnit} / You may want to wear:
        </h1>
        <ul className="main__items-list">
          {clothingItems
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
              );
            })}
        </ul>
      </section>
      <button className="main__random-btn" type="button">
        ↻ Randomize
      </button>
    </main>
  );
}

export default Main;
