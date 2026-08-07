import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const demo = [
  ["employee@okgip.com", "Aarav Sharma — Employee (Backend Developer)"],
  ["manager@okgip.com", "Vikram Rao — Engineering Manager"],
  ["hr@okgip.com", "Divya Menon — HR Specialist"],
  ["admin@okgip.com", "System Admin"],
];

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("employee@okgip.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">OKGIP</p>
        <h1 className="mt-1 text-2xl font-bold">Organizational Knowledge Gap Intelligence</h1>
        <p className="mt-1 text-sm text-slate-500">
          Sign in to assess skills, detect competency gaps and drive learning interventions.
        </p>

        <form onSubmit={submit} className="card mt-6 space-y-4">
          <div>
            <label className="label">Work email</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-center text-xs text-slate-500">
            No account? <a className="font-semibold text-brand" href="/register">Register</a>
          </p>
        </form>

        <div className="card mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Demo accounts · password123
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {demo.map(([mail, who]) => (
              <li key={mail}>
                <button
                  className="text-left text-brand hover:underline"
                  onClick={() => setEmail(mail)}
                >
                  {mail}
                </button>
                <span className="text-slate-500"> — {who}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
