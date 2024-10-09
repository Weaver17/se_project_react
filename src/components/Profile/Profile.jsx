import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClothesClick,
  itemToDelete,
  // isLoggedIn,
  handleEditClick,
  handleLogOut,
  handleItemLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar-section">
        <Sidebar
          handleEditClick={handleEditClick}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          onAddNewClick={handleAddClothesClick}
          itemToDelete={itemToDelete}
          // isLoggedIn={isLoggedIn}
          handleItemLike={handleItemLike}
        />
      </section>
    </div>
  );
}

export default Profile;
