import React, { useEffect, useState } from "react";
import axios from "axios";

function PropertyPage() {

const [properties, setProperties] =
useState([]);

const [propertyName, setPropertyName] =
useState("");

const [price, setPrice] =
useState("");

const [editingId, setEditingId] =
useState(null);

useEffect(() => {
loadProperties();
}, []);

const loadProperties = async () => {
const res = await axios.get(
"http://localhost:8080/properties"
);


setProperties(res.data);

};

const saveProperty = async () => {


const property = {
  propertyName,
  price,
};

if (editingId) {

  await axios.put(
    `http://localhost:8080/properties/${editingId}`,
    property
  );

} else {

  await axios.post(
    "http://localhost:8080/properties",
    property
  );
}

setPropertyName("");
setPrice("");
setEditingId(null);

loadProperties();


};

const editProperty = (property) => {


setEditingId(
  property.propertyId
);

setPropertyName(
  property.propertyName
);

setPrice(
  property.price
);


};

const deleteProperty = async (id) => {


await axios.delete(
  `http://localhost:8080/properties/${id}`
);

loadProperties();


};

return ( <div>


  <h2>Property Management</h2>
  <h5>Add</h5>
  <input
    className="form-control mb-2"
    placeholder="Property Name"
    value={propertyName}
    onChange={(e) =>
      setPropertyName(
        e.target.value
      )
    }
  />

  <input
    className="form-control mb-2"
    placeholder="Price"
    value={price}
    onChange={(e) =>
      setPrice(
        e.target.value
      )
    }
  />

  <button
    className="btn btn-success"
    onClick={saveProperty}
  >
    {editingId
      ? "Update"
      : "Save"}
  </button>

  <table className="table mt-3">

    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {properties.map((p) => (

        <tr key={p.propertyId}>

          <td>{p.propertyId}</td>

          <td>
            {p.propertyName}
          </td>

          <td>
            {p.price}
          </td>

          <td>

            <button
              className="btn btn-warning me-2"
              onClick={() =>
                editProperty(p)
              }
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                deleteProperty(
                  p.propertyId
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

export default PropertyPage;
