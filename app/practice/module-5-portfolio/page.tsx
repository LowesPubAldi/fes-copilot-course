'use client'

import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiGit,
  SiJest,
  SiFirebase,
} from 'react-icons/si'
import { MdPhoneIphone } from 'react-icons/md'
import { FaCss3Alt } from 'react-icons/fa'

// ===== EmailJS Config =====

// ===== Hook: Scroll Animation =====
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

const EMAILJS_SERVICE_ID = 'service_oe2vosd'
const EMAILJS_TEMPLATE_ID = 'template_bfckmd9'
const EMAILJS_PUBLIC_KEY = 'G1CS-QLbgNF8atJUw'

// ===== TypeScript Interfaces =====

interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  liveLink: string
  githubLink: string
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

// ===== Sample Projects Data =====

const projects: Project[] = [
  {
    id: 1,
    title: 'Treact',
    description:
      'A pixel-perfect React landing page built from a professional Figma design. Demonstrates component architecture, responsive layouts, and clean UI implementation.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    id: 2,
    title: 'Movie Project',
    description:
      'A movie discovery app powered by The Movie Database API. Features trending films, search functionality, and detailed movie pages with ratings and cast info.',
    techStack: ['React', 'JavaScript', 'TMDB API', 'CSS'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    id: 3,
    title: 'Yugioh Database',
    description:
      'A searchable card database pulling from the Yu-Gi-Oh API. Browse thousands of cards with filtering by type, attribute, and archetype with a clean responsive interface.',
    techStack: ['React', 'TypeScript', 'REST API', 'CSS'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    id: 4,
    title: 'NFT Marketplace',
    description:
      'A fully responsive NFT marketplace UI featuring collection browsing, wallet connection flow, and dynamic product pages built with modern frontend tooling.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    id: 5,
    title: 'Summarist',
    description:
      'AI-powered book summary app with audiobook integration, Firebase authentication, and Stripe payments. Users can read or listen to book summaries with a premium subscription model.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Firebase', 'Stripe'],
    liveLink: '#',
    githubLink: '#',
  },
]

// ===== Component: Navigation Header =====

const Header = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean
  toggleDarkMode: () => void
}) => {
  const navLinks = ['Home', 'About', 'Projects', 'Contact']

  return (
    <header
      className={`fixed top-0 w-full shadow-lg z-50 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-900 text-white'}`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
        <div className="text-lg font-bold tracking-tight w-44 shrink-0">Josh Van Minsel</div>
        <ul className="hidden sm:flex gap-10 flex-1 justify-center">
          {navLinks.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors tracking-widest uppercase text-sm font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
                aria-label={`Navigate to ${link}`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="w-40 flex justify-end">
          <button
            onClick={toggleDarkMode}
            className="text-xl p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900 hover:text-yellow-300 focus:ring-yellow-400"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  )
}

// ===== Component: Halo Rings Animation =====

const HaloRings = ({ opacity }: { opacity: number }) => {
  const ringStyle = `
    @keyframes rotateRing1 {
      from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      to { transform: rotateX(360deg) rotateY(180deg) rotateZ(0deg); }
    }
    @keyframes rotateRing2 {
      from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      to { transform: rotateX(180deg) rotateY(360deg) rotateZ(90deg); }
    }
    @keyframes rotateRing3 {
      from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      to { transform: rotateX(360deg) rotateY(0deg) rotateZ(180deg); }
    }
    @keyframes rotateRing4 {
      from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      to { transform: rotateX(180deg) rotateY(180deg) rotateZ(270deg); }
    }
    @keyframes rotateRing5 {
      from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      to { transform: rotateX(270deg) rotateY(270deg) rotateZ(180deg); }
    }
    @keyframes rotateRing6 {
      from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      to { transform: rotateX(90deg) rotateY(360deg) rotateZ(90deg); }
    }
    @keyframes rotateRing7 {
      from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      to { transform: rotateX(360deg) rotateY(270deg) rotateZ(270deg); }
    }
  `

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: '1200px',
        opacity,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotateX(${(i * 51.43).toFixed(2)}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            style={{
              animation: `rotateRing${i + 1} 5s linear infinite`,
              transformStyle: 'preserve-3d',
              display: 'block',
            }}
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#2d6a4f"
              strokeWidth="6"
              strokeLinecap="round"
              opacity={opacity}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}

// ===== Component: Hero Section =====

const HeroSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const ringsContainerRef = useRef<HTMLDivElement>(null)
  const [ringsOpacity, setRingsOpacity] = useState(1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setRingsOpacity(entry.intersectionRatio)
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    )

    if (ringsContainerRef.current) {
      observer.observe(ringsContainerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="home"
      className={`relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-left ${
        isDarkMode
          ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white'
          : 'bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 text-slate-900'
      }`}
      style={{
        backgroundSize: '200% 200%',
        animation: 'breatheBackground 5s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes rotateRing1 {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(360deg) rotateY(180deg) rotateZ(0deg); }
        }
        @keyframes rotateRing2 {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(180deg) rotateY(360deg) rotateZ(90deg); }
        }
        @keyframes rotateRing3 {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(360deg) rotateY(0deg) rotateZ(180deg); }
        }
        @keyframes rotateRing4 {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(180deg) rotateY(180deg) rotateZ(270deg); }
        }
        @keyframes rotateRing5 {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(270deg) rotateY(270deg) rotateZ(180deg); }
        }
        @keyframes rotateRing6 {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(90deg) rotateY(360deg) rotateZ(90deg); }
        }
        @keyframes rotateRing7 {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(360deg) rotateY(270deg) rotateZ(270deg); }
        }
        @keyframes breatheBackground {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 2% 1%; }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2.5 + 0.5}px`,
              height: `${Math.random() * 2.5 + 0.5}px`,
              borderRadius: '50%',
              backgroundColor: isDarkMode ? '#ffffff' : '#1e293b',
              opacity: Math.random() * 0.6 + 0.4,
              boxShadow: isDarkMode ? '0 0 2px rgba(255, 255, 255, 0.4)' : 'none',
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center gap-8 lg:gap-12 max-w-6xl">
        <div className="flex-1 max-w-md">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            Hi, I'm Josh Van Minsel
          </h1>
          <p
            className={`text-base sm:text-lg mb-6 max-w-md ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
          >
            Building modern, accessible web applications with React, TypeScript, and Tailwind CSS
          </p>
          <a
            href="mailto:jovanminsel@gmail.com"
            className={`inline-block px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDarkMode
                ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 active:bg-yellow-600 focus:ring-yellow-400'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500'
            }`}
          >
            Get In Touch
          </a>
        </div>

        <div
          ref={ringsContainerRef}
          className="hidden lg:flex flex-1 justify-center items-center"
          style={{ width: '320px', height: '320px' }}
        >
          <HaloRings opacity={ringsOpacity} />
        </div>
      </div>
    </section>
  )
}

// ===== Component: Project Card =====

const ProjectCard = ({ project, isDarkMode }: { project: Project; isDarkMode: boolean }) => {
  return (
    <div
      className={`rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 ${
        isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {project.title}
      </h3>
      <p
        className={`mb-4 text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
      >
        {project.description}
      </p>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <span
              key={tech}
              className={`px-3 py-1 text-xs sm:text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <a
          href={project.liveLink}
          className={`px-4 py-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isDarkMode
              ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 active:bg-yellow-600 focus:ring-yellow-400 focus:ring-offset-slate-800'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500'
          }`}
          aria-label={`View live demo of ${project.title}`}
        >
          Live Demo
        </a>
        <a
          href={project.githubLink}
          className={`px-4 py-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isDarkMode
              ? 'bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-700 focus:ring-slate-400 focus:ring-offset-slate-800'
              : 'bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 focus:ring-slate-500'
          }`}
          aria-label={`View GitHub repository for ${project.title}`}
        >
          GitHub
        </a>
      </div>
    </div>
  )
}

// ===== Component: Projects Section =====

const ProjectsSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <section
      id="projects"
      className={`py-14 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-8 text-center ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Featured Projects
        </h2>
        <ul ref={ref} className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className={`w-full transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
            >
              <ProjectCard project={project} isDarkMode={isDarkMode} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ===== Component: About Section =====

const AboutSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation()
  const skills = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'HTML', icon: SiHtml5, color: '#E34C26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'Git', icon: SiGit, color: '#F1502F' },
    { name: 'Jest', icon: SiJest, color: '#C21325' },
    { name: 'React Testing Library', icon: SiJest, color: '#C21325' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Responsive Design', icon: MdPhoneIphone, color: '#3B82F6' },
  ]

  return (
    <section
      id="about"
      className={`py-14 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          About Me
        </h2>
        <p
          className={`text-lg mb-6 leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Self-taught frontend developer with 2+ months of intensive React development. I've
          completed 5 projects including Treact, Movie Project, Yugioh Database, NFT Marketplace,
          and Summarist. Passionate about self-improvement, video games, and becoming a business
          owner. Currently focused on learning diverse technologies to become a successful software
          engineer and entrepreneur. I'm committed to building modern, accessible web applications
          while constantly expanding my technical skillset.
        </p>
        <div>
          <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" ref={skillsRef}>
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <div
                  key={skill.name}
                  title={skill.name}
                  className={`transition-all duration-500 hover:scale-110 cursor-default flex items-center justify-center ${
                    skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: skillsVisible ? `${index * 60}ms` : '0ms' }}
                >
                  <IconComponent size={32} color={skill.color} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== Component: Contact Form =====

const ContactForm = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSendError(null)
    if (!validateForm()) return
    setSending(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err: unknown) {
      const error = err as { text?: string; status?: number }
      console.error('EmailJS error:', error?.status, error?.text)
      setSendError(
        `Error ${error?.status ?? ''}: ${error?.text ?? 'Something went wrong. Please email me directly at jovanminsel@gmail.com'}`
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className={`py-14 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
        >
          Get In Touch
        </h2>
        <p
          className={`text-center mb-4 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
        >
          Whether you have a freelance project that needs building, or you're looking for a
          dedicated developer to join your team part-time or full-time — I'd love to hear from you.
        </p>
        <p
          className={`text-center mb-10 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          I'm open to new opportunities, collaborations, and interesting projects at any stage. Even
          if you just want to say hello — my inbox is always open. 😊
        </p>

        {submitted && (
          <div
            className={`mb-6 p-4 rounded-lg border ${isDarkMode ? 'bg-green-900 text-green-300 border-green-700' : 'bg-green-100 text-green-800 border-green-300'}`}
            role="alert"
          >
            Thank you for your message! I'll get back to you soon.
          </div>
        )}

        {sendError && (
          <div
            className={`mb-6 p-4 rounded-lg border ${isDarkMode ? 'bg-red-900 text-red-300 border-red-700' : 'bg-red-100 text-red-800 border-red-300'}`}
            role="alert"
          >
            {sendError}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 border ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-50 text-slate-900 border-slate-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="Your name"
            />
            {errors.name && (
              <p
                id="name-error"
                className={`text-sm mt-1 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 border ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-50 text-slate-900 border-slate-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p
                id="email-error"
                className={`text-sm mt-1 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 border ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-50 text-slate-900 border-slate-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 border ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-50 text-slate-900 border-slate-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              aria-describedby={errors.message ? 'message-error' : undefined}
              rows={6}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 resize-none ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-50 text-slate-900 border-slate-300 focus:ring-blue-500 focus:border-transparent'}`}
              placeholder="Your message here..."
            />
            {errors.message && (
              <p
                id="message-error"
                className={`text-sm mt-1 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className={`w-full px-6 py-3 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${isDarkMode ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 active:bg-yellow-600 focus:ring-yellow-400 focus:ring-offset-slate-900' : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500'}`}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

// ===== Component: Footer =====

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/LowesPubAldi', ariaLabel: 'Visit GitHub profile' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/joshua-vanminsel-628910107/',
      ariaLabel: 'Visit LinkedIn profile',
    },
  ]

  return (
    <footer
      className={`py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Let's Connect
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1 ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-yellow-300 focus:ring-yellow-400 focus:ring-offset-slate-950'
                    : 'text-slate-700 hover:text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-100'
                }`}
                aria-label={link.ariaLabel}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div
          className={`border-t pt-6 text-center ${
            isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-300 text-slate-600'
          }`}
        >
          <p>© 2026 Josh Van Minsel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ===== Main Portfolio Component =====

export default function Module5Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <HeroSection isDarkMode={isDarkMode} />
        <ProjectsSection isDarkMode={isDarkMode} />
        <AboutSection isDarkMode={isDarkMode} />
        <ContactForm isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

/*
STEP 1 INSTRUCTIONS (Reference only - not executed)
=====================================================

Once you add content sections, delete this comment block.

🎯 STEP 1: CREATE THE BASE LAYOUT
- Header with navigation menu (Home, About, Projects, Contact)
- Hero section with name, tagline, and CTA button
- Projects grid (4 sample cards)
- About section with bio and skills
- Contact form (name, email, message)
- Footer with social media links

Use Agent Mode (Claude/Auto) to scaffold sections.
Then use Inline Chat for refinements.

Replace the component's return JSX as you build each section.
*/
