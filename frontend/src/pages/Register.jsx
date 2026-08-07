import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "Engineering",
    jobRole: "Backend Developer",
    role: "EMPLOYEE",
  });
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/skills");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <form onSubmit={submit} className="card w-full max-w-lg space-y-4">
        <h1 className="text-xl font-bold">Create your employee profile</h1>
        <div>
          <label className="label">Full name</label>
          <input className="input" required value={form.fullName} onChange={set("fullName")} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Work email</label>
            <input className="input" type="email" required value={form.email} onChange={set("email")} />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" required minLength={6} value={form.password} onChange={set("password")} />
          </div>
          <div>
            <label className="label">Department</label>
            <select className="input" value={form.department} onChange={set("department")}>
              {["Engineering", "Analytics", "Human Resources", "IT"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Job role</label>
            <select className="input" value={form.jobRole} onChange={set("jobRole")}>
              {[
                "Backend Developer",
                "Senior Backend Developer",
                "Frontend Developer",
                "Engineering Manager",
                "Data Analyst",
                "HR Specialist",
                "System Administrator",
              ].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Platform role</label>
            <select className="input" value={form.role} onChange={set("role")}>
              {["EMPLOYEE", "MANAGER", "HR", "DEPARTMENT_HEAD", "LD_ADMIN", "ADMIN"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button className="btn-primary w-full">Create account</button>
        <p className="text-center text-xs text-slate-500">
          Already registered? <a className="font-semibold text-brand" href="/login">Sign in</a>
        </p>
      </form>
    </div>
  );
}
