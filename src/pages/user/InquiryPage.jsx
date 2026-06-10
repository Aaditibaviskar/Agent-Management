import React, { useState, useEffect } from "react";
import axios from "axios";
import { submitInquiry } from "../../services/inquiryService";

function InquiryForm() {
  const [inquiryType, setInquiryType] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [regions, setRegions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    mobileNo: "",
    email: "",
    regionId: "",
    propertyType: "",
    unitValue: "",
    budget: "",
    projectId: "",
    propertyId: "",
    remarks: ""
  });

  // ================= LOAD REGIONS =================
  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/regions");
      setRegions(response.data);
    } catch (error) {
      console.error("Error loading regions:", error);
    }
  };

  // ================= REGION CHANGE =================
  const handleRegionChange = async (e) => {
    const regionId = e.target.value;

    setFormData({
      ...formData,
      regionId,
      projectId: "",
      propertyId: ""
    });

    setProjects([]);
    setProperties([]);

    if (regionId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/projects/region/${regionId}`
        );

        setProjects(response.data);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    }
  };

  // ================= PROJECT CHANGE =================
  const handleProjectChange = async (e) => {
    const projectId = e.target.value;

    setFormData({
      ...formData,
      projectId,
      propertyId: ""
    });

    setProperties([]);

    if (projectId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/properties/project/${projectId}`
        );

        setProperties(response.data);
      } catch (error) {
        console.error("Error loading properties:", error);
      }
    }
  };

  // ================= PROPERTY CHANGE =================
  const handlePropertyChange = (e) => {
    setFormData({
      ...formData,
      propertyId: e.target.value
    });
  };

  // ================= COMMON INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= REQUIREMENT OPTIONS =================
  const getRequirementOptions = () => {
    switch (propertyType) {
      case "APARTMENT":
      case "VILLA":
      case "BUNGALOW":
        return ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"];

      case "LAND":
        return ["1 Acre", "2 Acre", "3 Acre", "5 Acre", "10 Acre"];

      case "COMMERCIAL":
        return ["500 Sq Ft", "1000 Sq Ft", "1500 Sq Ft", "2000 Sq Ft"];

      default:
        return [];
    }
  };

  // ================= SUBMIT =================
const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
  customer: {
    customerName: formData.customerName,
    customerPhone: formData.mobileNo,
    customerEmail: formData.email
  },

  region: {
    regionId: Number(formData.regionId)
  },

  project: {
    projectId: Number(formData.projectId)
  },

  property: {
    propertyId: Number(formData.propertyId)
  },

  budget: Number(formData.budget),
  remarks: formData.remarks
};

console.log("Sending payload:");
console.log(JSON.stringify(payload, null, 2));

  try {
    console.log("Sending payload:", payload);

    await axios.post("http://localhost:8080/leads", payload);

    alert("Inquiry Saved Successfully");
  } catch (error) {
    console.error("Submit error:", error);
  }
};

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h3>New Inquiry</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            {/* CUSTOMER */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Customer Name</label>
                <input className="form-control" name="customerName" onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label>Mobile</label>
                <input className="form-control" name="mobileNo" onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label>Email</label>
                <input className="form-control" name="email" onChange={handleChange} />
              </div>
            </div>

            {/* TYPE */}
            <input
  type="radio"
  name="inquiryType"
  value="REQUIREMENT"
  checked={inquiryType === "REQUIREMENT"}
  onChange={(e) => setInquiryType(e.target.value)}
/> Requirement Based

<input
  className="ms-3"
  type="radio"
  name="inquiryType"
  value="SPECIFIC"
  checked={inquiryType === "SPECIFIC"}
  onChange={(e) => setInquiryType(e.target.value)}
/> Specific Project
            {inquiryType === "REQUIREMENT" && (
  <div className="border p-3 mb-3">

    {/* PROPERTY TYPE */}
    <div className="mb-3">
         {/* REGION */}
                  <div className="col-md-4">
                    <label>Region</label>
                    <select
                      className="form-control"
                      value={formData.regionId}
                      onChange={handleRegionChange}
                    >
                      <option value="">Select Region</option>
                      {regions.map((r) => (
                        <option key={r.regionId} value={r.regionId}>
                          {r.regionName}
                        </option>
                      ))}
                    </select>
                  </div>
      <label>Property Type</label>
      <select
        className="form-control"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="APARTMENT">Apartment</option>
        <option value="VILLA">Villa</option>
        <option value="BUNGALOW">Bungalow</option>
        <option value="LAND">Land</option>
        <option value="COMMERCIAL">Commercial</option>
      </select>
    </div>

    {/* REQUIREMENT OPTIONS */}
    <div className="mb-3">
      <label>Requirement</label>
      <select className="form-control">
        <option value="">Select Requirement</option>
        {getRequirementOptions().map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
    <div className="row mb-3">
  <div className="col-md-4">
    <label>Budget</label>
    <input
      type="number"
      className="form-control"
      name="budget"
      value={formData.budget}
      onChange={handleChange}
      placeholder="Enter Budget"
    />
  </div>
</div>

  </div>
)}

            {/* ================= SPECIFIC FLOW ================= */}
            {inquiryType === "SPECIFIC" && (
              <div className="border p-3 mb-3">

                <div className="row">

                  {/* REGION */}
                  <div className="col-md-4">
                    <label>Region</label>
                    <select
                      className="form-control"
                      value={formData.regionId}
                      onChange={handleRegionChange}
                    >
                      <option value="">Select Region</option>
                      {regions.map((r) => (
                        <option key={r.regionId} value={r.regionId}>
                          {r.regionName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PROJECT */}
                  <div className="col-md-4">
                    <label>Project</label>
                    <select
                      className="form-control"
                      value={formData.projectId}
                      onChange={handleProjectChange}
                      disabled={!formData.regionId}
                    >
                      <option value="">Select Project</option>
                      {projects.map((p) => (
                        <option key={p.projectId} value={p.projectId}>
                          {p.projectName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PROPERTY */}
                  <div className="col-md-4">
                    <label>Property</label>
                    <select
                      className="form-control"
                      value={formData.propertyId}
                      onChange={handlePropertyChange}
                      disabled={!formData.projectId}
                    >
                      <option value="">Select Property</option>
                      {properties.map((p) => (
                        <option key={p.propertyId} value={p.propertyId}>
                          {p.propertyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row mb-3">
  <div className="col-md-4">
    <label>Budget</label>
    <input
      type="number"
      className="form-control"
      name="budget"
      value={formData.budget}
      onChange={handleChange}
      placeholder="Enter Budget"
    />
  </div>
</div>

                </div>
              </div>
            )}

            {/* REMARKS */}
            <textarea
              className="form-control mb-3"
              name="remarks"
              onChange={handleChange}
              placeholder="Remarks"
            />

            <button className="btn btn-primary">
              Save Inquiry
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default InquiryForm;