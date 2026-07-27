import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Admin() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Admin Panel</h2>

          {/* Dashboard Cards */}

          <div className="row">

            <div className="col-md-3 mb-3">
              <div className="card shadow border-primary">
                <div className="card-body text-center">
                  <h5>Total Employees</h5>
                  <h2>250</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow border-success">
                <div className="card-body text-center">
                  <h5>Departments</h5>
                  <h2>8</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow border-warning">
                <div className="card-body text-center">
                  <h5>Training Programs</h5>
                  <h2>24</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow border-danger">
                <div className="card-body text-center">
                  <h5>Active Users</h5>
                  <h2>198</h2>
                </div>
              </div>
            </div>

          </div>

          {/* User Management */}

          <div className="card shadow mt-4">

            <div className="card-header bg-primary text-white">
              User Management
            </div>

            <div className="card-body">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>EMP001</td>
                    <td>Asad Pathan</td>
                    <td>Development</td>
                    <td>Employee</td>
                    <td>
                      <span className="badge bg-success">
                        Active
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>EMP002</td>
                    <td>Siri</td>
                    <td>QA</td>
                    <td>Manager</td>
                    <td>
                      <span className="badge bg-success">
                        Active
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>EMP003</td>
                    <td>Kanishka C</td>
                    <td>Cloud</td>
                    <td>HR</td>
                    <td>
                      <span className="badge bg-warning">
                        Pending
                      </span>
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="card shadow mt-4">

            <div className="card-header bg-success text-white">
              Admin Actions
            </div>

            <div className="card-body">

              <button className="btn btn-primary me-2">
                Add Employee
              </button>

              <button className="btn btn-success me-2">
                Add Department
              </button>

              <button className="btn btn-warning me-2">
                Add Training
              </button>

              <button className="btn btn-danger">
                System Settings
              </button>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Admin;