import "./Sidebar.css";
import avatar from "../../assets/avatar.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar__user-avatar" src={avatar} alt="User Avatar" />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default Sidebar;
