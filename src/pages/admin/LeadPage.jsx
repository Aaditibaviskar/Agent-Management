import React, { useEffect, useState } from "react";
import axios from "axios";

function LeadPage() {

const [leads, setLeads] = useState([]);
const [managers, setManagers] = useState([]);
const [agents, setAgents] = useState([]);

useEffect(() => {
loadData();
}, []);

const loadData = async () => {


const leadRes =
  await axios.get(
    "http://localhost:8080/leads"
  );

const managerRes =
  await axios.get(
    "http://localhost:8080/managers"
  );

const agentRes =
  await axios.get(
    "http://localhost:8080/agents"
  );

setLeads(leadRes.data);
setManagers(managerRes.data);
setAgents(agentRes.data);

};

const assignLead = async (
leadId,
managerId,
agentId
) => {


if (!managerId || !agentId)
  return;

await axios.put(
  `http://localhost:8080/leads/${leadId}/assign?managerId=${managerId}&agentId=${agentId}`
);

loadData();


};

return ( <div>


  <h2>Lead Assignment</h2>

  <table className="table table-bordered">

    <thead>

      <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Manager</th>
        <th>Agent</th>
        <th>Assign</th>
      </tr>

    </thead>

    <tbody>

      {leads.map((lead) => (

        <LeadRow
          key={lead.leadId}
          lead={lead}
          managers={managers}
          agents={agents}
          assignLead={assignLead}
        />

      ))}

    </tbody>

  </table>

</div>


);
}

function LeadRow({
lead,
managers,
agents,
assignLead
}) {

const [managerId, setManagerId] =
useState("");

const [agentId, setAgentId] =
useState("");

return ( <tr>


  <td>{lead.leadId}</td>

  <td>
    {lead.customer?.customerName}
  </td>

  <td>
    {lead.manager?.name}
  </td>

  <td>
    {lead.agent?.name}
  </td>

  <td>

    <select
      className="form-select mb-2"
      onChange={(e) =>
        setManagerId(
          e.target.value
        )
      }
    >
      <option>
        Select Manager
      </option>

      {managers.map((m) => (

        <option
          key={m.id}
          value={m.id}
        >
          {m.name}
        </option>

      ))}
    </select>

    <select
      className="form-select mb-2"
      onChange={(e) =>
        setAgentId(
          e.target.value
        )
      }
    >
      <option>
        Select Agent
      </option>

      {agents.map((a) => (

        <option
          key={a.id}
          value={a.id}
        >
          {a.name}
        </option>

      ))}
    </select>

    <button
      className="btn btn-primary"
      onClick={() =>
        assignLead(
          lead.leadId,
          managerId,
          agentId
        )
      }
    >
      Assign
    </button>

  </td>

</tr>

);
}

export default LeadPage;
