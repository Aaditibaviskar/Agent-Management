import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../styles/UserDash.css";

function Dashboard() {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div
        className="sidebar"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h4 className="mb-4">Real Estate CRM</h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/" className="nav-link text-white">Dashboard</Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/leads" className="nav-link text-white">Leads</Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/inquire" className="nav-link text-white">Inquiry</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4">
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;