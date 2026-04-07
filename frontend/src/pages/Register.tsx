import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", formData);
      await login(data.token, data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#120701] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between border-r border-white/8 bg-gradient-to-br from-[#1d0902] via-[#180701] to-[#130601] p-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-lg font-bold text-black shadow-lg shadow-orange-900/30">
                V
              </div>
              <h1 className="bg-gradient-to-r from-pink-300 to-amber-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                Vi-Notes
              </h1>
            </div>

            <p className="mt-8 inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
              Create Account
            </p>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight">
              Start building trusted writing verification.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
              Join Vi-Notes and access a modern authenticity platform designed
              for behavioral writing analysis and clear report generation.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
              <p className="text-sm text-white/45">Behavior First</p>
              <p className="mt-2 text-white/85">
                Focus on how the content is written, not only what it says.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
              <p className="text-sm text-white/45">Premium Dashboard</p>
              <p className="mt-2 text-white/85">
                Review identity, sessions, reports, and authenticity indicators.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md rounded-[30px] border border-white/8 bg-gradient-to-br from-[#1b0c04] to-[#120701] p-8 shadow-[0_0_50px_rgba(255,166,0,0.08)]">
            <h1 className="text-4xl font-extrabold">Create account</h1>
            <p className="mt-2 text-white/60">Join Vi-Notes to verify authentic writing.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm text-white/80">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-[#09070d] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-500/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-[#09070d] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-500/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-white/10 bg-[#09070d] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-500/60"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-amber-500 py-3 font-semibold text-black transition hover:bg-amber-400 disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/55">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-amber-300 transition hover:text-amber-200">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
