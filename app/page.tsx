import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              FES GitHub Copilot Course
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Portfolio first. Course work still available.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
              The main destination is the finished portfolio. The course practice modules are still
              here below if you want to review the earlier work.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/practice/module-5-portfolio"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              View Portfolio
            </Link>
            <a
              href="#course-modules"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Browse Course Modules
            </a>
          </div>
        </section>

        <section id="course-modules" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Course Modules</h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Earlier practice work from the course remains available here as supporting context.
            </p>
          </div>

          <div className="grid gap-4">
            <Link
              href="/practice/module-1-copilot-chat"
              className="block rounded-xl bg-white p-6 shadow transition-shadow hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">Module 1: Setup & Orientation</h2>
              <p className="text-gray-600">
                Learn the basics and have your first interaction with Copilot
              </p>
            </Link>

            <Link
              href="/practice/module-2-agent-features"
              className="block rounded-xl bg-white p-6 shadow transition-shadow hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">Module 2: Core Agent Features</h2>
              <p className="text-gray-600">Fix code, add features, and write tests with Copilot</p>
            </Link>

            <Link
              href="/practice/module-3-inline-chat"
              className="block rounded-xl bg-white p-6 shadow transition-shadow hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">Module 3: Inline Chat</h2>
              <p className="text-gray-600">Make surgical edits and refactor with precision</p>
            </Link>

            <Link
              href="/practice/module-4-rules"
              className="block rounded-xl bg-white p-6 shadow transition-shadow hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">Module 4: Rules & Context</h2>
              <p className="text-gray-600">Teach Copilot your coding style and preferences</p>
            </Link>

            <Link
              href="/practice/module-5-portfolio"
              className="block rounded-xl bg-white p-6 shadow transition-shadow hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">Module 5: Final Project</h2>
              <p className="text-gray-600">Build a complete portfolio website</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
