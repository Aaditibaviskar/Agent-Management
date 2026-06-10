import React from "react";

function Home() {
  return (
    <>
      <h2 className="mb-4">Real Estate CRM Dashboard</h2>

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5>Total Leads</h5>
              <h2>120</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5>Total Properties</h5>
              <h2>85</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning">
            <div className="card-body">
              <h5>Site Visits</h5>
              <h2>45</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5>Bookings</h5>
              <h2>18</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;