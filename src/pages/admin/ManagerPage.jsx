import React, { useEffect, useState } from "react";
import {
  getManagers,
  deleteManager,
  getRegions
} from "../../services/managerService";

import { useNavigate } from "react-router-dom";

function ManagerPage() {
  const [managers, setManagers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [regionFilter, setRegionFilter] = useState("");
  const [regions, setRegions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadManagers();
  }, []);

  const loadManagers = async () => {
  try {
    const [managerRes, regionRes] = await Promise.all([
      getManagers(),
      getRegions()
    ]);

    console.log("Managers Response:", managerRes.data);
    console.log("Regions Response:", regionRes.data);

    setManagers(managerRes.data);
    setRegions(regionRes.data);

  } catch (err) {
    console.error("API Error:", err);
  }
};

const handleDelete = async (id) => {
  if (window.confirm("Delete this manager?")) {
    await deleteManager(id);
    loadManagers();
  }
};

  const filteredManagers = managers.filter((manager) => {

  const regionMatch =
    regionFilter === "" ||
    manager.region?.regionId === Number(regionFilter);

  const statusMatch =
    statusFilter === "ALL" ||
    String(manager.active).toUpperCase() === statusFilter;

  return regionMatch && statusMatch;
});

  // const regions = [
  //   ...new Set(
  //     managers
  //       .map((m) => m.region?.regionName)
  //       .filter(Boolean)
  //   )
  // ];
  const regionOptions = regions.map(r => r.regionName);

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manager Management</h2>

        <button
  className="btn btn-primary"
  onClick={() => navigate("/admin/managers/add")}
>
  Add Manager
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
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="ALL">
              All Status
            </option>

            <option value="TRUE">
              Active
            </option>

            <option value="FALSE">
              Inactive
            </option>
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

          {filteredManagers.map((manager) => (
            <tr key={manager.userId}>
              <td>{manager.userId}</td>
              <td>{manager.name}</td>
              <td>{manager.email}</td>
              <td>{manager.phone}</td>

              <td>
                {manager.region?.regionName}
              </td>

              <td>
                {manager.active
                  ? "Active"
                  : "Inactive"}
              </td>

              <td>{manager.createdAt}</td>

              <td>
                {manager.updatedAt || "-"}
              </td>

              <td>

                <button
  className="btn btn-warning btn-sm me-2"
  onClick={() =>
    navigate(`/admin/managers/edit/${manager.userId}`)
  }
>
  Edit
</button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(manager.userId)
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

export default ManagerPage;