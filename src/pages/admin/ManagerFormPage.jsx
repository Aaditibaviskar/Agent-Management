import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getManagerById,
  getRegions,
  saveManager,
  updateManager
} from "../../services/managerService";

function ManagerFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [regions, setRegions] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    regionId: "",
    active: true
  });

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const regionRes = await getRegions();
        setRegions(regionRes.data);

        if (isEdit) {
          const managerRes = await getManagerById(id);
          const manager = managerRes.data;

          setFormData({
            name: manager.name || "",
            email: manager.email || "",
            password: manager.password ||"",
            phone: manager.phone || "",
            regionId: manager.region?.regionId || "",
            active: manager.active
          });
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load manager form");
      }
    };

    loadFormData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const manager = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: Number(formData.phone),
      role: "MANAGER",
      active: formData.active,
      region: {
        regionId: Number(formData.regionId)
      }
    };

    try {
      if (isEdit) {
        await updateManager(id, manager);
      } else {
        await saveManager(manager);
      }

      navigate("/admin/managers");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Manager save failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{isEdit ? "Edit Manager" : "Add Manager"}</h2>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/managers")}
        >
          Back
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="card p-3" onSubmit={handleSubmit}>
        <div className="row">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label={isEdit ? "New Password" : "Password"}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEdit}
          />

          <Input
            label="Phone"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
          />

          <div className="col-md-4 mb-3">
            <label>Region</label>
            <select
              className="form-select"
              name="regionId"
              value={formData.regionId}
              onChange={handleChange}
              required
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.regionId} value={region.regionId}>
                  {region.regionName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3 d-flex align-items-end">
            <label className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
              <span className="form-check-label ms-2">Active</span>
            </label>
          </div>
        </div>

        <button className="btn btn-primary">
          {isEdit ? "Update Manager" : "Save Manager"}
        </button>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = true
}) {
  return (
    <div className="col-md-4 mb-3">
      <label>{label}</label>
      <input
        className="form-control"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default ManagerFormPage;
