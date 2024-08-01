import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile() {
  return (
    <div className="profile">
      <sidebar className="profile__sidebar"></sidebar>
      <ClothesSection />
    </div>
  );
}

export default Profile;
