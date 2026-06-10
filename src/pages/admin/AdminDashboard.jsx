import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminDash.css";

function AdminDashboard() {
  return (
    <div className="d-flex">

      <div
        className="sidebar"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h3>Admin Panel</h3>

        <ul className="nav flex-column">

          <li>
            <Link to="/admin/managers">Managers</Link>
          </li>

          <li>
            <Link to="/admin/agents">Agents</Link>
          </li>

          <li>
            <Link to="/admin/regions">Regions</Link>
          </li>

          <li>
            <Link to="/admin/projects">Projects</Link>
          </li>

          <li>
            <Link to="/admin/properties">Properties</Link>
          </li>

          <li>
            <Link to="/admin/leads">Leads</Link>
          </li>

          <li>
            <Link to="/admin/reports">Reports</Link>
          </li>

        </ul>
      </div>

      <div className="container-fluid p-4">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminDashboard;