import React, { useEffect, useState } from "react";
import axios from "axios";

function PropertyPage() {
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filterProjectId, setFilterProjectId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    propertyName: "",
    projectId: "",
    propertyType: "",
    measurementUnit: "",
    unitValue: "",
    address: "",
    status: ""
  });

  // ================= LOAD =================
  useEffect(() => {
    loadProperties();
    loadProjects();
  }, []);

  const loadProperties = async () => {
    const res = await axios.get("http://localhost:8080/properties");
    setProperties(res.data);
  };

  const loadProjects = async () => {
    const res = await axios.get("http://localhost:8080/projects");
    setProjects(res.data);
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "projectId") {
    const selectedProject = projects.find(
      (p) => p.projectId === Number(value)
    );

    setFormData((prev) => ({
      ...prev,
      projectId: value,
      regionId: selectedProject?.region?.regionId || ""
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

  // ================= SAVE =================
  const saveProperty = async (e) => {
    e.preventDefault();

    const payload = {
  propertyName: formData.propertyName,

  project: {
    projectId: Number(formData.projectId)
  },

  region: {
    regionId: Number(formData.regionId)
  },

  propertyType: formData.propertyType,
  measurementUnit: formData.measurementUnit,
  unitValue: Number(formData.unitValue),
  address: formData.address,
  status: formData.status
};

    if (editingId) {
      await axios.put(
        `http://localhost:8080/properties/${editingId}`,
        payload
      );
    } else {
      await axios.post(
        "http://localhost:8080/properties",
        payload
      );
    }

    setFormData({
      propertyName: "",
      projectId: "",
      propertyType: "",
      measurementUnit: "",
      unitValue: "",
      address: "",
      status: ""
    });

    setEditingId(null);
    loadProperties();
  };

  // ================= EDIT =================
  const editProperty = (p) => {
    setEditingId(p.propertyId);

    setFormData({
      propertyName: p.propertyName,
      projectId: p.project?.projectId || "",
      propertyType: p.propertyType || "",
      measurementUnit: p.measurementUnit || "",
      unitValue: p.unitValue || "",
      address: p.address || "",
      status: p.status || ""
    });
  };

  // ================= DELETE =================
  const deleteProperty = async (id) => {
    await axios.delete(`http://localhost:8080/properties/${id}`);
    loadProperties();
  };

  // ================= FORMAT UNIT =================
  const formatUnit = (value, unit) => {
    if (!value || !unit) return "-";

    const unitLabel =
      unit === "SQFT" ? "Sqft" :
      unit === "ACRES" ? "Acres" :
      unit;

    return `${value} ${unitLabel}`;
  };

  return (
    <div>
      <h2>Property Management</h2>

      {/* ================= FORM ================= */}
      <form className="card p-3 mb-4" onSubmit={saveProperty}>
        <div className="row">

          <div className="col-md-4 mb-3">
            <label>Property Name</label>
            <input
              className="form-control"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Project</label>
            <select
              className="form-control"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.projectId} value={p.projectId}>
                  {p.projectName} - {p.region?.regionName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Property Type</label>
            <select
              className="form-control"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="APARTMENT">Apartment</option>
              <option value="VILLA">Villa</option>
              <option value="BUNGALOW">Bungalow</option>
              <option value="PLOT">Plot</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Measurement Unit</label>
            <select
              className="form-control"
              name="measurementUnit"
              value={formData.measurementUnit}
              onChange={handleChange}
            >
              <option value="">Select Unit</option>
              <option value="BHK">BHK</option>
              <option value="SQFT">Sqft</option>
              <option value="ACRES">Acres</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Unit Value</label>
            <input
              type="number"
              className="form-control"
              name="unitValue"
              value={formData.unitValue}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
              <option value="RESERVED">Reserved</option>
            </select>
          </div>

          <div className="col-md-12 mb-3">
            <label>Address</label>
            <input
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

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
                propertyName: "",
                projectId: "",
                propertyType: "",
                measurementUnit: "",
                unitValue: "",
                address: "",
                status: ""
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>
{/* ================= PROJECT FILTER ================= */}
      <select
  className="form-select mb-3"
  value={filterProjectId}
  onChange={(e) => setFilterProjectId(e.target.value)}
>
  <option value="">All Projects</option>

  {projects.map((p) => (
    <option key={p.projectId} value={p.projectId}>
      {p.projectName}
    </option>
  ))}
</select>

      {/* ================= TABLE ================= */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Property</th>
            <th>Project</th>
            <th>Type</th>
            <th>Unit</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {properties.filter((p) =>!filterProjectId ||p.project?.projectId === Number(filterProjectId)
              ).map((p) => (
            <tr key={p.propertyId}>
              <td>{p.propertyId}</td>
              <td>{p.propertyName}</td>

              <td>
                {p.project?.projectName} - {p.region?.regionName}
              </td>

              <td>{p.propertyType}</td>

              <td>
                {formatUnit(p.unitValue, p.measurementUnit)}
              </td>

              <td>{p.status}</td>

              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => editProperty(p)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteProperty(p.propertyId)}
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

export default PropertyPage;