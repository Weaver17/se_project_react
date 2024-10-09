import { useContext } from "react";

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  onAddNewClick,
  // isLoggedIn,
  handleItemLike,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

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
          .filter((item) => currentUser && item?.owner === currentUser?._id)
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              isLoggedin={isLoggedIn}
              onCardClick={handleCardClick}
              handleItemLike={handleItemLike}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
