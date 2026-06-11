import React, { useEffect, useState } from "react";
import {
  createManager,
  getRegions
} from "../../services/managerService";

import { useNavigate } from "react-router-dom";

function AddManager() {

  const navigate = useNavigate();

  const [regions, setRegions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    regionId: ""
  });

  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    const res = await getRegions();
    setRegions(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const manager = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: "MANAGER",
      isActive: true,
      region: {
        regionId:
          formData.regionId
      }
    };

    await createManager(manager);

    navigate("/managers");
  };

  return (
    <div className="container mt-4">

      <button
        className="btn btn-secondary mb-3"
        onClick={() =>
          navigate("/managers")
        }
      >
        Back
      </button>

      <h2>Add Manager</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-2"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Phone"
          name="phone"
          onChange={handleChange}
          required
        />

        <select
          className="form-select mb-3"
          name="regionId"
          onChange={handleChange}
          required
        >
          <option value="">
            Select Region
          </option>

          {regions.map((region) => (
            <option
              key={region.regionId}
              value={region.regionId}
            >
              {region.regionName}
            </option>
          ))}
        </select>

        <button
          className="btn btn-success"
          type="submit"
        >
          Save
        </button>

      </form>

    </div>
  );
}

export default AddManager;