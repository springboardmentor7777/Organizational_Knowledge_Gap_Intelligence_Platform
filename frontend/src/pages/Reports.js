import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Reports() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Reports</h2>

          <div className="card shadow">

            <div className="card-header bg-success text-white">
              Generate Reports
            </div>

            <div className="card-body">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>Report Name</th>
                    <th>Description</th>
                    <th>Download</th>
                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>Employee Skill Report</td>
                    <td>Shows all employee skills and proficiency levels.</td>
                    <td>
                      <button className="btn btn-primary">
                        Download PDF
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>Knowledge Gap Report</td>
                    <td>Displays all identified knowledge gaps.</td>
                    <td>
                      <button className="btn btn-success">
                        Download Excel
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>Training Completion Report</td>
                    <td>Shows completed and pending training.</td>
                    <td>
                      <button className="btn btn-warning">
                        Download PDF
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>Department Analytics</td>
                    <td>Department-wise learning statistics.</td>
                    <td>
                      <button className="btn btn-info">
                        Download Excel
                      </button>
                    </td>
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

export default Reports;