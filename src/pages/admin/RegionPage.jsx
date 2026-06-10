import React, { useEffect, useState } from "react";
import axios from "axios";

function RegionPage() {

const [regions, setRegions] = useState([]);
const [regionName, setRegionName] = useState("");
const [editingId, setEditingId] = useState(null);

useEffect(() => {
loadRegions();
}, []);

const loadRegions = async () => {
const res = await axios.get("http://localhost:8080/regions");
setRegions(res.data);
};

const saveRegion = async () => {


const region = {
  regionName,
};

if (editingId) {
  await axios.put(
    `http://localhost:8080/regions/${editingId}`,
    region
  );
} else {
  await axios.post(
    "http://localhost:8080/regions",
    region
  );
}

setRegionName("");
setEditingId(null);
loadRegions();


};

const editRegion = (region) => {
setEditingId(region.regionId);
setRegionName(region.regionName);
};

const deleteRegion = async (id) => {
await axios.delete(
`http://localhost:8080/regions/${id}`
);
loadRegions();
};

return ( <div>


  <h2>Region Management</h2>

  <input
    className="form-control"
    placeholder="Region Name"
    value={regionName}
    onChange={(e) =>
      setRegionName(e.target.value)
    }
  />

  <button
    className="btn btn-primary mt-2"
    onClick={saveRegion}
  >
    {editingId ? "Update" : "Save"}
  </button>

  <table className="table mt-3">

    <tbody>

      {regions.map((r) => (

        <tr key={r.regionId}>

          <td>{r.regionId}</td>

          <td>{r.regionName}</td>

          <td>

            <button
              className="btn btn-warning me-2"
              onClick={() => editRegion(r)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                deleteRegion(r.regionId)
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

export default RegionPage;
