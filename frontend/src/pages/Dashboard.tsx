import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, login, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      login(tokenFromUrl).then(() => {
        navigate("/dashboard", { replace: true });
      });
    }
  }, [searchParams, login, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#120701] text-white">
      <header className="border-b border-white/10 bg-[#120701]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-lg font-bold text-black shadow-lg shadow-orange-900/30">
              V
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-pink-300 to-amber-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                Vi-Notes
              </h1>
              <p className="text-sm text-white/45">Authenticated Workspace</p>
            </div>
            <Link
              to="/editor"
              className="ml-4 rounded-xl bg-amber-500/15 px-4 py-2 font-medium text-amber-300 transition hover:bg-amber-500/25"
            >
              Editor
            </Link>
            <Link
              to="/report"
              className="rounded-xl bg-amber-500/15 px-4 py-2 font-medium text-amber-300 transition hover:bg-amber-500/25"
            >
              Report
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 font-semibold text-red-300 transition hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-8">
        <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="rounded-[30px] border border-white/8 bg-gradient-to-br from-[#1d0902] via-[#180701] to-[#130601] p-8 shadow-[0_0_60px_rgba(255,140,0,0.08)]">
            <p className="mb-4 inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
              Dashboard Overview
            </p>

            <h2 className="text-5xl font-extrabold leading-tight md:text-6xl">
              Welcome, {user?.name || "User"}.
            </h2>

            <p className="mt-5 max-w-3xl text-xl leading-8 text-white/65">
              This is your Vi-Notes base dashboard. From here, verified writing
              sessions, behavior timelines, risk indicators, and authenticity
              reports can connect into one streamlined workspace.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-[24px] border border-amber-500/20 bg-gradient-to-br from-[#2b1905] to-[#171008] p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-amber-500 shadow">
                  👤
                </div>
                <p className="text-3xl font-extrabold">{user?.name || "N/A"}</p>
                <p className="mt-2 text-lg text-white/70">Account holder</p>
              </div>

              <div className="rounded-[24px] border border-indigo-500/20 bg-gradient-to-br from-[#120c22] to-[#0d0b18] p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-emerald-500 shadow">
                  ✉
                </div>
                <p className="break-all text-2xl font-extrabold">
                  {user?.email || "N/A"}
                </p>
                <p className="mt-2 text-lg text-white/70">Registered email</p>
              </div>

              <div className="rounded-[24px] border border-red-500/20 bg-gradient-to-br from-[#3a0606] to-[#1a0a0a] p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-red-500 shadow">
                  ⚡
                </div>
                <p className="text-3xl font-extrabold">
                  {user?.authProvider || "N/A"}
                </p>
                <p className="mt-2 text-lg text-white/70">Auth provider</p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/editor"
                className="rounded-2xl bg-amber-500 px-6 py-4 font-semibold text-black transition hover:bg-amber-400"
              >
                Open Editor
              </Link>
              <Link
                to="/report"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                View Report
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/8 bg-gradient-to-br from-[#1b0c04] to-[#120701] p-6 shadow-[0_0_50px_rgba(255,166,0,0.08)]">
              <h3 className="text-2xl font-bold">User Details</h3>
              <div className="mt-5 space-y-4 text-white/80">
                <div className="rounded-2xl bg-[#09070d] p-4">
                  <p className="text-sm text-white/45">Name</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {user?.name || "N/A"}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#09070d] p-4">
                  <p className="text-sm text-white/45">Email</p>
                  <p className="mt-1 break-all text-lg font-semibold text-white">
                    {user?.email || "N/A"}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#09070d] p-4">
                  <p className="text-sm text-white/45">Provider</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {user?.authProvider || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-[#100d15] p-6">
              <h3 className="text-2xl font-bold">About Vi-Notes</h3>
              <p className="mt-4 leading-7 text-white/65">
                Vi-Notes is an authenticity verification platform focused on
                genuine human writing. It connects writing-session behavior with
                interpretable analysis so suspicious inserted content can be
                identified more reliably than text-only checking.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white/5 p-4 text-white/85">
                  Session tracking
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-white/85">
                  Behavioral pattern analysis
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-white/85">
                  Explainable authenticity reports
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
