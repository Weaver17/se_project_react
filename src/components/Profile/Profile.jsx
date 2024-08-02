import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar-section">
        <Sidebar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection />
      </section>
    </div>
  );
}

export default Profile;
