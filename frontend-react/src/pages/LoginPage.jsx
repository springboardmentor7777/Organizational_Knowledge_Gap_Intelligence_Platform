import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "", remember: false });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="flex min-h-screen">
            {/* ── Left: Branding panel ── */}
            <div className="hidden lg:flex flex-col justify-between w-[480px] bg-gradient-to-br from-primary via-primary-700 to-secondary-900 text-white px-12 py-10">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-lg font-bold">
                            HR
                        </div>
                        <span className="text-xl font-bold tracking-tight">HR Dashboard</span>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold leading-tight">
                        Empower Your <br /> Workforce Management
                    </h2>
                    <p className="mt-4 text-sm text-primary-200 leading-relaxed max-w-xs">
                        Streamline hiring, mentorship, learning, and performance tracking — all from a single, intelligent platform.
                    </p>

                    {/* Decorative dots */}
                    <div className="flex gap-2 mt-8">
                        <span className="w-8 h-1.5 rounded-full bg-white/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                </div>

                <p className="text-xs text-primary-300">&copy; {new Date().getFullYear()} HR Dashboard. All rights reserved.</p>
            </div>

            {/* ── Right: Login form ── */}
            <div className="flex-1 flex items-center justify-center bg-surface px-6 py-12">
                <div className="w-full max-w-sm">
                    {/* Mobile brand (visible only on small screens) */}
                    <div className="lg:hidden flex items-center gap-2.5 mb-10">
                        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-bold">
                            HR
                        </div>
                        <span className="text-xl font-bold text-secondary tracking-tight">HR Dashboard</span>
                    </div>

                    <h1 className="text-2xl font-bold text-secondary">Welcome back</h1>
                    <p className="mt-1 text-sm text-secondary-400">Sign in to continue to your dashboard.</p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-secondary">
                                Email address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-400 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                                    </svg>
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@company.com"
                                    className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-secondary-200 bg-white text-secondary placeholder:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-secondary">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-medium text-primary hover:text-primary-700 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-400 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full h-10 pl-10 pr-10 text-sm rounded-lg border border-secondary-200 bg-white text-secondary placeholder:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-400 hover:text-secondary-500 transition-colors"
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.092 1.092a4 4 0 00-5.558-5.558z" clipRule="evenodd" />
                                            <path d="M10.748 13.93l2.523 2.523A9.987 9.987 0 0110 17c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 012.77-4.228L6.07 8.616A4 4 0 0010.748 13.93z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                checked={form.remember}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-secondary-300 text-primary focus:ring-primary/30 cursor-pointer accent-primary"
                            />
                            <label htmlFor="remember" className="text-sm text-secondary-500 cursor-pointer select-none">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full h-10 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-700 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs text-secondary-400">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="font-medium text-primary hover:text-primary-700 transition-colors">
                            Contact your administrator
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
