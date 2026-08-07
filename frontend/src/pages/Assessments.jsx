import { useEffect, useState } from "react";
import api from "../api/client";
import { Loader, SectionTitle, Stat } from "../components/Ui";

export default function Assessments() {
  const [list, setList] = useState(null);
  const [history, setHistory] = useState([]);
  const [active, setActive] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () =>
    Promise.all([api.get("/api/assessments"), api.get("/api/assessments/attempts/me")]).then(
      ([a, b]) => {
        setList(a.data);
        setHistory(b.data);
      }
    );

  useEffect(() => {
    load();
  }, []);

  const start = async (id) => {
    setResult(null);
    setAnswers({});
    const { data } = await api.get(`/api/assessments/${id}`);
    setActive(data);
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([questionId, selectedOption]) => ({
          questionId: Number(questionId),
          selectedOption,
        })),
      };
      const { data } = await api.post(`/api/assessments/${active.assessment.id}/attempts`, payload);
      setResult(data);
      setActive(null);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  if (!list) return <Loader />;

  if (active) {
    const answered = Object.keys(answers).length;
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{active.assessment.title}</h1>
          <p className="text-sm text-slate-500">
            {active.assessment.skillName} · {active.questions.length} questions ·{" "}
            {active.assessment.timeLimitMinutes} min suggested
          </p>
          <p className="mt-1 text-sm text-slate-600">{active.assessment.description}</p>
        </div>

        <ol className="space-y-4">
          {active.questions.map((q, i) => (
            <li key={q.id} className="card">
              <p className="font-semibold">
                {i + 1}. {q.text}
              </p>
              <div className="mt-3 grid gap-2">
                {[
                  ["A", q.optionA],
                  ["B", q.optionB],
                  ["C", q.optionC],
                  ["D", q.optionD],
                ].map(([key, text]) => (
                  <label
                    key={key}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm ${
                      answers[q.id] === key ? "border-brand bg-brand-light" : "border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      className="mt-1"
                      checked={answers[q.id] === key}
                      onChange={() => setAnswers({ ...answers, [q.id]: key })}
                    />
                    <span>
                      <b className="mr-1">{key}.</b>
                      {text}
                    </span>
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="sticky bottom-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow">
          <span className="text-sm text-slate-600">
            {answered} of {active.questions.length} answered
          </span>
          <div className="flex gap-2">
            <button className="btn-ghost" onClick={() => setActive(null)}>
              Cancel
            </button>
            <button className="btn-primary" disabled={submitting} onClick={submit}>
              {submitting ? "Scoring…" : "Submit assessment"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Assessments & quizzes</h1>
        <p className="text-sm text-slate-500">
          Quiz results derive your proficiency automatically and trigger gap recalculation.
        </p>
      </div>

      {result && (
        <section className="card border-brand">
          <SectionTitle
            title={`Result: ${result.percent}% — ${result.derivedLevel}`}
            subtitle={`${result.assessmentTitle} · ${result.skillName} · ${result.score}/${result.total} correct`}
          />
          <p className="text-sm text-slate-600">{result.message}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {result.answers.map((a, i) => (
              <li
                key={a.questionId}
                className={`rounded-lg border p-3 ${
                  a.correct ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
                }`}
              >
                <p className="font-semibold">
                  Q{i + 1}: {a.correct ? "Correct" : `Incorrect (answer: ${a.correctOption})`}
                </p>
                <p className="text-slate-600">{a.explanation}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Available quizzes" value={list.length} />
        <Stat label="Attempts" value={history.length} tone="slate" />
        <Stat
          label="Average score"
          value={history.length ? Math.round(history.reduce((s, h) => s + h.percent, 0) / history.length) : 0}
          suffix="%"
          tone="warn"
        />
      </div>

      <section className="card">
        <SectionTitle title="Quiz catalog" subtitle="Skill-tagged multiple-choice assessments" />
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((a) => (
            <article key={a.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold">{a.title}</p>
              <p className="text-xs text-slate-500">
                {a.skillName} · {a.questionCount} questions · {a.timeLimitMinutes} min
              </p>
              <p className="mt-2 text-sm text-slate-600">{a.description}</p>
              <button className="btn-primary mt-3" onClick={() => start(a.id)}>
                Start quiz
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <SectionTitle title="Assessment history" subtitle="Historical comparison across cycles" />
        {history.length === 0 ? (
          <p className="py-6 text-sm text-slate-500">No attempts yet.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-2">Assessment</th>
                <th className="py-2">Skill</th>
                <th className="py-2">Score</th>
                <th className="py-2">Derived level</th>
                <th className="py-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-t border-slate-100">
                  <td className="py-2 font-medium">{h.assessmentTitle}</td>
                  <td className="py-2">{h.skillName}</td>
                  <td className="py-2 font-semibold">{h.percent}%</td>
                  <td className="py-2">{h.derivedLevel}</td>
                  <td className="py-2 text-slate-500">
                    {h.submittedAt ? new Date(h.submittedAt).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
