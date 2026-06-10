function ReportsPage() {

  return (
    <div>

      <h2>Reports</h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Leads</h5>
            <h2>25</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Managers</h5>
            <h2>5</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Agents</h5>
            <h2>15</h2>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ReportsPage;