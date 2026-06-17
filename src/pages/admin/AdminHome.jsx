import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminHome.css";

function AdminHome() {
  const [stats, setStats] = useState({});
  const [leads, setLeads] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadDashboard();
    loadRecentLeads();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/users/dashboard"
      );
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRecentLeads = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/leads"
      );

      setLeads(res.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-home">
      <div className="dashboard-header">
        <div>
          <h1>Welcome Back, Admin 👋</h1>
          <p>Real Estate CRM Dashboard</p>
        </div>

        <div className="header-right">
          <input
            type="text"
            placeholder="Search..."
            className="search-box"
          />
          <div className="profile-wrapper">
  <div
    className="profile-icon" 
    onClick={() => setShowProfile(!showProfile)}
  >
    {user?.name?.charAt(0).toUpperCase()}👤
  </div>

  {showProfile && (
    <div className="profile-dropdown">
      <div className="profile-header">
        <div className="profile-avatar-large">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h5>{user?.name}</h5>
          <p>{user?.role}</p>
        </div>
      </div>

      <hr />

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        🚪 Logout
      </button>
    </div>
  )}
</div>
          
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Users</h4>
          <h2>{stats.totalUsers || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Total Leads</h4>
          <h2>{stats.totalLeads || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Managers</h4>
          <h2>{stats.totalManagers || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Agents</h4>
          <h2>{stats.totalAgents || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Projects</h4>
          <h2>{stats.totalProjects || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Properties</h4>
          <h2>{stats.totalProperties || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Regions</h4>
          <h2>{stats.totalRegions || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Conversion %</h4>
          <h2>72%</h2>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="table-card">
          <h2>Recent Leads</h2>

          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Project</th>
                <th>Region</th>
                <th>Manager</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.leadId}>
                  <td>{lead.customer?.customerName}</td>
                  <td>{lead.project?.projectName}</td>
                  <td>{lead.region?.regionName}</td>
                  <td>{lead.manager?.name}</td>
                  <td>
                    <span className="status-badge">
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chart-card">
          <h2>Lead Status Overview</h2>

          <div className="chart-item">
            <span>New</span>
            <div className="progress-bg">
              <div className="progress-bar w40"></div>
            </div>
            <span>40%</span>
          </div>

          <div className="chart-item">
            <span>Contacted</span>
            <div className="progress-bg">
              <div className="progress-bar w25"></div>
            </div>
            <span>25%</span>
          </div>

          <div className="chart-item">
            <span>Visit</span>
            <div className="progress-bg">
              <div className="progress-bar w20"></div>
            </div>
            <span>20%</span>
          </div>

          <div className="chart-item">
            <span>Closed</span>
            <div className="progress-bg">
              <div className="progress-bar w15"></div>
            </div>
            <span>15%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

