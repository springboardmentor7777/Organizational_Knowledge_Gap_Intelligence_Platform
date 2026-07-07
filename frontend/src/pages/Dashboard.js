import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="d-flex flex-column flex-md-row">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2>Dashboard</h2>

          <div className="row">

            <DashboardCard
              title="Employees"
              value="250"
              icon="bi-people-fill"
              color="primary"
            />

            <DashboardCard
              title="Skill Gaps"
              value="47"
              icon="bi-exclamation-circle-fill"
              color="danger"
            />

            <DashboardCard
              title="Training"
              value="82"
              icon="bi-book-fill"
              color="success"
            />

            <DashboardCard
              title="Completed"
              value="63"
              icon="bi-check-circle-fill"
              color="warning"
            />

          </div>

          <div className="card shadow mt-4">
            <div className="card-header bg-primary text-white">
              Recent Activities
            </div>

            <div className="card-body">

              <ul>

                <li>Java Training Completed</li>

                <li>AWS Course Assigned</li>

                <li>Docker Skill Gap Identified</li>

                <li>React Assessment Submitted</li>

              </ul>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;