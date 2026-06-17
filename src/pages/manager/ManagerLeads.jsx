import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAgents } from "../../services/agentService";

function ManagerLeads() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);

  const managerId =
    JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [leadRes, agentRes] = await Promise.all([
        axios.get(
          `http://localhost:8080/leads/manager/${managerId}`
        ),
        getAgents(),
      ]);

      setLeads(leadRes.data);
      setAgents(agentRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (leadId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/leads/${leadId}/status/${status}`
      );

      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const assignAgent = async (leadId, agentId) => {
    try {
      await axios.put(
        `http://localhost:8080/leads/${leadId}/assign-to/${agentId}`
      );

      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Lead Management</h2>

      <div className="card shadow">
        <div className="card-body">

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Assigned Agent</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.leadId}>
                  <td>{lead.leadId}</td>

                  <td>{lead.customerName}</td>

                  <td>{lead.email}</td>

                  <td>{lead.phone}</td>

                  <td>
                    <span className="badge bg-primary">
                      {lead.status}
                    </span>
                  </td>

                  <td>
                    <select
                      className="form-select"
                      value={lead.agent?.userId || ""}
                      onChange={(e) =>
                        assignAgent(
                          lead.leadId,
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Select Agent
                      </option>

                      {agents.map((agent) => (
                        <option
                          key={agent.userId}
                          value={agent.userId}
                        >
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      className="form-select"
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(
                          lead.leadId,
                          e.target.value
                        )
                      }
                    >
                      <option value="NEW">
                        NEW
                      </option>

                      <option value="CONTACTED">
                        CONTACTED
                      </option>

                      <option value="SITE_VISIT">
                        SITE VISIT
                      </option>

                      <option value="BOOKED">
                        CLOSED
                      </option>

                      <option value="LOST">
                        LOST
                      </option>
                    </select>
                  </td>
                </tr>
              ))}

              {leads.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                  >
                    No Leads Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default ManagerLeads;