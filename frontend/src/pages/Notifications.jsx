import { useEffect, useState } from "react";
import api from "../api/client";
import { Loader, SectionTitle } from "../components/Ui";

const tone = {
  GAP_ALERT: "bg-red-50 text-danger",
  DEADLINE: "bg-amber-50 text-warn",
  RECOMMENDATION: "bg-brand-light text-brand-dark",
  MILESTONE: "bg-emerald-50 text-emerald-700",
  MENTORSHIP: "bg-sky-50 text-sky-700",
};

export default function Notifications() {
  const [items, setItems] = useState(null);

  const load = () => api.get("/api/notifications").then(({ data }) => setItems(data));

  useEffect(() => {
    load();
  }, []);

  const readAll = async () => {
    await api.patch("/api/notifications/read-all");
    load();
  };

  if (!items) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-sm text-slate-500">
          Gap alerts, training deadlines, new recommendations, mentorship and milestone events.
        </p>
      </div>

      <section className="card">
        <SectionTitle
          title="Inbox"
          action={
            <button className="btn-ghost" onClick={readAll}>
              Mark all read
            </button>
          }
        />
        {items.length === 0 ? (
          <p className="py-6 text-sm text-slate-500">Nothing here yet.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((n) => (
              <li
                key={n.id}
                className={`rounded-lg border p-4 ${n.read ? "border-slate-200" : "border-brand"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{n.title}</p>
                  <span className={`badge ${tone[n.type] || "bg-slate-100 text-slate-700"}`}>{n.type}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{n.message}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
