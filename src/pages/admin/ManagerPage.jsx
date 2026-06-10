import React, { useEffect, useState } from "react";
import axios from "axios";

function ManagerPage() {

const [managers, setManagers] = useState([]);
const [name, setName] = useState("");
const [editingId, setEditingId] = useState(null);

useEffect(() => {
loadManagers();
}, []);

const loadManagers = async () => {
const res = await axios.get("http://localhost:8080/managers");
setManagers(res.data);
};

const saveManager = async () => {


const manager = { name };

if (editingId) {
  await axios.put(
    `http://localhost:8080/managers/${editingId}`,
    manager
  );
} else {
  await axios.post(
    "http://localhost:8080/managers",
    manager
  );
}

setName("");
setEditingId(null);
loadManagers();


};

const editManager = (manager) => {
setEditingId(manager.id);
setName(manager.name);
};

const deleteManager = async (id) => {
await axios.delete(
`http://localhost:8080/managers/${id}`
);
loadManagers();
};

return ( <div> <h2>Manager Management</h2>


  <input
    className="form-control"
    placeholder="Manager Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <button
    className="btn btn-primary mt-2"
    onClick={saveManager}
  >
    {editingId ? "Update" : "Save"}
  </button>

  <table className="table mt-3">
    <tbody>
      {managers.map((m) => (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td>{m.name}</td>

          <td>
            <button
              className="btn btn-warning me-2"
              onClick={() => editManager(m)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() => deleteManager(m.id)}
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

export default ManagerPage;
