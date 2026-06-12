import React, { useEffect, useState } from "react";
import axios from "axios";

function ProjectPage() {
const [projects, setProjects] = useState([]);
//const [projectName, setProjectName] = useState("");
const [editingId, setEditingId] = useState(null);
const [regions, setRegions] = useState([]);
//const [regionId, setRegionId] = useState("");
const [filterRegionId, setFilterRegionId] = useState("");
const [formData, setFormData] = useState({
  projectName: "",
  developerName: "",
  regionId: "",
  projectType: "",
  projectStatus: "",
  address: "",
  description: "",
  totalUnits: "",
  launchDate: "",
  expectedCompletionDate: ""
});

useEffect(() => {
loadProjects(); loadRegions();
}, []);

const loadProjects = async () => {
const res = await axios.get(
"http://localhost:8080/projects"
);
console.log("RAW PROJECT RESPONSE:", res.data);
setProjects(res.data);
};

const loadRegions = async () => {
  const res = await axios.get(
    "http://localhost:8080/regions"
  );

  setRegions(res.data);
};

const saveProject = async (e) => {
  e.preventDefault();

  const project = {
    projectName: formData.projectName,
    developerName: formData.developerName,
    region: {
      regionId: Number(formData.regionId)
    },
    projectType: formData.projectType,
    projectStatus: formData.projectStatus,
    address: formData.address,
    description: formData.description,
    totalUnits: Number(formData.totalUnits),
    launchDate: formData.launchDate,
    expectedCompletionDate: formData.expectedCompletionDate
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

  setFormData({
    projectName: "",
    developerName: "",
    regionId: "",
    projectType: "",
    projectStatus: "",
    address: "",
    description: "",
    totalUnits: "",
    launchDate: "",
    expectedCompletionDate: ""
  });

  setEditingId(null);
  loadProjects();
};  

const editProject = (project) => {
  setEditingId(project.projectId);

  setFormData({
    projectName: project.projectName,
    developerName: project.developerName,
    regionId: project.region?.regionId || "",
    projectType: project.projectType,
    projectStatus: project.projectStatus,
    address: project.address,
    description: project.description,
    totalUnits: project.totalUnits,
    launchDate: project.launchDate,
    expectedCompletionDate: project.expectedCompletionDate
  });
};

const deleteProject = async (id) => {
await axios.delete(
`http://localhost:8080/projects/${id}`
);

loadProjects();
};

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

console.log(projects);
console.log(regions);
return ( <div> <h2>Project Management</h2>
  
  <form className="card p-3 mb-4" onSubmit={saveProject}>
  <div className="row">

    {/* Project Name */}
    <input
      name="projectName"
      label="Project Name"
      value={formData.projectName}
      onChange={handleChange}
      placeholder="Project Name"
    />

    {/* Developer */}
    <input
      name="developerName"
      label="Developer Name"
      value={formData.developerName}
      onChange={handleChange}
      placeholder="Developer Name"
    />

    {/* Region */}
    <div className="col-md-4 mb-3">
      <label>Region</label>
      <select
        className="form-control"
        name="regionId"
        value={formData.regionId}
        onChange={handleChange}
        required
      >
        <option value="">Select Region</option>
        {regions.map((r) => (
          <option key={r.regionId} value={r.regionId}>
            {r.regionName}
          </option>
        ))}
      </select>
    </div>

    {/* Project Type */}
    <div className="col-md-4 mb-3">
      <label>Project Type</label>
      <select
        className="form-control"
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
      >
        <option value="">Select Type</option>
        <option value="RESIDENTIAL">Residential</option>
        <option value="COMMERCIAL">Commercial</option>
        <option value="MIXED_USE">Mixed Use</option>
      </select>
    </div>

    {/* Project Status */}
    <div className="col-md-4 mb-3">
      <label>Project Status</label>
      <select
        className="form-control"
        name="projectStatus"
        value={formData.projectStatus}
        onChange={handleChange}
      >
        <option value="">Select Status</option>
        <option value="UPCOMING">Upcoming</option>
        <option value="ONGOING">Ongoing</option>
        <option value="COMPLETED">Completed</option>
      </select>
    </div>

    {/* Address */}
    <input
      name="address"
      label="Address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Address"
    />

    {/* Description */}
    <input
      name="description"
      label="Description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Description"
    />

    {/* Total Units */}
    <input
      name="totalUnits"
      label="Total Units"
      value={formData.totalUnits}
      onChange={handleChange}
      placeholder="Total Units"
    />

    {/* Launch Date */}
    <input
      name="launchDate"
      label="Launch Date"
      type="date"
      value={formData.launchDate}
      onChange={handleChange}
      placeholder="Launch Date"
    />

    {/* Expected Completion */}
    <input
      name="expectedCompletionDate"
      label="Expected Completion"
      type="date"
      value={formData.expectedCompletionDate}
      onChange={handleChange}
      placeholder="Expected Completion Date"
    />

  </div>

  <button className="btn btn-success me-2">
    {editingId ? "Update" : "Save"}
  </button>

  {editingId && (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => {
        setEditingId(null);
        setFormData({
          projectName: "",
          developerName: "",
          regionId: "",
          projectType: "",
          projectStatus: "",
          address: "",
          description: "",
          totalUnits: "",
          launchDate: "",
          expectedCompletionDate: ""
        });
      }}
    >
      Cancel
    </button>
  )}
</form>

  <select
  className="form-select mt-3"
  value={filterRegionId}
  onChange={(e) =>
    setFilterRegionId(e.target.value)
  }
>
  <option value="">
    All Regions
  </option>

  {regions.map((r) => (
    <option
      key={r.regionId}
      value={r.regionId}
    >
      {r.regionName}
    </option>
  ))}
</select>

  <table className="table mt-3">
    <thead>
      <tr>
        <th>ID</th>
        <th>Project Name</th>
        <th>Region</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {projects.filter((p) =>!filterRegionId ||p.region?.regionId === Number(filterRegionId))
      .map((p) => (
        <tr key={p.projectId}>
          <td>{p.projectId}</td>
          <td>{p.projectName}</td>
          <td>
            {
              p.region?.regionName || "N/A"
            }
          </td>

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
