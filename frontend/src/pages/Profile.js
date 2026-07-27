import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container mt-4">

          <h2>Employee Profile</h2>

          <div className="card shadow p-4">

            <div className="row">

              <div className="col-md-6">

                <label>Name</label>

                <input
                  className="form-control"
                  value="Asad Pathan"
                  readOnly
                />

              </div>

              <div className="col-md-6">

                <label>Employee ID</label>

                <input
                  className="form-control"
                  value="EMP001"
                  readOnly
                />

              </div>

            </div>

            <br />

            <div className="row">

              <div className="col-md-6">

                <label>Email</label>

                <input
                  className="form-control"
                  value="Asad.pathan@gmail.com"
                  readOnly
                />

              </div>

              <div className="col-md-6">

                <label>Department</label>

                <input
                  className="form-control"
                  value="Software Development"
                  readOnly
                />

              </div>

            </div>

            <br />

            <div className="row">

              <div className="col-md-6">

                <label>Role</label>

                <input
                  className="form-control"
                  value="Java Developer"
                  readOnly
                />

              </div>

              <div className="col-md-6">

                <label>Experience</label>

                <input
                  className="form-control"
                  value="3 Years"
                  readOnly
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;