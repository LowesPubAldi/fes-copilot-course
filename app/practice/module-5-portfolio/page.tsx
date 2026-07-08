'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
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
import { FaCss3Alt, FaFlask, FaMousePointer } from 'react-icons/fa'

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
  completed: string
  description: string
  techStack: string[]
  liveLink?: string
  githubLink?: string
  thumbnail?: string
  glow?: { color: string; direction: string }
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
    completed: 'May 20, 2026',
    description:
      'A pixel-perfect React landing page built from a professional Figma design. Demonstrates component architecture, responsive layouts, and clean UI implementation.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS'],
    liveLink: 'https://module-3-project-final.vercel.app/',
    githubLink: 'https://github.com/LowesPubAldi/Module-3-Project-Final',
    thumbnail: '/images/treact-thumbnail.svg',
    glow: { color: '#22d3ee', direction: '-6px -6px 28px' },
  },
  {
    id: 2,
    title: 'Movie Project',
    completed: 'May 30, 2026',
    description:
      'A movie discovery app powered by The Movie Database API. Features trending films, search functionality, and detailed movie pages with ratings and cast info.',
    techStack: ['React', 'JavaScript', 'TMDB API', 'CSS'],
    liveLink: '#',
    githubLink: '#',
    glow: { color: '#7c3aed', direction: '6px -6px 28px' },
  },
  {
    id: 3,
    title: 'Yugioh Database',
    completed: 'June 6, 2026',
    description:
      'A searchable card database pulling from the Yu-Gi-Oh API. Browse thousands of cards with filtering by type, attribute, and archetype with a clean responsive interface.',
    techStack: ['React', 'TypeScript', 'REST API', 'CSS'],
    liveLink: '#',
    githubLink: '#',
    glow: { color: '#d97706', direction: '-6px 6px 28px' },
  },
  {
    id: 4,
    title: 'NFT Marketplace',
    completed: 'June 12, 2026',
    description:
      'A fully responsive NFT marketplace UI featuring collection browsing, wallet connection flow, and dynamic product pages built with modern frontend tooling.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    liveLink: '#',
    githubLink: '#',
    glow: { color: '#65a30d', direction: '6px 6px 28px' },
  },
  {
    id: 5,
    title: 'Summarist',
    completed: 'June 27, 2026',
    description:
      'AI-powered book summary app with audiobook integration, Firebase authentication, and Stripe payments. Users can read or listen to book summaries with a premium subscription model.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Firebase', 'Stripe'],
    liveLink: '#',
    githubLink: '#',
    glow: { color: '#dc2626', direction: '-6px -6px 28px' },
  },
]

// ===== Component: Navigation Header =====

const Header = ({
  isDarkMode,
  toggleDarkMode,
  cursorMode,
  toggleCursorMode,
}: {
  isDarkMode: boolean
  toggleDarkMode: () => void
  cursorMode: 'scope' | 'plasma'
  toggleCursorMode: () => void
}) => {
  const navLinks = ['Home', 'About', 'Projects', 'Contact']

  return (
    <header
      className={`portfolio-breathe-bg fixed top-0 w-full shadow-lg z-50 ${isDarkMode ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white' : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white'}`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
        <a
          href="/resume.pdf"
          className="text-lg font-bold tracking-tight w-44 shrink-0 hover:text-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Open resume"
        >
          Josh Van Minsel
        </a>
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
        <div className="w-48 flex justify-end gap-2">
          <button
            onClick={toggleCursorMode}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900 ${
              cursorMode === 'plasma'
                ? 'border-cyan-400 text-cyan-200 hover:text-cyan-100 focus:ring-cyan-400'
                : 'border-emerald-500 text-emerald-200 hover:text-emerald-100 focus:ring-emerald-400'
            }`}
            aria-label={`Switch to ${cursorMode === 'plasma' ? 'gun scope' : 'plasma pistol'} cursor`}
          >
            <FaMousePointer size={13} aria-hidden="true" />
          </button>
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

const HaloRings = ({
  opacity,
  isPulsing,
  scale,
  offsetY,
}: {
  opacity: number
  isPulsing: boolean
  scale: number
  offsetY: number
}) => {
  const ringsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ringsRef.current
    if (!element) return

    element.style.setProperty('--halo-opacity', String(opacity))
    element.style.setProperty('--halo-scale', String(scale))
    element.style.setProperty('--halo-offset-y', `${offsetY}px`)
  }, [opacity, scale, offsetY])

  return (
    <div
      ref={ringsRef}
      className={`portfolio-halo-rings relative h-full w-full [perspective:1200px] origin-center transition-[opacity,transform] duration-300 ease-out ${isPulsing ? 'portfolio-halo-rings--pulsing' : ''}`}
    >
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <div
          key={i}
          className={`portfolio-halo-ring portfolio-halo-ring-${i + 1} absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]`}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className={`portfolio-halo-ring-svg block [transform-style:preserve-3d] portfolio-halo-ring-svg-${i + 1}`}
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

      <style>{`
        @keyframes centerFirePulse {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0.95;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }

        @keyframes centerFireWaveFill {
          0% {
            transform: translate(-50%, -50%) scale(0.05);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }

        .portfolio-halo-rings {
          opacity: var(--halo-opacity, 1);
          transform: translateY(var(--halo-offset-y, 0px)) scale(var(--halo-scale, 1));
          transform-origin: center center;
        }

        .portfolio-halo-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-style: preserve-3d;
        }

        .portfolio-halo-ring-1 {
          transform: translate(-50%, -50%) rotateX(0deg);
        }

        .portfolio-halo-ring-2 {
          transform: translate(-50%, -50%) rotateX(51.43deg);
        }

        .portfolio-halo-ring-3 {
          transform: translate(-50%, -50%) rotateX(102.86deg);
        }

        .portfolio-halo-ring-4 {
          transform: translate(-50%, -50%) rotateX(154.29deg);
        }

        .portfolio-halo-ring-5 {
          transform: translate(-50%, -50%) rotateX(205.72deg);
        }

        .portfolio-halo-ring-6 {
          transform: translate(-50%, -50%) rotateX(257.15deg);
        }

        .portfolio-halo-ring-7 {
          transform: translate(-50%, -50%) rotateX(308.58deg);
        }

        .portfolio-halo-ring-svg-1 { animation: rotateRing1 5s linear infinite; }
        .portfolio-halo-ring-svg-2 { animation: rotateRing2 5s linear infinite; }
        .portfolio-halo-ring-svg-3 { animation: rotateRing3 5s linear infinite; }
        .portfolio-halo-ring-svg-4 { animation: rotateRing4 5s linear infinite; }
        .portfolio-halo-ring-svg-5 { animation: rotateRing5 5s linear infinite; }
        .portfolio-halo-ring-svg-6 { animation: rotateRing6 5s linear infinite; }
        .portfolio-halo-ring-svg-7 { animation: rotateRing7 5s linear infinite; }

        .portfolio-halo-ring circle {
          opacity: var(--halo-opacity, 1);
        }

        .portfolio-halo-center-dot,
        .portfolio-halo-center-wave,
        .portfolio-halo-center-pulse {
          position: absolute;
          left: 50%;
          top: 50%;
          pointer-events: none;
        }

        .portfolio-halo-center-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background-color: #22d3ee;
          box-shadow: 0 0 6px rgba(34,211,238,0.95);
          opacity: 0;
          transition: opacity 0.45s ease-out;
        }

        .portfolio-halo-rings--pulsing .portfolio-halo-center-dot {
          opacity: 1;
          transition-duration: 0.05s;
        }

        .portfolio-halo-center-pulse {
          width: 170vmax;
          height: 170vmax;
          border-radius: 50%;
          border: 2.5px solid rgba(34,211,238,0.95);
          box-shadow: 0 0 22px rgba(34,211,238,0.55);
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }

        .portfolio-halo-rings--pulsing .portfolio-halo-center-pulse {
          animation: centerFirePulse 0.6s ease-out;
        }

        .portfolio-halo-center-wave {
          width: 170vmax;
          height: 170vmax;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0.08) 18%, rgba(34,211,238,0.03) 40%, transparent 70%);
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }

        .portfolio-halo-rings--pulsing .portfolio-halo-center-wave {
          animation: centerFireWaveFill 0.6s ease-out;
        }
      `}</style>

      <div className="portfolio-halo-center-dot" />
      <div className="portfolio-halo-center-pulse" />
      <div className="portfolio-halo-center-wave" />
    </div>
  )
}

const StarField = ({ className = '' }: { className?: string }) => {
  const starSlots = Array.from({ length: 24 }, (_, index) => index + 1)

  return (
    <div className={`portfolio-starfield z-0 ${className}`} aria-hidden="true">
      {starSlots.map(index => (
        <span
          key={index}
          className={`portfolio-star portfolio-star-slot-${index} ${index % 2 === 0 ? 'portfolio-star--fast' : 'portfolio-star--slow'}`}
        />
      ))}
    </div>
  )
}

// ===== Component: Hero Section =====

const HeroSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const heroSectionRef = useRef<HTMLElement>(null)
  const [ringsOpacity, setRingsOpacity] = useState(1)
  const [ringsScale, setRingsScale] = useState(1)
  const [ringsOffsetY, setRingsOffsetY] = useState(0)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    const handleClick = () => {
      setIsPulsing(true)
      setTimeout(() => setIsPulsing(false), 600)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    let frameId = 0

    const updateRingsFromScroll = () => {
      const heroElement = heroSectionRef.current
      const projectsElement = document.getElementById('projects')

      if (!heroElement || !projectsElement) return

      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const heroTop = heroElement.offsetTop
      const projectsTop = projectsElement.offsetTop

      const start = heroTop + 40
      const end = projectsTop + viewportHeight * 0.35
      const distance = Math.max(1, end - start)
      const rawProgress = (scrollY - start) / distance
      const progress = Math.min(1, Math.max(0, rawProgress))
      const fadeProgress = Math.min(1, Math.max(0, (progress - 0.12) / 0.88))
      const easedFade = fadeProgress * fadeProgress * (3 - 2 * fadeProgress)

      // Keep rings visible as they descend, then let cards naturally cover them.
      setRingsOpacity(1 - easedFade * 0.55)
      setRingsScale(1 - progress * 0.72)
      setRingsOffsetY(progress * 760)
    }

    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateRingsFromScroll)
    }

    updateRingsFromScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section
      ref={heroSectionRef}
      id="home"
      className={`portfolio-breathe-bg relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-left ${
        isDarkMode
          ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white'
          : 'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 text-slate-900'
      }`}
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
        @keyframes starDriftA {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(6px, -4px); }
        }
        @keyframes starDriftB {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-5px, 5px); }
        }
        @keyframes starShipDriftA {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(22px, -36px, 0); }
        }
        @keyframes starShipDriftB {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-18px, 30px, 0); }
        }

        .portfolio-starfield {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .portfolio-star {
          position: absolute;
          display: block;
          border-radius: 9999px;
          background-color: currentColor;
          box-shadow: 0 0 2px currentColor;
          opacity: 0.45;
        }

        .portfolio-star--fast {
          animation: starShipDriftA 3.2s linear infinite;
        }

        .portfolio-star--slow {
          animation: starShipDriftB 4.1s linear infinite;
        }

        .portfolio-star-slot-1 { left: 8%; top: 12%; width: 2px; height: 2px; }
        .portfolio-star-slot-2 { left: 17%; top: 26%; width: 1px; height: 1px; }
        .portfolio-star-slot-3 { left: 24%; top: 9%; width: 1.5px; height: 1.5px; }
        .portfolio-star-slot-4 { left: 33%; top: 19%; width: 1px; height: 1px; }
        .portfolio-star-slot-5 { left: 42%; top: 11%; width: 2.5px; height: 2.5px; }
        .portfolio-star-slot-6 { left: 51%; top: 30%; width: 1px; height: 1px; }
        .portfolio-star-slot-7 { left: 60%; top: 15%; width: 1.5px; height: 1.5px; }
        .portfolio-star-slot-8 { left: 69%; top: 24%; width: 1px; height: 1px; }
        .portfolio-star-slot-9 { left: 77%; top: 10%; width: 2px; height: 2px; }
        .portfolio-star-slot-10 { left: 85%; top: 18%; width: 1px; height: 1px; }
        .portfolio-star-slot-11 { left: 92%; top: 34%; width: 1.5px; height: 1.5px; }
        .portfolio-star-slot-12 { left: 12%; top: 54%; width: 2px; height: 2px; }
        .portfolio-star-slot-13 { left: 21%; top: 68%; width: 1px; height: 1px; }
        .portfolio-star-slot-14 { left: 30%; top: 58%; width: 1.5px; height: 1.5px; }
        .portfolio-star-slot-15 { left: 39%; top: 73%; width: 1px; height: 1px; }
        .portfolio-star-slot-16 { left: 48%; top: 61%; width: 2.5px; height: 2.5px; }
        .portfolio-star-slot-17 { left: 57%; top: 78%; width: 1px; height: 1px; }
        .portfolio-star-slot-18 { left: 66%; top: 67%; width: 1.5px; height: 1.5px; }
        .portfolio-star-slot-19 { left: 74%; top: 83%; width: 1px; height: 1px; }
        .portfolio-star-slot-20 { left: 82%; top: 63%; width: 2px; height: 2px; }
        .portfolio-star-slot-21 { left: 90%; top: 76%; width: 1px; height: 1px; }
        .portfolio-star-slot-22 { left: 6%; top: 84%; width: 1.5px; height: 1.5px; }
        .portfolio-star-slot-23 { left: 26%; top: 88%; width: 1px; height: 1px; }
        .portfolio-star-slot-24 { left: 54%; top: 90%; width: 2px; height: 2px; }

        .portfolio-project-card {
          position: relative;
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease, background-color 200ms ease;
          transform-origin: center;
        }

        .portfolio-project-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
      <div className="relative z-10 flex items-center gap-8 lg:gap-12 max-w-6xl">
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

        <div className="hidden lg:flex flex-1 w-[320px] h-[320px] justify-center items-center">
          <HaloRings
            opacity={ringsOpacity}
            isPulsing={isPulsing}
            scale={ringsScale}
            offsetY={ringsOffsetY}
          />
        </div>
      </div>
    </section>
  )
}

// ===== Component: Project Card =====

const ProjectCard = ({ project, isDarkMode }: { project: Project; isDarkMode: boolean }) => {
  const isYugiohCard = project.title === 'Yugioh Database'
  const hasLiveLink = Boolean(project.liveLink && project.liveLink !== '#')
  const hasGithubLink = Boolean(project.githubLink && project.githubLink !== '#')
  const [isLiveHovered, setIsLiveHovered] = useState(false)
  const [isGithubHovered, setIsGithubHovered] = useState(false)

  return (
    <div
      className={`portfolio-project-card group relative z-10 rounded-lg border p-6 hover:z-30 focus-within:z-30 ${
        isDarkMode
          ? 'border-slate-700 bg-slate-900 text-white shadow-sm hover:shadow-md'
          : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-md'
      } ${isYugiohCard ? 'overflow-hidden' : ''}`}
    >
      <div className="relative z-10">
        <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {project.title}
        </h3>
        <p
          className={`mb-3 text-sm font-medium tracking-wide ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Completed: {project.completed}
        </p>
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
                className={`px-3 py-1 text-xs sm:text-sm rounded-full border ${
                  isDarkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-200'
                    : 'border-slate-200 bg-slate-100 text-slate-700'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center gap-4 pt-4">
          <div
            className="relative inline-flex items-center"
            onMouseEnter={() => setIsLiveHovered(true)}
            onMouseLeave={() => setIsLiveHovered(false)}
          >
            {project.thumbnail && (
              <div
                className={`pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-56 overflow-hidden rounded-md border border-slate-300 bg-slate-950/95 shadow-xl transition-all duration-200 md:block ${isLiveHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
              >
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} live demo preview`}
                  width={1200}
                  height={630}
                  className="h-36 w-full object-cover"
                />
              </div>
            )}
            {hasLiveLink ? (
              <a
                href={project.liveLink}
                className={`inline-flex items-center px-4 py-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode
                    ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 active:bg-yellow-600 focus:ring-yellow-400 focus:ring-offset-slate-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500'
                }`}
                aria-label={`View live demo of ${project.title}`}
              >
                Live Demo
              </a>
            ) : (
              <span
                className={`inline-flex items-center px-4 py-2 text-sm rounded-md border border-dashed cursor-not-allowed ${
                  isDarkMode
                    ? 'border-slate-600 text-slate-400 bg-slate-800/70'
                    : 'border-slate-300 text-slate-400 bg-slate-100'
                }`}
                aria-disabled="true"
                title={`${project.title} does not have a live demo link yet`}
              >
                Demo Pending
              </span>
            )}
          </div>
          <div
            className="relative inline-flex items-center"
            onMouseEnter={() => setIsGithubHovered(true)}
            onMouseLeave={() => setIsGithubHovered(false)}
          >
            {project.thumbnail && (
              <div
                className={`pointer-events-none absolute bottom-full right-0 z-20 mb-2 hidden w-56 overflow-hidden rounded-md border border-slate-300 bg-slate-950/95 shadow-xl transition-all duration-200 md:block ${isGithubHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} project thumbnail`}
                  width={1200}
                  height={630}
                  className="h-36 w-full object-cover"
                />
              </div>
            )}
            {hasGithubLink ? (
              <a
                href={project.githubLink}
                className={`inline-flex items-center px-4 py-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode
                    ? 'bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-700 focus:ring-slate-400 focus:ring-offset-slate-800'
                    : 'bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 focus:ring-slate-500'
                }`}
                aria-label={`View GitHub repository for ${project.title}`}
              >
                GitHub
              </a>
            ) : (
              <span
                className={`inline-flex items-center px-4 py-2 text-sm rounded-md border border-dashed cursor-not-allowed ${
                  isDarkMode
                    ? 'border-slate-600 text-slate-400 bg-slate-800/70'
                    : 'border-slate-300 text-slate-400 bg-slate-100'
                }`}
                aria-disabled="true"
                title={`${project.title} does not have a GitHub link yet`}
              >
                Repo Pending
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== Component: Projects Section =====

const ProjectsSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { ref } = useScrollAnimation()
  return (
    <section
      id="projects"
      className={`relative py-10 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-6 text-center ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Featured Projects
        </h2>
        <div ref={ref}>
          <ul className="flex flex-col gap-4">
            {projects.map(project => (
              <li key={project.id} className="relative z-10 w-full">
                <ProjectCard project={project} isDarkMode={isDarkMode} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ===== Component: About Section =====

const AboutSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation()
  const skills = [
    { name: 'React', icon: SiReact, color: '#61DAFB', rarity: 'ultimate' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', rarity: 'ultimate' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', rarity: 'ultimate' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', rarity: 'ultimate' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', rarity: 'ghost' },
    { name: 'HTML', icon: SiHtml5, color: '#E34C26', rarity: 'ghost' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6', rarity: 'ghost' },
    { name: 'Git', icon: SiGit, color: '#F1502F', rarity: 'ghost' },
    { name: 'Jest', icon: SiJest, color: '#C21325', rarity: 'secret' },
    { name: 'React Testing Library', icon: FaFlask, color: '#E33332', rarity: 'secret' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', rarity: 'secret' },
    { name: 'Responsive Design', icon: MdPhoneIphone, color: '#3B82F6', rarity: 'secret' },
  ]
  const rarityColumns = ['ultimate', 'ghost', 'secret'] as const

  return (
    <section
      id="about"
      className={`py-14 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
    >
      <style>{`
        @keyframes ultimateFoilShift {
          0% { background-position: 0% 0%, 0% 0%, 0% 0%; }
          50% { background-position: 90% 40%, 40% 80%, 100% 20%; }
          100% { background-position: 0% 0%, 0% 0%, 0% 0%; }
        }

        @keyframes ultimateSparkleSweep {
          0% { transform: translateX(-130%) rotate(13deg); opacity: 0; }
          25% { opacity: 0.5; }
          50% { opacity: 0.75; }
          100% { transform: translateX(130%) rotate(13deg); opacity: 0; }
        }

        @keyframes secretRareLines {
          0% { background-position: 0% 0%, 0% 0%; }
          100% { background-position: 120% 0%, -120% 0%; }
        }

        @keyframes secretHoverSweep {
          0% { transform: translateX(-130%) rotate(14deg); opacity: 0; }
          20% { opacity: 0.35; }
          50% { opacity: 0.7; }
          100% { transform: translateX(130%) rotate(14deg); opacity: 0; }
        }

        @keyframes secretColumnShimmerLtr {
          0% { transform: translateX(-60%) rotate(14deg); opacity: 0.2; }
          50% { opacity: 0.85; }
          100% { transform: translateX(60%) rotate(14deg); opacity: 0.2; }
        }

        @keyframes secretColumnShimmerRtl {
          0% { transform: translateX(60%) rotate(14deg); opacity: 0.2; }
          50% { opacity: 0.85; }
          100% { transform: translateX(-60%) rotate(14deg); opacity: 0.2; }
        }

        .portfolio-skill-card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 88px;
          overflow: hidden;
          padding: 0.75rem 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid transparent;
          transition: transform 500ms ease, opacity 500ms ease, box-shadow 300ms ease;
        }

        .portfolio-skill-card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .portfolio-skill-card--hidden {
          opacity: 0;
          transform: translateY(1rem);
        }

        .portfolio-skill-card:hover {
          transform: translateY(-2px);
        }

        .portfolio-skill-card__overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.82;
          mix-blend-mode: screen;
          transition: opacity 300ms ease, filter 300ms ease;
        }

        .portfolio-skill-card[data-rarity='ultimate'][data-dark='true'] {
          background: linear-gradient(136deg, rgba(124,58,237,0.32), rgba(217,119,6,0.26) 42%, rgba(20,184,166,0.24) 80%), repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 6px), radial-gradient(circle at 24% 20%, rgba(255,255,255,0.3), transparent 56%);
          border-color: rgba(254,240,138,0.55);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14), 0 8px 20px rgba(217,119,6,0.26);
        }

        .portfolio-skill-card[data-rarity='ultimate'][data-dark='false'] {
          background: linear-gradient(136deg, rgba(124,58,237,0.22), rgba(217,119,6,0.2) 42%, rgba(20,184,166,0.18) 80%), repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 6px), radial-gradient(circle at 24% 20%, rgba(255,255,255,0.38), transparent 56%);
          border-color: rgba(217,119,6,0.45);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4), 0 6px 16px rgba(217,119,6,0.2);
        }

        .portfolio-skill-card[data-rarity='ghost'][data-dark='true'] {
          background: linear-gradient(150deg, rgba(148,163,184,0.1), rgba(148,163,184,0.03) 60%, rgba(148,163,184,0.08));
          border-color: rgba(226,232,240,0.2);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 2px 8px rgba(15,23,42,0.35), inset 0 0 24px rgba(34,211,238,0.12);
        }

        .portfolio-skill-card[data-rarity='ghost'][data-dark='false'] {
          background: linear-gradient(150deg, rgba(148,163,184,0.12), rgba(148,163,184,0.04) 60%, rgba(148,163,184,0.1));
          border-color: rgba(100,116,139,0.2);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2), 0 2px 8px rgba(15,23,42,0.15), inset 0 0 24px rgba(15,23,42,0.08);
        }

        .portfolio-skill-card[data-rarity='secret'][data-dark='true'] {
          background: repeating-linear-gradient(112deg, rgba(196,181,253,0.22) 0px, rgba(196,181,253,0.22) 2px, rgba(167,139,250,0.07) 2px, rgba(167,139,250,0.07) 7px), repeating-linear-gradient(68deg, rgba(244,114,182,0.16) 0px, rgba(244,114,182,0.16) 2px, rgba(14,165,233,0.06) 2px, rgba(14,165,233,0.06) 8px), linear-gradient(142deg, rgba(30,41,59,0.84), rgba(15,23,42,0.9));
          border-color: rgba(196,181,253,0.35);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 4px 12px rgba(109,40,217,0.2);
          animation: secretRareLines 8s linear infinite;
        }

        .portfolio-skill-card[data-rarity='secret'][data-dark='false'] {
          background: repeating-linear-gradient(112deg, rgba(196,181,253,0.2) 0px, rgba(196,181,253,0.2) 2px, rgba(167,139,250,0.06) 2px, rgba(167,139,250,0.06) 7px), repeating-linear-gradient(68deg, rgba(244,114,182,0.14) 0px, rgba(244,114,182,0.14) 2px, rgba(14,165,233,0.05) 2px, rgba(14,165,233,0.05) 8px), linear-gradient(142deg, rgba(241,245,249,0.9), rgba(226,232,240,0.9));
          border-color: rgba(167,139,250,0.35);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.24), 0 4px 12px rgba(109,40,217,0.16);
          animation: secretRareLines 8s linear infinite;
        }

        .portfolio-skill-card[data-column='left'] .portfolio-skill-card__overlay {
          left: 0;
          width: 50%;
          clip-path: polygon(0 0, 62% 0, 50% 100%, 0 100%);
          transform: skewX(-12deg);
          transform-origin: left center;
        }

        .portfolio-skill-card[data-column='right'] .portfolio-skill-card__overlay {
          right: 0;
          width: 50%;
          clip-path: polygon(38% 0, 100% 0, 100% 100%, 50% 100%);
          transform: skewX(12deg);
          transform-origin: right center;
        }

        .portfolio-skill-card[data-column='middle'] .portfolio-skill-card__overlay {
          inset: 0.5rem;
          border-radius: inherit;
          opacity: 0;
        }

        .portfolio-skill-card[data-column='middle']:hover .portfolio-skill-card__overlay {
          opacity: 1;
        }

        .portfolio-skill-card[data-rarity='ultimate'] .portfolio-skill-card__overlay {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), rgba(255,255,255,0.08), transparent);
          animation: ultimateSparkleSweep 3.5s ease-in-out infinite;
        }

        .portfolio-skill-card[data-rarity='ghost'] .portfolio-skill-card__overlay {
          background: linear-gradient(160deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03));
          opacity: 0.72;
        }

        .portfolio-skill-card[data-rarity='secret'] .portfolio-skill-card__overlay {
          background: linear-gradient(135deg, rgba(34,211,238,0.12), rgba(168,85,247,0.12) 42%, rgba(249,115,22,0.1) 72%, rgba(74,222,128,0.1));
          opacity: 0.9;
        }

        .portfolio-skill-card__icon {
          position: relative;
          z-index: 1;
          opacity: 0.98;
        }

        .portfolio-skill-card[data-rarity='ghost'] .portfolio-skill-card__icon {
          filter: drop-shadow(0 0 9px rgba(255,255,255,0.24)) saturate(1.25);
        }

        .portfolio-skill-card[data-rarity='ultimate'] .portfolio-skill-card__icon {
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.28)) saturate(1.08);
        }

        .portfolio-skill-card[data-rarity='secret'] .portfolio-skill-card__icon {
          filter: drop-shadow(0 0 6px rgba(167,139,250,0.28)) saturate(1.15);
        }
      `}</style>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" ref={skillsRef}>
            {rarityColumns.map((rarity, columnIndex) => {
              const columnSkills = skills.filter(skill => skill.rarity === rarity)
              const columnName = columnIndex === 0 ? 'left' : columnIndex === 1 ? 'middle' : 'right'

              return (
                <div key={rarity} className="flex flex-col gap-4">
                  {columnSkills.map(skill => {
                    const IconComponent = skill.icon
                    const iconColor =
                      skill.name === 'Next.js' ? (isDarkMode ? '#FFFFFF' : '#0f172a') : skill.color

                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        aria-label={skill.name}
                        data-rarity={skill.rarity}
                        data-column={columnName}
                        data-dark={isDarkMode}
                        className={`portfolio-skill-card group ${skillsVisible ? 'portfolio-skill-card--visible' : 'portfolio-skill-card--hidden'}`}
                      >
                        <span className="portfolio-skill-card__overlay" aria-hidden="true" />
                        <IconComponent
                          size={34}
                          color={iconColor}
                          className="portfolio-skill-card__icon"
                        />
                      </div>
                    )
                  })}
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
      className={`py-14 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
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
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 border ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-100 text-slate-900 border-slate-400 focus:ring-blue-500 focus:border-transparent'}`}
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
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 border ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-100 text-slate-900 border-slate-400 focus:ring-blue-500 focus:border-transparent'}`}
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
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 border ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-100 text-slate-900 border-slate-400 focus:ring-blue-500 focus:border-transparent'}`}
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
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 resize-none border ${isDarkMode ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500 focus:border-transparent' : 'bg-slate-100 text-slate-900 border-slate-400 focus:ring-blue-500 focus:border-transparent'}`}
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
    { name: 'Email', url: 'mailto:jovanminsel@gmail.com', ariaLabel: 'Send an email' },
    { name: 'GitHub', url: 'https://github.com/LowesPubAldi', ariaLabel: 'Visit GitHub profile' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/joshua-vanminsel-628910107/',
      ariaLabel: 'Visit LinkedIn profile',
    },
    { name: 'Resume', url: '/resume.pdf', ariaLabel: 'View resume' },
    {
      name: 'Schedule a Call',
      url: 'https://us06web.zoom.us/j/8507978105?pwd=D9Ulbf8s1gra7nl6QVW98hlWbOb5az.1',
      ariaLabel: 'Book a call via Zoom',
    },
  ]

  return (
    <footer
      className={`py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-200'}`}
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
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
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

// ===== Component: Scope Cursor =====

const ScopeCursor = ({ cursorMode }: { cursorMode: 'scope' | 'plasma' }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--portfolio-cursor-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--portfolio-cursor-y', `${e.clientY}px`)
      setIsVisible(true)
    }
    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element
      setIsHovering(!!target.closest('a, button'))
    }
    const handleLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const cursorColors =
    cursorMode === 'plasma'
      ? {
          base: isHovering ? '#67e8f9' : '#22d3ee',
          core: isHovering ? '#f8fafc' : '#cffafe',
          ring: isHovering ? '#f8fafc' : '#67e8f9',
        }
      : {
          base: isHovering ? '#22c55e' : '#2d6a4f',
          core: isHovering ? '#f8fafc' : '#86efac',
          ring: isHovering ? '#f8fafc' : '#22c55e',
        }

  const cursorClass =
    cursorMode === 'plasma' ? 'portfolio-scope-cursor--plasma' : 'portfolio-scope-cursor--scope'

  return (
    <>
      <style>{`
        :root {
          --portfolio-cursor-x: -100px;
          --portfolio-cursor-y: -100px;
        }

        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }

        .portfolio-scope-cursor {
          position: fixed;
          left: var(--portfolio-cursor-x);
          top: var(--portfolio-cursor-y);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .portfolio-scope-cursor--visible {
          opacity: 1;
        }

        .portfolio-scope-cursor__svg {
          transition: transform 0.15s ease, filter 0.15s ease;
        }

        .portfolio-scope-cursor--hover .portfolio-scope-cursor__svg {
          transform: scale(1.35);
          filter: var(--portfolio-cursor-glow);
        }

        .portfolio-scope-cursor:not(.portfolio-scope-cursor--hover) .portfolio-scope-cursor__svg {
          transform: scale(1);
          filter: var(--portfolio-cursor-glow);
        }

        .portfolio-scope-cursor__shape {
          transition: stroke 0.15s ease, fill 0.15s ease;
        }

        .portfolio-scope-cursor__inner-ring {
          transform: translate(-50%, -50%) scale(1);
          filter: drop-shadow(0 0 6px rgba(34,211,238,0.45));
        }

        .portfolio-scope-cursor__inner-core {
          transform: translate(-50%, -50%);
          filter: var(--portfolio-cursor-core-glow);
        }

        .portfolio-scope-cursor--hover .portfolio-scope-cursor__inner-ring {
          filter: var(--portfolio-cursor-ring-glow);
        }

        .portfolio-scope-cursor--hover .portfolio-scope-cursor__inner-core {
          filter: var(--portfolio-cursor-core-hover-glow);
        }

        .portfolio-scope-cursor--scope {
          --portfolio-cursor-glow: drop-shadow(0 0 5px rgba(45,106,79,0.8));
          --portfolio-cursor-core-glow: drop-shadow(0 0 5px rgba(45,106,79,0.8));
          --portfolio-cursor-ring-glow: drop-shadow(0 0 8px rgba(34,197,94,0.85));
          --portfolio-cursor-core-hover-glow: drop-shadow(0 0 10px rgba(255,255,255,0.65));
        }

        .portfolio-scope-cursor--plasma {
          --portfolio-cursor-glow: drop-shadow(0 0 6px rgba(34,211,238,0.8));
          --portfolio-cursor-core-glow: drop-shadow(0 0 6px rgba(103,232,249,0.85));
          --portfolio-cursor-ring-glow: drop-shadow(0 0 10px rgba(103,232,249,0.9));
          --portfolio-cursor-core-hover-glow: drop-shadow(0 0 10px rgba(255,255,255,0.7));
        }
      `}</style>
      <div
        className={`portfolio-scope-cursor ${cursorClass} ${isVisible ? 'portfolio-scope-cursor--visible' : ''} ${isHovering ? 'portfolio-scope-cursor--hover' : ''}`}
      >
        <svg width={40} height={40} viewBox="0 0 40 40" className="portfolio-scope-cursor__svg">
          {cursorMode === 'scope' ? (
            <>
              <circle
                cx="20"
                cy="20"
                r="9"
                fill="none"
                stroke={cursorColors.base}
                strokeWidth="1.5"
                className="portfolio-scope-cursor__shape"
              />
              <circle
                cx="20"
                cy="20"
                r="6.5"
                fill="none"
                stroke={cursorColors.ring}
                strokeWidth="1.25"
                className="portfolio-scope-cursor__shape portfolio-scope-cursor__inner-ring"
              />
              <circle
                cx="20"
                cy="20"
                r="1.5"
                fill={cursorColors.core}
                className="portfolio-scope-cursor__shape portfolio-scope-cursor__inner-core"
              />
              <line
                x1="20"
                y1="5"
                x2="20"
                y2="9"
                stroke={cursorColors.core}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="portfolio-scope-cursor__shape"
              />
              <line
                x1="20"
                y1="31"
                x2="20"
                y2="35"
                stroke={cursorColors.core}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="portfolio-scope-cursor__shape"
              />
              <line
                x1="5"
                y1="20"
                x2="9"
                y2="20"
                stroke={cursorColors.core}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="portfolio-scope-cursor__shape"
              />
              <line
                x1="31"
                y1="20"
                x2="35"
                y2="20"
                stroke={cursorColors.core}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="portfolio-scope-cursor__shape"
              />
            </>
          ) : (
            <>
              <polygon
                points="20,7 30,20 20,33 10,20"
                fill="none"
                stroke={cursorColors.base}
                strokeWidth="1.6"
                className="portfolio-scope-cursor__shape"
              />
              <polygon
                points="20,12.5 25,20 20,27.5 15,20"
                fill="none"
                stroke={cursorColors.ring}
                strokeWidth="1.2"
                className="portfolio-scope-cursor__shape"
              />
              <line
                x1="20"
                y1="5"
                x2="20"
                y2="9"
                stroke={cursorColors.core}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="portfolio-scope-cursor__shape"
              />
              <line
                x1="20"
                y1="31"
                x2="20"
                y2="35"
                stroke={cursorColors.core}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="portfolio-scope-cursor__shape"
              />
              <line
                x1="5"
                y1="20"
                x2="9"
                y2="20"
                stroke={cursorColors.core}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="portfolio-scope-cursor__shape"
              />
              <line
                x1="31"
                y1="20"
                x2="35"
                y2="20"
                stroke={cursorColors.core}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="portfolio-scope-cursor__shape"
              />
              <circle
                cx="20"
                cy="20"
                r="1.3"
                fill={cursorColors.core}
                className="portfolio-scope-cursor__shape portfolio-scope-cursor__inner-core"
              />
            </>
          )}
        </svg>
      </div>
    </>
  )
}

// ===== Main Portfolio Component =====

export default function Module5Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [cursorMode, setCursorMode] = useState<'scope' | 'plasma'>('scope')

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const toggleCursorMode = () => setCursorMode(prev => (prev === 'scope' ? 'plasma' : 'scope'))

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
      <ScopeCursor cursorMode={cursorMode} />
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        cursorMode={cursorMode}
        toggleCursorMode={toggleCursorMode}
      />
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
