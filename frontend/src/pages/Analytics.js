import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Analytics() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Analytics Dashboard</h2>

          {/* Summary Cards */}

          <div className="row">

            <div className="col-md-3">
              <div className="card shadow border-primary">
                <div className="card-body text-center">
                  <h5>Total Employees</h5>
                  <h2>250</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-success">
                <div className="card-body text-center">
                  <h5>Training Completed</h5>
                  <h2>180</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-warning">
                <div className="card-body text-center">
                  <h5>Pending Training</h5>
                  <h2>45</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-danger">
                <div className="card-body text-center">
                  <h5>Critical Skill Gaps</h5>
                  <h2>25</h2>
                </div>
              </div>
            </div>

          </div>

          <br />

          {/* Progress Bars */}

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              Department Skill Coverage
            </div>

            <div className="card-body">

              <h6>Software Development</h6>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-success"
                  style={{ width: "85%" }}
                >
                  85%
                </div>
              </div>

              <h6>Quality Assurance</h6>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-info"
                  style={{ width: "75%" }}
                >
                  75%
                </div>
              </div>

              <h6>Cloud Team</h6>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "60%" }}
                >
                  60%
                </div>
              </div>

              <h6>DevOps</h6>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "40%" }}
                >
                  40%
                </div>
              </div>

            </div>

          </div>

          <br />

          {/* Department Table */}

          <div className="card shadow">

            <div className="card-header bg-dark text-white">
              Department Summary
            </div>

            <div className="card-body">

              <table className="table table-bordered table-hover">

                <thead className="table-primary">

                  <tr>
                    <th>Department</th>
                    <th>Employees</th>
                    <th>Completed</th>
                    <th>Pending</th>
                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>Development</td>
                    <td>120</td>
                    <td>95</td>
                    <td>25</td>
                  </tr>

                  <tr>
                    <td>QA</td>
                    <td>60</td>
                    <td>45</td>
                    <td>15</td>
                  </tr>

                  <tr>
                    <td>Cloud</td>
                    <td>40</td>
                    <td>20</td>
                    <td>20</td>
                  </tr>

                  <tr>
                    <td>DevOps</td>
                    <td>30</td>
                    <td>20</td>
                    <td>10</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Analytics;