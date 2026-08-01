import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ArrowLeft, CheckCircle2,
  XCircle, Loader2, ShieldCheck, Sparkles, Moon, Sun, MailCheck, } from "lucide-react";
import { useApp, TOKENS, FONT_STACK } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
/* ============================================================
   SIGNATURE ELEMENT
   The auth brand panel is a slowly-pulsing "competency graph" —
   nodes and edges that echo the product's actual subject matter
   (skills connecting into a map) rather than a generic blob/mesh
   gradient. This is the one bold visual; the form side stays
   quiet and functional.
   ============================================================ */
const GRAPH_NODES = [
  { x: 60, y: 90, r: 7 }, { x: 150, y: 50, r: 5 }, { x: 230, y: 120, r: 8 },
  { x: 120, y: 180, r: 5 }, { x: 260, y: 210, r: 6 }, { x: 40, y: 230, r: 5 },
  { x: 320, y: 90, r: 5 }, { x: 190, y: 260, r: 7 }, { x: 300, y: 300, r: 5 },
  { x: 90, y: 320, r: 6 },
];
const GRAPH_EDGES = [
  [0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [2, 6], [3, 7], [4, 8], [7, 9], [5, 9], [0, 3],
];

function CompetencyGraph({ dark }) {
  return (
    <svg viewBox="0 0 360 360" width="100%" height="100%" style={{ maxWidth: 420 }}>
      {GRAPH_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={GRAPH_NODES[a].x} y1={GRAPH_NODES[a].y}
          x2={GRAPH_NODES[b].x} y2={GRAPH_NODES[b].y}
          stroke={dark ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.35)"}
          strokeWidth="1.2"
          className="kgi-edge"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      {GRAPH_NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y} r={n.r}
          fill={i % 3 === 0 ? "#fff" : "rgba(255,255,255,0.6)"}
          className="kgi-node"
          style={{ animationDelay: `${i * 0.22}s` }}
        />
      ))}
    </svg>
  );
}

/* ============================================================
   SHARED PRIMITIVES
   ============================================================ */
function Field({ label, error, children }) {
  const { c } = useApp();
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: c.text, marginBottom: 6 }}>
        {label}
      </label>
      {children}
      {error && (
        <div className="kgi-shake" style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, color: TOKENS.danger, fontSize: 11.5 }}>
          <XCircle size={13} /> {error}
        </div>
      )}
    </div>
  );
}

function TextInput({ icon: Icon, error, ...props }) {
  const { c } = useApp();
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 9,
      background: c.inputBg, border: `1.5px solid ${error ? TOKENS.danger : c.border}`,
      borderRadius: 12, padding: "11px 13px", transition: "border-color 0.15s ease",
    }}
    className="kgi-input-wrap"
    >
      <Icon size={16} color={error ? TOKENS.danger : c.textMuted} style={{ flexShrink: 0 }} />
      <input
        {...props}
        style={{
          flex: 1, border: "none", outline: "none", background: "transparent",
          color: c.text, fontSize: 13.5, fontFamily: FONT_STACK, minWidth: 0,
        }}
      />
    </div>
  );
}

function scorePassword(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}
const STRENGTH_META = [
  { label: "Very weak", color: TOKENS.danger },
  { label: "Weak", color: TOKENS.danger },
  { label: "Fair", color: TOKENS.warning },
  { label: "Good", color: "#22C55E" },
  { label: "Strong", color: TOKENS.success },
];

function PasswordField({ label, value, onChange, error, showStrength }) {
  const { c } = useApp();
  const [visible, setVisible] = useState(false);
  const score = showStrength ? scorePassword(value) : 0;
  const meta = STRENGTH_META[score];

  return (
    <Field label={label} error={error}>
      <div style={{
        display: "flex", alignItems: "center", gap: 9,
        background: c.inputBg, border: `1.5px solid ${error ? TOKENS.danger : c.border}`,
        borderRadius: 12, padding: "11px 13px",
      }}>
        <Lock size={16} color={error ? TOKENS.danger : c.textMuted} style={{ flexShrink: 0 }} />
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: c.text, fontSize: 13.5, fontFamily: FONT_STACK, minWidth: 0 }}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted, display: "flex" }}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {showStrength && value.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{
                height: 4, flex: 1, borderRadius: 3,
                background: i <= score - 1 ? meta.color : (c.border),
                transition: "background 0.25s ease",
              }} />
            ))}
          </div>
          <div style={{ fontSize: 11, color: meta.color, fontWeight: 600, marginTop: 4 }}>{meta.label}</div>
        </div>
      )}
    </Field>
  );
}

function PrimaryButton({ children, loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
        color: "#fff", border: "none", borderRadius: 12, padding: "12px 16px",
        fontSize: 14, fontWeight: 600, cursor: loading ? "default" : "pointer",
        opacity: props.disabled && !loading ? 0.6 : 1,
        boxShadow: "0 10px 24px -10px rgba(37,99,235,0.55)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      className="kgi-btn-primary"
    >
      {loading ? <Loader2 size={16} className="kgi-spin" /> : null}
      {loading ? "Please wait..." : children}
      {!loading && <ArrowRight size={15} />}
    </button>
  );
}

function SocialButton({ label, children }) {
  const { c } = useApp();
  return (
    <button
      type="button"
      style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: "transparent", border: `1.5px solid ${c.border}`, borderRadius: 12,
        padding: "10px 12px", color: c.text, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
      }}
      className="kgi-social-btn"
    >
      {children} {label}
    </button>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.1 8.1 3l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.4C29.6 35.4 26.9 36 24 36c-5.3 0-9.6-3-11.4-7.4l-6.6 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-0.8 2.3-2.2 4.2-4.1 5.5l6.6 5.4C41.5 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"/>
    </svg>
  );
}
function MicrosoftMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 23 23">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function Divider({ text }) {
  const { c } = useApp();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
      <div style={{ flex: 1, height: 1, background: c.border }} />
      <span style={{ fontSize: 11, color: c.textMuted, fontWeight: 600 }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: c.border }} />
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  const { c } = useApp();
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 12.5, color: c.textMuted }}>
      <span
        onClick={onChange}
        style={{
          width: 17, height: 17, borderRadius: 5, flexShrink: 0,
          border: `1.5px solid ${checked ? TOKENS.primary : c.border}`,
          background: checked ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})` : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease",
        }}
      >
        {checked && <CheckCircle2 size={12} color="#fff" />}
      </span>
      {label}
    </label>
  );
}

/* ============================================================
   OTP INPUT
   ============================================================ */
function OtpInput({ length = 6, onComplete }) {
  const { c } = useApp();
  const [values, setValues] = useState(Array(length).fill(""));
  const refs = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...values];
    next[i] = val.slice(-1);
    setValues(next);
    if (val && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every((v) => v !== "")) onComplete(next.join(""));
  };
  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !values[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          inputMode="numeric"
          maxLength={1}
          style={{
            width: 42, height: 50, textAlign: "center", fontSize: 20, fontWeight: 700,
            borderRadius: 12, border: `1.5px solid ${v ? TOKENS.primary : c.border}`,
            background: c.inputBg, color: c.text, outline: "none", fontFamily: FONT_STACK,
            transition: "border-color 0.15s ease",
          }}
        />
      ))}
    </div>
  );
}

function useCountdown(seconds) {
  const [t, setT] = useState(seconds);
  useEffect(() => {
    if (t <= 0) return;
    const id = setInterval(() => setT((v) => v - 1), 1000);
    return () => clearInterval(id);
  }, [t]);
  return [t, () => setT(seconds)];
}

/* ============================================================
   AUTH SHELL — split brand panel + form panel
   ============================================================ */
function AuthShell({ children, step, totalSteps, onBack }) {
  const { c, dark, setDark } = useApp();
  return (
    <div style={{
      minHeight: "100vh", display: "flex", background: c.bg, color: c.text,
      fontFamily: FONT_STACK, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      {/* Brand / graph panel */}
      <div
        className="kgi-brand-panel"
        style={{
          flex: "0 0 42%", position: "relative", overflow: "hidden",
          background: `linear-gradient(155deg, ${TOKENS.primary} 0%, ${TOKENS.secondary} 100%)`,
          display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 40,
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CompetencyGraph dark={dark} />
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={17} color="#fff" />
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 14.5, lineHeight: 1.15 }}>
            Knowledge Gap<br />Intelligence
          </span>
        </div>
        <div style={{ position: "relative", color: "#fff" }}>
          <div style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.35, maxWidth: 340 }}>
            See every skill gap before it becomes a business risk.
          </div>
          <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 10, maxWidth: 320 }}>
            AI-mapped competencies, live across every team and department.
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {onBack ? (
            <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              <ArrowLeft size={15} /> Back
            </button>
          ) : <span />}
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            style={{
              width: 36, height: 36, borderRadius: 10, border: `1px solid ${c.border}`,
              background: "transparent", color: c.text, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="kgi-fade-in" style={{ width: "100%", maxWidth: 380 }}>
            {step && (
              <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} style={{
                    height: 4, flex: 1, borderRadius: 3,
                    background: i < step ? `linear-gradient(90deg, ${TOKENS.primary}, ${TOKENS.secondary})` : c.border,
                    transition: "background 0.3s ease",
                  }} />
                ))}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SCREENS
   ============================================================ */
function LoginScreen({ goTo, navigate }) {
  const { c } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid work email address.";
    if (password.length < 1) e.password = "Enter your password.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
  setLoading(false);
  setDone(true);

  setTimeout(() => {
    navigate("/dashboard");
  }, 900);

}, 1400);
  };

  if (done) return <SuccessPanel title="Welcome back!" subtitle="Redirecting you to your dashboard..." />;

  return (
    <form onSubmit={submit}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: "0 0 4px" }}>Sign in</h1>
      <p style={{ fontSize: 13, color: c.textMuted, margin: "0 0 22px" }}>
        Enter your workspace credentials to continue.
      </p>

      <Field label="Work email" error={errors.email}>
        <TextInput icon={Mail} type="email" placeholder="you@company.com" value={email}
          onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      </Field>

      <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Checkbox checked={remember} onChange={() => setRemember(!remember)} label="Remember me" />
        <button type="button" onClick={() => goTo("forgot")} style={{ background: "none", border: "none", color: TOKENS.primary, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
          Forgot password?
        </button>
      </div>

      <PrimaryButton type="submit" loading={loading}>Sign in</PrimaryButton>

      <Divider text="OR CONTINUE WITH" />
      <div style={{ display: "flex", gap: 10 }}>
        <SocialButton label="Google"><GoogleMark /></SocialButton>
        <SocialButton label="Microsoft"><MicrosoftMark /></SocialButton>
      </div>

      <p style={{ textAlign: "center", fontSize: 12.5, color: c.textMuted, marginTop: 24 }}>
        Don't have an account?{" "}
        <button type="button" onClick={() => goTo("signup")} style={{ background: "none", border: "none", color: TOKENS.primary, fontWeight: 600, cursor: "pointer", fontSize: 12.5 }}>
          Create one
        </button>
      </p>
    </form>
  );
}

function SignupScreen({ goTo }) {
  const { c } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid work email address.";
    if (scorePassword(form.password) < 2) e.password = "Choose a stronger password.";
    if (form.confirm !== form.password) e.confirm = "Passwords don't match.";
    if (!agree) e.agree = "You must accept the terms to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      goTo("signup-otp");
    }, 1300);
  };

  return (
    <form onSubmit={submit}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: "0 0 4px" }}>Create your account</h1>
      <p style={{ fontSize: 13, color: c.textMuted, margin: "0 0 22px" }}>
        Set up access to your organization's workspace.
      </p>

      <Field label="Full name" error={errors.name}>
        <TextInput icon={User} placeholder="Asad Pathan" value={form.name} onChange={set("name")} error={errors.name} />
      </Field>
      <Field label="Work email" error={errors.email}>
        <TextInput icon={Mail} type="email" placeholder="you@company.com" value={form.email} onChange={set("email")} error={errors.email} />
      </Field>
      <PasswordField label="Password" value={form.password} onChange={set("password")} error={errors.password} showStrength />
      <PasswordField label="Confirm password" value={form.confirm} onChange={set("confirm")} error={errors.confirm} />

      <div style={{ marginBottom: 20 }}>
        <Checkbox checked={agree} onChange={() => setAgree(!agree)} label="I agree to the Terms of Service and Privacy Policy" />
        {errors.agree && (
          <div className="kgi-shake" style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, color: TOKENS.danger, fontSize: 11.5 }}>
            <XCircle size={13} /> {errors.agree}
          </div>
        )}
      </div>

      <PrimaryButton type="submit" loading={loading}>Create account</PrimaryButton>

      <p style={{ textAlign: "center", fontSize: 12.5, color: c.textMuted, marginTop: 24 }}>
        Already have an account?{" "}
        <button type="button" onClick={() => goTo("login")} style={{ background: "none", border: "none", color: TOKENS.primary, fontWeight: 600, cursor: "pointer", fontSize: 12.5 }}>
          Sign in
        </button>
      </p>
    </form>
  );
}

function ForgotPasswordScreen({ goTo }) {
  const { c } = useApp();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (ev) => {
    ev.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid work email address.");
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center" }}>
        <div className="kgi-pop-in" style={{
          width: 64, height: 64, borderRadius: "50%", margin: "0 auto 18px",
          background: `${TOKENS.primary}1A`, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <MailCheck size={28} color={TOKENS.primary} />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: c.text, margin: "0 0 6px" }}>Check your email</h1>
        <p style={{ fontSize: 13, color: c.textMuted, margin: "0 0 24px" }}>
          We sent a password reset code to <strong style={{ color: c.text }}>{email}</strong>.
        </p>
        <PrimaryButton onClick={() => goTo("otp")}>Enter reset code</PrimaryButton>
        <p style={{ textAlign: "center", fontSize: 12.5, color: c.textMuted, marginTop: 20 }}>
          Wrong email?{" "}
          <button type="button" onClick={() => setSent(false)} style={{ background: "none", border: "none", color: TOKENS.primary, fontWeight: 600, cursor: "pointer", fontSize: 12.5 }}>
            Try again
          </button>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: "0 0 4px" }}>Forgot password?</h1>
      <p style={{ fontSize: 13, color: c.textMuted, margin: "0 0 22px" }}>
        Enter your work email and we'll send you a reset code.
      </p>
      <Field label="Work email" error={error}>
        <TextInput icon={Mail} type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
      </Field>
      <PrimaryButton type="submit" loading={loading}>Send reset code</PrimaryButton>
      <p style={{ textAlign: "center", fontSize: 12.5, color: c.textMuted, marginTop: 24 }}>
        Remembered it?{" "}
        <button type="button" onClick={() => goTo("login")} style={{ background: "none", border: "none", color: TOKENS.primary, fontWeight: 600, cursor: "pointer", fontSize: 12.5 }}>
          Back to sign in
        </button>
      </p>
    </form>
  );
}

function OtpScreen({ goTo, nextStep = "reset", purpose = "reset your password" }) {
  const { c } = useApp();
  const [status, setStatus] = useState("idle"); // idle | checking | success | error
  const [countdown, resetCountdown] = useCountdown(30);

  const handleComplete = (code) => {
    setStatus("checking");
    setTimeout(() => {
      if (code === "000000") {
        setStatus("error");
      } else {
        setStatus("success");
        setTimeout(() => goTo(nextStep), 700);
      }
    }, 1100);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: 60, height: 60, borderRadius: "50%", margin: "0 auto 18px",
        background: `${TOKENS.secondary}1A`, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <ShieldCheck size={26} color={TOKENS.secondary} />
      </div>
      <h1 style={{ fontSize: 21, fontWeight: 700, color: c.text, margin: "0 0 6px" }}>Verify your identity</h1>
      <p style={{ fontSize: 13, color: c.textMuted, margin: "0 0 26px" }}>
        Enter the 6-digit code we sent to confirm you {purpose}.
      </p>

      <div className={status === "error" ? "kgi-shake" : ""}>
        <OtpInput onComplete={handleComplete} />
      </div>

      <div style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16 }}>
        {status === "checking" && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: c.textMuted }}>
            <Loader2 size={14} className="kgi-spin" /> Verifying code...
          </span>
        )}
        {status === "success" && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: TOKENS.success, fontWeight: 600 }}>
            <CheckCircle2 size={15} /> Verified — continuing...
          </span>
        )}
        {status === "error" && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: TOKENS.danger, fontWeight: 600 }}>
            <XCircle size={15} /> Incorrect code. Try again.
          </span>
        )}
      </div>

      <p style={{ fontSize: 12.5, color: c.textMuted, marginTop: 10 }}>
        {countdown > 0 ? (
          <>Resend code in {countdown}s</>
        ) : (
          <button type="button" onClick={resetCountdown} style={{ background: "none", border: "none", color: TOKENS.primary, fontWeight: 600, cursor: "pointer", fontSize: 12.5 }}>
            Resend code
          </button>
        )}
      </p>
      <p style={{ fontSize: 11, color: c.textMuted, marginTop: 4, opacity: 0.7 }}>Demo tip: any code works except 000000</p>
    </div>
  );
}

function ResetPasswordScreen({ goTo }) {
  const { c } = useApp();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (scorePassword(pw) < 2) e.pw = "Choose a stronger password.";
    if (confirm !== pw) e.confirm = "Passwords don't match.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  if (done) {
    return <SuccessPanel title="Password updated" subtitle="You can now sign in with your new password." actionLabel="Back to sign in" onAction={() => goTo("login")} />;
  }

  return (
    <form onSubmit={submit}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: "0 0 4px" }}>Set a new password</h1>
      <p style={{ fontSize: 13, color: c.textMuted, margin: "0 0 22px" }}>
        Choose something you haven't used before.
      </p>
      <PasswordField label="New password" value={pw} onChange={(e) => setPw(e.target.value)} error={errors.pw} showStrength />
      <PasswordField label="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
      <PrimaryButton type="submit" loading={loading}>Update password</PrimaryButton>
    </form>
  );
}

function SuccessPanel({ title, subtitle, actionLabel, onAction }) {
  const { c } = useApp();
  return (
    <div style={{ textAlign: "center" }}>
      <div className="kgi-pop-in" style={{
        width: 68, height: 68, borderRadius: "50%", margin: "0 auto 18px",
        background: `${TOKENS.success}1A`, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <CheckCircle2 size={30} color={TOKENS.success} />
      </div>
      <h1 style={{ fontSize: 21, fontWeight: 700, color: c.text, margin: "0 0 6px" }}>{title}</h1>
      <p style={{ fontSize: 13, color: c.textMuted, margin: "0 0 20px" }}>{subtitle}</p>
      {actionLabel && <PrimaryButton onClick={onAction}>{actionLabel}</PrimaryButton>}
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function AuthFlow() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("login");

  const goTo = (s) => setScreen(s);

  const stepMap = {
  signup: 1,
  "signup-otp": 2,
  welcome: 3,
};

const step = stepMap[screen];

let content, backTo = null;
  switch (screen) {
    case "login":
      content = <LoginScreen goTo={goTo} navigate={navigate} />; break;
    case "signup":
      content = <SignupScreen goTo={goTo} />; backTo = "login"; break;
    case "signup-otp":
      content = <OtpScreen goTo={(s) => goTo(s === "reset" ? "welcome" : s)} nextStep="welcome" purpose="verify your new account" />; backTo = "signup"; break;
    case "forgot":
      content = <ForgotPasswordScreen goTo={goTo} />; backTo = "login"; break;
    case "otp":
      content = <OtpScreen goTo={goTo} nextStep="reset" purpose="reset your password" />; backTo = "forgot"; break;
    case "reset":
      content = <ResetPasswordScreen goTo={goTo} />; backTo = "otp"; break;
    case "welcome":
      content = <SuccessPanel title="Welcome back!" subtitle="You're signed in to Knowledge Gap Intelligence." actionLabel="Sign out & try another flow" onAction={() => goTo("login")} />;
      break;
    default:
  content = <LoginScreen goTo={goTo} navigate={navigate} />;
  }

  return (
   <>
  <AuthShell
    step={step}
    totalSteps={3}
    onBack={backTo ? () => goTo(backTo) : null}
>
    {content}
</AuthShell>
</>
  );
}
