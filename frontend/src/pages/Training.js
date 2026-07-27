import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Training() {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Training Recommendations</h2>

          <div className="row">

            <div className="col-md-4 mb-4">

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4>Docker Essentials</h4>

                  <p><b>Provider:</b> Infosys Springboard</p>

                  <p><b>Duration:</b> 10 Hours</p>

                  <p><b>Skill:</b> Docker</p>

                  <span className="badge bg-warning">
                    Recommended
                  </span>

                  <br /><br />

                  <button className="btn btn-primary w-100">
                    Enroll
                  </button>

                </div>

              </div>

            </div>

            <div className="col-md-4 mb-4">

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4>AWS Cloud Practitioner</h4>

                  <p><b>Provider:</b> Infosys Springboard</p>

                  <p><b>Duration:</b> 20 Hours</p>

                  <p><b>Skill:</b> AWS</p>

                  <span className="badge bg-success">
                    High Priority
                  </span>

                  <br /><br />

                  <button className="btn btn-success w-100">
                    Enroll
                  </button>

                </div>

              </div>

            </div>

            <div className="col-md-4 mb-4">

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4>Spring Boot Microservices</h4>

                  <p><b>Provider:</b> LinkedIn Learning</p>

                  <p><b>Duration:</b> 15 Hours</p>

                  <p><b>Skill:</b> Spring Boot</p>

                  <span className="badge bg-info">
                    Suggested
                  </span>

                  <br /><br />

                  <button className="btn btn-info w-100">
                    Enroll
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Training;