import React, { useEffect, useState } from "react";
import axios from "axios";

function ProjectPage() {
const [projects, setProjects] = useState([]);
const [projectName, setProjectName] = useState("");
const [editingId, setEditingId] = useState(null);

useEffect(() => {
loadProjects();
}, []);

const loadProjects = async () => {
const res = await axios.get(
"http://localhost:8080/projects"
);
setProjects(res.data);
};

const saveProject = async () => {

const project = {
  projectName,
};

if (editingId) {
  await axios.put(
    `http://localhost:8080/projects/${editingId}`,
    project
  );
} else {
  await axios.post(
    "http://localhost:8080/projects",
    project
  );
}

setProjectName("");
setEditingId(null);
loadProjects();

};

const editProject = (project) => {
setEditingId(project.projectId);
setProjectName(project.projectName);
};

const deleteProject = async (id) => {
await axios.delete(
`http://localhost:8080/projects/${id}`
);

loadProjects();


};

return ( <div> <h2>Project Management</h2>
  
  <h5>Add</h5>
  <input
    className="form-control"
    placeholder="Project Name"
    value={projectName}
    onChange={(e) =>
      setProjectName(e.target.value)
    }
  />

  <button
    className="btn btn-primary mt-2"
    onClick={saveProject}
  >
    {editingId ? "Update" : "Save"}
  </button>

  <table className="table mt-3">
    <thead>
      <tr>
        <th>ID</th>
        <th>Project Name</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {projects.map((p) => (
        <tr key={p.projectId}>
          <td>{p.projectId}</td>
          <td>{p.projectName}</td>

          <td>
            <button
              className="btn btn-warning me-2"
              onClick={() =>
                editProject(p)
              }
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                deleteProject(
                  p.projectId
                )
              }
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

export default ProjectPage;
