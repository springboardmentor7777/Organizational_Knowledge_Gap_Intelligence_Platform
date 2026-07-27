import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Assessment() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Skill Assessment</h2>

          <div className="card shadow">

            <div className="card-body">

              <form>

                <div className="mb-3">

                  <label className="form-label">
                    1. Rate your Java Skill
                  </label>

                  <select className="form-select">

                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>

                  </select>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    2. Rate your React Skill
                  </label>

                  <select className="form-select">

                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>

                  </select>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    3. Rate your Spring Boot Skill
                  </label>

                  <select className="form-select">

                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>

                  </select>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    4. Comments
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your comments..."
                  ></textarea>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit Assessment
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Assessment;