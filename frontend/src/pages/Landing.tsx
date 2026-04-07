import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#120701] text-white">
      <header className="border-b border-white/10 bg-[#120701]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-lg font-bold text-black shadow-lg shadow-orange-900/30">
              V
            </div>
            <h1 className="bg-gradient-to-r from-pink-300 to-amber-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
              Vi-Notes
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Dashboard
                </Link>
                <Link
                  to="/editor"
                  className="rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400"
                >
                  Open Editor
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-8">
        <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-[30px] border border-white/8 bg-gradient-to-br from-[#1d0902] via-[#180701] to-[#130601] p-8 shadow-[0_0_60px_rgba(255,140,0,0.08)]">
            <div className="max-w-4xl">
              <p className="mb-4 inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
                Behavioral Authenticity Verification
              </p>

              <h2 className="text-5xl font-extrabold leading-tight md:text-6xl">
                Trust the writing process, not only the final text.
              </h2>

              <p className="mt-5 max-w-3xl text-xl leading-8 text-white/65">
                Vi-Notes helps verify genuine human writing by combining typing
                behavior, pause patterns, corrections, and structural writing
                signals into one explainable authenticity system.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {user ? (
                  <>
                    <Link
                      to="/editor"
                      className="rounded-2xl bg-amber-500 px-6 py-4 font-semibold text-black transition hover:bg-amber-400"
                    >
                      Open Editor
                    </Link>
                    <Link
                      to="/dashboard"
                      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
                    >
                      Go to Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="rounded-2xl bg-amber-500 px-6 py-4 font-semibold text-black transition hover:bg-amber-400"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
                    >
                      Login to Continue
                    </Link>
                  </>
                )}
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <div className="rounded-[24px] border border-red-500/20 bg-gradient-to-br from-[#3a0606] to-[#1a0a0a] p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-red-500 shadow">
                    ✦
                  </div>
                  <p className="text-3xl font-extrabold">Monitor</p>
                  <p className="mt-2 text-lg text-white/70">
                    Observe edits, pauses, and sudden inserted blocks.
                  </p>
                </div>

                <div className="rounded-[24px] border border-indigo-500/20 bg-gradient-to-br from-[#120c22] to-[#0d0b18] p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-emerald-500 shadow">
                    ↗
                  </div>
                  <p className="text-3xl font-extrabold">Analyze</p>
                  <p className="mt-2 text-lg text-white/70">
                    Measure behavioral consistency and writing rhythm.
                  </p>
                </div>

                <div className="rounded-[24px] border border-amber-500/20 bg-gradient-to-br from-[#2b1905] to-[#171008] p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-amber-500 shadow">
                    ⚑
                  </div>
                  <p className="text-3xl font-extrabold">Explain</p>
                  <p className="mt-2 text-lg text-white/70">
                    Generate clear authenticity reports with risk insight.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/8 bg-gradient-to-br from-[#1b0c04] to-[#120701] p-6 shadow-[0_0_50px_rgba(255,166,0,0.08)]">
              <h3 className="text-2xl font-bold">Why Vi-Notes?</h3>
              <p className="mt-3 text-white/65">
                Text alone can be misleading. Vi-Notes focuses on how the
                content was produced, giving stronger evidence of genuine
                authorship.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-[#09070d] p-4 text-white/85">
                  1. Detects suspicious insertions during the writing session
                </div>
                <div className="rounded-2xl bg-[#09070d] p-4 text-white/85">
                  2. Preserves behavioral metadata instead of storing private
                  keystrokes
                </div>
                <div className="rounded-2xl bg-[#09070d] p-4 text-white/85">
                  3. Produces interpretable authenticity evidence
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-[#100d15] p-6">
              <h3 className="text-2xl font-bold">Core Capabilities</h3>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-white/45">Behavior Tracking</p>
                  <p className="mt-1 text-white/85">
                    Capture pauses, deletions, corrections, and typing flow.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-white/45">Pattern Detection</p>
                  <p className="mt-1 text-white/85">
                    Spot unnatural jumps and inconsistent writing transitions.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-white/45">Report Generation</p>
                  <p className="mt-1 text-white/85">
                    Turn session behavior into an understandable risk score.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
