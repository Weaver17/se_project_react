import { useContext } from "react";

import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <h2 className="item-card__name">{item.name}</h2>
      {isLoggedIn && (
        <img
          className="item-card__image"
          src={item.imageUrl}
          alt={item.name}
          onClick={handleCardClick}
        />
      )}
    </li>
  );
}

export default ItemCard;
