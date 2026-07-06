'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

/**
 * MODULE 4: Project Rules (Teaching Copilot Your Style)
 *
 * This page helps you define, test, and refine your Copilot rules.
 * Copilot reads `.github/copilot-instructions.md` and follows your preferred coding patterns automatically.
 *
 * This module is RULES-FOCUSED and uses AGENT MODE tasks (bigger, goal-driven prompts).
 * No “suggestions” training here — you’ll direct Copilot to scaffold real components/features that must follow your rules.
 */

export default function Module4Practice() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Module 4: Project Rules</h1>
          <p className="text-gray-600">
            Teach Copilot to follow your coding voice and style (Agent Mode)
          </p>
        </header>

        {/* LESSON 4.1 — Create Rules File */}
        <section className="bg-white p-6 rounded-lg shadow mb-10">
          <h2 className="text-2xl font-semibold mb-4">Lesson 4.1 — Setting Up Your Rules File</h2>
          <p className="text-gray-700 mb-4">
            Your project rules live in <code>.github/copilot-instructions.md</code>. Once created,
            Copilot automatically uses these instructions whenever you write or edit code in this
            repo.
          </p>

          <div className="bg-gray-50 p-4 rounded border text-sm text-gray-800 mb-4">
            <p className="font-semibold mb-2">Recommended rules:</p>
            <pre className="bg-white p-4 rounded border text-sm text-gray-800 overflow-x-auto">
              {`# Copilot Instructions

- Use React functional components with arrow functions.
- Write TypeScript types or interfaces for component props and state.
- Style with Tailwind CSS; avoid inline styles.
- Keep components small, clean, and modular; extract helpers if a function grows large.
- Add concise comments for non-obvious logic.
- Prefer accessibility-first HTML (semantic elements; label interactive controls).
`}
            </pre>
          </div>

          <p className="text-gray-700">
            Save your rules file, then move on to the next section to validate that Copilot follows
            them in Agent Mode.
          </p>
        </section>

        {/* LESSON 4.2 — Test Rules with Agent Mode */}
        <section className="bg-white p-6 rounded-lg shadow mb-10 border-l-4 border-blue-400">
          <h2 className="text-2xl font-semibold mb-4">
            Lesson 4.2 — Testing Your Rules (Agent Mode)
          </h2>
          <p className="text-gray-700 mb-4">
            Use the practice area below to **direct Copilot (Agent Mode)** to scaffold real
            features. Each task should naturally follow your rules: arrow functions, TypeScript
            types, Tailwind classes, and minimal, purposeful comments.
          </p>

          <div className="border-2 border-blue-400 rounded p-4 bg-blue-50">
            <h3 className="font-semibold mb-2 text-gray-800">Practice Area — Agent Tasks</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add a comment below and run the task with Copilot (Agent Mode):
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-1">
              <li>
                <code>
                  {
                    '// Scaffold a LoginForm with email, password, and submit button. Client-side validation, Tailwind styling, accessible labels.'
                  }
                </code>
              </li>
              <li>
                <code>
                  {
                    '// Build a ProfileCard with avatar image, name, bio, and a “Contact” button. Keep layout responsive and concise.'
                  }
                </code>
              </li>
              <li>
                <code>
                  {
                    '// Create a PrimaryButton component (props: children, onClick, type?). Apply our standard Tailwind button style.'
                  }
                </code>
              </li>
              <li>
                <code>
                  {
                    '// Implement a simple SearchBar with input, clear button, and debounced onChange callback (300ms).'
                  }
                </code>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mb-2">Expected (based on your rules):</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Arrow-function components</li>
              <li>TypeScript props/interfaces</li>
              <li>Tailwind classes (no inline styles)</li>
              <li>Small, focused structure + brief comments for non-obvious logic</li>
              <li>Accessible markup for inputs and controls</li>
            </ul>
          </div>

          {/* Components generated via Agent Mode to test rule adherence */}
          <div className="mt-6 space-y-6">
            <LoginForm />
            <ProfileCard
              name="Alex Johnson"
              bio="Full-stack developer passionate about clean code and great UX. Open to new opportunities."
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              onContact={() => alert('Contact clicked!')}
            />
            <div className="flex gap-3 flex-wrap">
              <PrimaryButton onClick={() => alert('Clicked!')}>Click Me</PrimaryButton>
              <PrimaryButton type="submit">Submit</PrimaryButton>
              <PrimaryButton disabled>Disabled</PrimaryButton>
            </div>
            <SearchBar
              placeholder="Search users..."
              onChange={value => console.log('Debounced search:', value)}
            />
          </div>
        </section>

        {/* LESSON 4.3 — Consistency Across Multiple Components */}
        <section className="bg-white p-6 rounded-lg shadow mb-10 border-l-4 border-green-400">
          <h2 className="text-2xl font-semibold mb-4">
            Lesson 4.3 — Consistency Across Components
          </h2>
          <p className="text-gray-700 mb-4">
            Generate multiple components and verify that Copilot keeps your rules consistent across
            different feature shapes.
          </p>

          <div className="border-2 border-green-400 rounded p-4 bg-green-50">
            <p className="text-sm text-gray-700 mb-4">Agent tasks to try one-by-one:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-1">
              <li>
                <code>
                  {
                    '// Create a NotificationBadge (props: count, maxCount?) that displays “99+” when over max.'
                  }
                </code>
              </li>
              <li>
                <code>
                  {
                    '// Create a ProgressBar (props: value 0–100, label?). Include accessible markup for screen readers.'
                  }
                </code>
              </li>
              <li>
                <code>
                  {
                    '// Create a ModalDialog (props: open, onClose, title). Include a close button and focus trap note in comments.'
                  }
                </code>
              </li>
              <li>
                <code>
                  {
                    '// Create a DataTable shell (columns prop, rows prop). Responsive table layout with Tailwind utilities.'
                  }
                </code>
              </li>
            </ul>

            <p className="text-sm text-gray-700">
              After each generation, check for rule adherence (arrow functions, typed props,
              Tailwind rhythm, minimal comments). If anything drifts, adjust{' '}
              <code>.github/copilot-instructions.md</code> and retry the task.
            </p>
          </div>
        </section>

        {/* LESSON 4.4 — Refining and Expanding Rules */}
        <section className="bg-white p-6 rounded-lg shadow mb-10 border-l-4 border-purple-400">
          <h2 className="text-2xl font-semibold mb-4">Lesson 4.4 — Refining and Expanding Rules</h2>
          <p className="text-gray-700 mb-4">
            As your project grows, evolve your rules with specific, reusable patterns so Agent Mode
            drafts match your voice without reminders.
          </p>

          <p className="text-gray-700 mb-4">Examples you can add to your rules file:</p>
          <pre className="bg-gray-50 p-4 rounded border text-sm text-gray-800 overflow-x-auto mb-4">
            {`- Primary button style: 'px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60'.
- Form inputs: use label + id + aria-describedby; include error text with role="alert".
- Components over ~25 lines: extract helpers; keep render paths simple and readable.
- Prefer composition over prop drilling; create small utilities/hooks for repeated logic.
`}
          </pre>

          <p className="text-gray-700">
            Keep the file updated as your standards change. Copilot will follow the latest version
            across all Agent Mode tasks.
          </p>
        </section>

        {/* SUMMARY */}
        <section className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Takeaways</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Define once, follow everywhere.</strong> Copilot reads your rules
              automatically.
            </li>
            <li>
              <strong>Direct with Agent Mode.</strong> Use bigger tasks to see your rules applied in
              realistic code.
            </li>
            <li>
              <strong>Refine as you go.</strong> When you see drift, clarify the rule and retry.
            </li>
            <li>
              <strong>Keep it modular.</strong> Small components + typed props + Tailwind rhythm =
              consistent output.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

// Scaffold a LoginForm component with email, password, and submit button. Add client-side validation, Tailwind styling, and accessible labels.

type LoginFormState = {
  email: string
  password: string
}

type LoginFormErrors = {
  email?: string
  password?: string
}

const validateLoginForm = (values: LoginFormState): LoginFormErrors => {
  const errors: LoginFormErrors = {}
  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }
  return errors
}

const LoginForm = () => {
  const [values, setValues] = useState<LoginFormState>({ email: '', password: '' })
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    // Clear the field error as the user types
    if (errors[e.target.name as keyof LoginFormErrors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateLoginForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitted(true)
    console.log('Login submitted:', values)
  }

  if (submitted) {
    return (
      <div role="alert" className="p-4 bg-green-100 text-green-800 rounded-lg">
        Logged in successfully!
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Login form" className="space-y-4 max-w-sm">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          value={values.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          aria-required="true"
          aria-describedby={errors.password ? 'password-error' : undefined}
          value={values.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Min. 8 characters"
        />
        {errors.password && (
          <p id="password-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Sign in
      </button>
    </form>
  )
}

// Build a ProfileCard with avatar image, name, bio, and a "Contact" button. Keep layout responsive and concise.

type ProfileCardProps = {
  name: string
  bio: string
  avatarUrl: string
  onContact: () => void
}

const ProfileCard = ({ name, bio, avatarUrl, onContact }: ProfileCardProps) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white rounded-xl shadow border border-gray-100 max-w-sm">
    <Image
      src={avatarUrl}
      alt={`${name}'s avatar`}
      width={80}
      height={80}
      unoptimized
      className="w-20 h-20 rounded-full object-cover flex-shrink-0 bg-gray-100"
    />
    <div className="text-center sm:text-left space-y-2 flex-1">
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
      <button
        onClick={onContact}
        aria-label={`Contact ${name}`}
        className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Contact
      </button>
    </div>
  </div>
)

// Create a PrimaryButton component (props: children, onClick, type?). Apply our standard Tailwind button style.

type PrimaryButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const PrimaryButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
}: PrimaryButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    {children}
  </button>
)

// Implement a simple SearchBar with input, clear button, and debounced onChange callback (300ms).

type SearchBarProps = {
  placeholder?: string
  onChange: (value: string) => void
}

const SearchBar = ({ placeholder = 'Search...', onChange }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce: wait 300ms after the user stops typing before firing onChange
  useEffect(() => {
    debounceTimer.current = setTimeout(() => onChange(query), 300)
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [query, onChange])

  const handleClear = () => setQuery('')

  return (
    <div className="relative flex items-center max-w-sm">
      <label htmlFor="search-input" className="sr-only">
        {placeholder}
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Clear button only visible when there is text */}
      {query && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  )
}
