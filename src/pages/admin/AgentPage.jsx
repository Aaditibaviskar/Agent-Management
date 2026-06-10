import React, { useEffect, useState } from "react";
import axios from "axios";

function AgentPage() {

const [agents, setAgents] = useState([]);
const [name, setName] = useState("");
const [editingId, setEditingId] = useState(null);

useEffect(() => {
loadAgents();
}, []);

const loadAgents = async () => {
const res = await axios.get("http://localhost:8080/agents");
setAgents(res.data);
};

const saveAgent = async () => {


const agent = { name };

if (editingId) {
  await axios.put(
    `http://localhost:8080/agents/${editingId}`,
    agent
  );
} else {
  await axios.post(
    "http://localhost:8080/agents",
    agent
  );
}

setName("");
setEditingId(null);
loadAgents();


};

const editAgent = (agent) => {
setEditingId(agent.id);
setName(agent.name);
};

const deleteAgent = async (id) => {
await axios.delete(
`http://localhost:8080/agents/${id}`
);
loadAgents();
};

return ( <div> <h2>Agent Management</h2>


  <input
    className="form-control"
    placeholder="Agent Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <button
    className="btn btn-success mt-2"
    onClick={saveAgent}
  >
    {editingId ? "Update" : "Save"}
  </button>

  <table className="table mt-3">
    <tbody>
      {agents.map((a) => (
        <tr key={a.id}>
          <td>{a.id}</td>
          <td>{a.name}</td>

          <td>
            <button
              className="btn btn-warning me-2"
              onClick={() => editAgent(a)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() => deleteAgent(a.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


);
}

export default AgentPage;
