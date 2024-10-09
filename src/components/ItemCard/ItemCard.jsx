import { useContext, useEffect } from "react";

import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeBtn from "../../assets/likeBtn.svg";
import likeBtnFilled from "../../assets/likeBtnFilled.svg";

function ItemCard({ item, onCardClick, handleItemLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item?.likes?.some((id) => id === currentUser?._id);

  const handleLike = (e) => {
    e.preventDefault();
    handleItemLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
        {isLoggedIn ? (
          <img
            className="item-card__like"
            src={isLiked ? likeBtnFilled : likeBtn}
            alt={isLiked ? "liked" : "like"}
            onClick={handleLike}
          />
        ) : (
          <div className="item-card__hidden-like"></div>
        )}
      </div>
      <img
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
