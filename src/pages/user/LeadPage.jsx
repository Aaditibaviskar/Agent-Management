import React, { useEffect, useState } from "react";
import axios from "axios";

function LeadPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/leads"
      );

      console.log("Leads:", response.data);

      setLeads(response.data);
    } catch (error) {
      console.error("Error loading leads:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lead Management</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Budget</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.leadId}>
              <td>{lead.leadId}</td>

              <td>
                {lead.customer
                  ? lead.customer.customerName
                  : "N/A"}
              </td>

              <td>
                {lead.customer
                  ? lead.customer.customerPhone
                  : "N/A"}
              </td>

              <td>{lead.budget}</td>

              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadPage;