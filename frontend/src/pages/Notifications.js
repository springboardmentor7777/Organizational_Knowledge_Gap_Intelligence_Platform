import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Notifications() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Notifications</h2>

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              Recent Notifications
            </div>

            <div className="card-body">

              <table className="table table-striped table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>ID</th>

                    <th>Message</th>

                    <th>Type</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>1</td>
                    <td>Docker Training assigned.</td>
                    <td>Training</td>
                    <td>
                      <span className="badge bg-success">
                        New
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>Spring Boot assessment due tomorrow.</td>
                    <td>Assessment</td>
                    <td>
                      <span className="badge bg-warning">
                        Pending
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>AWS certification completed successfully.</td>
                    <td>Achievement</td>
                    <td>
                      <span className="badge bg-info">
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>4</td>
                    <td>Knowledge Gap identified in Docker.</td>
                    <td>Alert</td>
                    <td>
                      <span className="badge bg-danger">
                        High
                      </span>
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

export default Notifications;