import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClothesClick,
  itemToDelete,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar-section">
        <Sidebar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          onAddNewClick={handleAddClothesClick}
          itemToDelete={itemToDelete}
        />
      </section>
    </div>
  );
}

export default Profile;
