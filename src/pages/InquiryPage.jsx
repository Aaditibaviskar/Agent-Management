import React, { useState } from "react";
//import { createInquiry } from "../services/inquiryService";
function InquiryForm() {

  const [inquiryType, setInquiryType] = useState("");

  const [propertyType, setPropertyType] = useState("");

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

  // Handle input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Dynamic dropdown options
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

  // Submit form
  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Inquiry Data:", formData);

    alert("Inquiry Saved Successfully");
  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header">
          <h3>New Inquiry</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            {/* CUSTOMER DETAILS */}
            <div className="row mb-3">

              <div className="col-md-4">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobileNo"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* INQUIRY TYPE */}
            <div className="mb-4">

              <label className="fw-bold">
                What are you looking for?
              </label>

              <div className="mt-2">

                <input
                  type="radio"
                  name="inquiryType"
                  value="REQUIREMENT"
                  onChange={(e) =>
                    setInquiryType(e.target.value)
                  }
                />
                <span className="ms-2">
                  Requirement Based
                </span>

              </div>

              <div>

                <input
                  type="radio"
                  name="inquiryType"
                  value="SPECIFIC"
                  onChange={(e) =>
                    setInquiryType(e.target.value)
                  }
                />
                <span className="ms-2">
                  Specific Project / Property
                </span>

              </div>

            </div>

            {/* REQUIREMENT BASED */}
            {inquiryType === "REQUIREMENT" && (

              <div className="border p-3 rounded mb-3">

                <h5>Requirement Details</h5>

                <div className="row">

                  {/* Region */}
                  <div className="col-md-3">
                    <label>Region</label>

                    <select
                      className="form-control"
                      name="regionId"
                      onChange={handleChange}
                    >
                      <option value="">Select Region</option>
                      <option value="1">Pune West</option>
                      <option value="2">Pune East</option>
                      <option value="3">Mumbai</option>
                    </select>
                  </div>

                  {/* Property Type */}
                  <div className="col-md-3">
                    <label>Property Type</label>

                    <select
                      className="form-control"
                      name="propertyType"
                      value={propertyType}
                      onChange={(e) => {

                        setPropertyType(e.target.value);

                        setFormData({
                          ...formData,
                          propertyType: e.target.value,
                          unitValue: ""
                        });

                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="APARTMENT">Apartment</option>
                      <option value="VILLA">Villa</option>
                      <option value="BUNGALOW">Bungalow</option>
                      <option value="LAND">Land</option>
                      <option value="COMMERCIAL">Commercial</option>
                    </select>
                  </div>

                  {/* Dynamic Unit */}
                  <div className="col-md-2">

                    <label>
                      {propertyType === "LAND"
                        ? "Area"
                        : propertyType === "COMMERCIAL"
                        ? "Size"
                        : "Configuration"}
                    </label>

                    <select
                      className="form-control"
                      name="unitValue"
                      value={formData.unitValue}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>

                      {getRequirementOptions().map(
                        (item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        )
                      )}
                    </select>

                  </div>

                  {/* Budget */}
                  <div className="col-md-4">
                    <label>Budget</label>

                    <input
                      type="number"
                      className="form-control"
                      name="budget"
                      onChange={handleChange}
                    />
                  </div>

                </div>

              </div>
            )}

            {/* SPECIFIC PROJECT / PROPERTY */}
            {inquiryType === "SPECIFIC" && (

              <div className="border p-3 rounded mb-3">

                <h5>Project / Property Details</h5>

                <div className="row">

                  <div className="col-md-4">
                    <label>Region</label>

                    <select
                      className="form-control"
                      name="regionId"
                      onChange={handleChange}
                    >
                      <option value="">Select Region</option>
                      <option value="1">Pune West</option>
                      <option value="2">Pune East</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label>Project</label>

                    <select
                      className="form-control"
                      name="projectId"
                      onChange={handleChange}
                    >
                      <option value="">Select Project</option>
                      <option value="1">Green Valley Residency</option>
                      <option value="2">Sky Heights</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label>Property</label>

                    <select
                      className="form-control"
                      name="propertyId"
                      onChange={handleChange}
                    >
                      <option value="">Select Property</option>
                      <option value="101">Flat A-101</option>
                      <option value="102">Flat B-202</option>
                    </select>
                  </div>

                </div>

                <div className="row mt-3">

                  <div className="col-md-4">
                    <label>Budget</label>

                    <input
                      type="number"
                      className="form-control"
                      name="budget"
                      onChange={handleChange}
                    />
                  </div>

                </div>

              </div>
            )}

            {/* REMARKS */}
            <div className="mb-3">

              <label>Remarks</label>

              <textarea
                className="form-control"
                rows="3"
                name="remarks"
                onChange={handleChange}
              />

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Inquiry
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default InquiryForm;