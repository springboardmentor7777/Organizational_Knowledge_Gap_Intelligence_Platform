import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Employee Profile", path: "/profile", icon: "👤" },
    { name: "Skill Inventory", path: "/skills", icon: "💻" },
    { name: "Gap Analysis", path: "/gap-analysis", icon: "📉" },
    { name: "Training", path: "/training", icon: "🎓" },
    { name: "Assessment", path: "/assessment", icon: "📝" },
    { name: "Notifications", path: "/notifications", icon: "🔔" },
    { name: "Analytics", path: "/analytics", icon: "📈" },
    { name: "Reports", path: "/reports", icon: "📄" },
    { name: "Admin", path: "/admin", icon: "⚙️" }
  ];

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "260px",
        minHeight: "100vh"
      }}
    >

     
      <div className="d-grid gap-2">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`btn ${
              location.pathname === item.path
                ? "btn-primary"
                : "btn-outline-light"
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}

        <hr />

        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;