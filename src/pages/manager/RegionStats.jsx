import React, { useState } from "react";
import axios from "axios";

function RegionStats() {
  const [regionId, setRegionId] =
    useState("");

  const [stats, setStats] =
    useState(null);

  const loadStats = () => {
    axios
      .get(
        `http://localhost:8080/leads/region/${regionId}/stats`
      )
      .then((res) => setStats(res.data));
  };

  return (
    <>
      <h2>Region Statistics</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Region Id"
          value={regionId}
          onChange={(e) =>
            setRegionId(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={loadStats}
        >
          Search
        </button>
      </div>

      {stats && (
        <div className="card p-3">
          <pre>
            {JSON.stringify(
              stats,
              null,
              2
            )}
          </pre>
        </div>
      )}
    </>
  );
}

export default RegionStats;