import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__info">
        <p className="clothes-section__items-title">Your Items</p>
        <button className="clothes-section__add-button">+ Add New</button>
      </div>
      <ul className="clothes-section__items-list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
