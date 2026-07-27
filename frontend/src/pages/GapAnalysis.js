import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function GapAnalysis() {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Knowledge Gap Analysis</h2>

          {/* Summary Cards */}

          <div className="row">

            <div className="col-md-3">
              <div className="card shadow border-primary">
                <div className="card-body text-center">
                  <h5>Total Skills</h5>
                  <h2>25</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-danger">
                <div className="card-body text-center">
                  <h5>Skill Gaps</h5>
                  <h2>8</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-warning">
                <div className="card-body text-center">
                  <h5>Critical Gaps</h5>
                  <h2>3</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-success">
                <div className="card-body text-center">
                  <h5>Completion</h5>
                  <h2>68%</h2>
                </div>
              </div>
            </div>

          </div>

          <br />

          {/* Progress Bars */}

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              Skill Gap Progress
            </div>

            <div className="card-body">

              <h6>Java</h6>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-success"
                  style={{ width: "90%" }}
                >
                  90%
                </div>
              </div>

              <h6>Spring Boot</h6>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "60%" }}
                >
                  60%
                </div>
              </div>

              <h6>React</h6>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "40%" }}
                >
                  40%
                </div>
              </div>

              <h6>Docker</h6>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-info"
                  style={{ width: "30%" }}
                >
                  30%
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default GapAnalysis;