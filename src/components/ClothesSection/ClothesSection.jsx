import { useContext } from "react";

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  onAddNewClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__info">
        <p className="clothes-section__items-title">Your Items</p>
        <button
          className="clothes-section__add-button"
          type="button"
          onClick={onAddNewClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items-list">
        {clothingItems
          .filter((item) => currentUser && item.owner === currentUser?._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                isLoggedIn={isLoggedIn}
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
