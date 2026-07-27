import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function SkillInventory() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Skill Inventory</h2>

          <div className="card shadow">

            <div className="card-body">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>Skill</th>

                    <th>Current Level</th>

                    <th>Required Level</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>Java</td>
                    <td>Advanced</td>
                    <td>Expert</td>
                    <td><span className="badge bg-warning">Gap</span></td>
                  </tr>

                  <tr>
                    <td>Spring Boot</td>
                    <td>Intermediate</td>
                    <td>Advanced</td>
                    <td><span className="badge bg-warning">Gap</span></td>
                  </tr>

                  <tr>
                    <td>React</td>
                    <td>Beginner</td>
                    <td>Intermediate</td>
                    <td><span className="badge bg-warning">Gap</span></td>
                  </tr>

                  <tr>
                    <td>SQL</td>
                    <td>Advanced</td>
                    <td>Advanced</td>
                    <td><span className="badge bg-success">Completed</span></td>
                  </tr>

                  <tr>
                    <td>Docker</td>
                    <td>Beginner</td>
                    <td>Intermediate</td>
                    <td><span className="badge bg-warning">Gap</span></td>
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

export default SkillInventory;