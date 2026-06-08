import React, { useEffect, useState } from "react";
function LeadPage() {
const [leads, setLeads] = useState([]);

useEffect(() => {
fetchLeads();
}, []);

const fetchLeads = async () => {
try {
const response = await fetch(
  "http://localhost:8080/leads"
);


  const data = await response.json();

  setLeads(data);
} catch (error) {
  console.error("Error fetching leads:", error);
}


};

return ( <div className="container mt-4">


  <h2>Lead Management</h2>

  <table className="table table-bordered table-striped">

    <thead>
      <tr>
        <th>Lead ID</th>
        <th>Customer ID</th>
        <th>Region ID</th>
        <th>Property Type</th>
        <th>Unit</th>
        <th>Value</th>
        <th>Budget</th>
        <th>Source</th>
        <th>Status</th>
        <th>Manager</th>
        <th>Agent</th>
      </tr>
    </thead>

    <tbody>

      {leads.length > 0 ? (
        leads.map((lead) => (
          <tr key={lead.leadId}>

            <td>{lead.leadId}</td>
            <td>{lead.customerId}</td>
            <td>{lead.regionId}</td>
            <td>{lead.propertyType}</td>
            <td>{lead.measurementUnit}</td>
            <td>{lead.unitValue}</td>
            <td>{lead.budget}</td>
            <td>{lead.source}</td>
            <td>{lead.status}</td>
            <td>{lead.assignedManagerId}</td>
            <td>{lead.assignedAgentId}</td>

          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="11" className="text-center">
            No Leads Found
          </td>
        </tr>
       
      
  
      )}

    </tbody>

  </table>

</div>


);
}

export default LeadPage;
