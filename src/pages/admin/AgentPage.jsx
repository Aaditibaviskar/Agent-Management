import React, { useEffect, useState } from "react";
import {
  getAgents,
  deleteAgent,
  getRegions
} from "../../services/agentService";

import { useNavigate } from "react-router-dom";

function AgentPage() {
  const [agents, setAgents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [regionFilter, setRegionFilter] = useState("");
  const [regions, setRegions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const [agentRes, regionRes] = await Promise.all([
        getAgents(),
        getRegions(),
      ]);

      setAgents(agentRes.data);
      setRegions(regionRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this agent?")) {
      await deleteAgent(id);
      loadAgents();
    }
  };

  const filteredAgents = agents.filter((agent) => {
    const regionMatch =
      regionFilter === "" ||
      agent.region?.regionId === Number(regionFilter);

    const statusMatch =
      statusFilter === "ALL" ||
      String(agent.active).toUpperCase() === statusFilter;

    return regionMatch && statusMatch;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Agent Management</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/agents/add")}
        >
          Add Agent
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">All Regions</option>

            {regions.map((r) => (
              <option key={r.regionId} value={r.regionId}>
                {r.regionName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="TRUE">Active</option>
            <option value="FALSE">Inactive</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Region</th>
            <th>Status</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAgents.map((agent) => (
            <tr key={agent.userId}>
              <td>{agent.userId}</td>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.phone}</td>

              <td>{agent.region?.regionName}</td>

              <td>
                {agent.active ? "Active" : "Inactive"}
              </td>

              <td>{agent.createdAt}</td>

              <td>{agent.updatedAt || "-"}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    navigate(`/admin/agents/edit/${agent.userId}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(agent.userId)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredAgents.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center">
                No agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AgentPage;