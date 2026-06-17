import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/authService";

function ManagerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const menu = [
    { name: "Dashboard", path: "/manager/dashboard" },
    { name: "Leads", path: "/manager/leads" },
    { name: "Inquiry", path: "/manager/inquiry" },
    { name: "Reports", path: "/manager/reports" },
   { name: "Agents", path: "/manager/agents" }
  ];

  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "250px",
          minHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <h3 className="text-center">Manager Panel</h3>

        <p className="text-white-50 text-center">
          {user?.name} ({user?.role})
        </p>

        <ul className="nav flex-column mt-4">

          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li className="nav-item mb-2" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link text-white rounded px-2 py-2 ${
                    isActive ? "bg-primary" : "hover-bg"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

        </ul>

        <button
          className="btn btn-outline-light mt-4 w-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="container-fluid p-4"
        style={{ marginLeft: "250px" }}
      >
        <Outlet />
      </div>

    </div>
  );
}

export default ManagerDashboard;