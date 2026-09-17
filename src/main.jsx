import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Download, Menu, X,
  Search, Check, Code2, Smartphone, Cpu, ShieldCheck, Zap, Layers, Sparkles, FileText, ExternalLink
} from 'lucide-react';
import './styles.css';

// --- TYPEWRITER COMPONENT ---
const titles = [
  "Senior iOS Developer.",
  "SwiftUI & Swift Architect.",
  "Core Bluetooth & BLE Specialist.",
  "VoIP & Video Stream Engineer."
];

function Typewriter() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIdx === titles[titleIdx].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIdx === 0 && reverse) {
      setReverse(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIdx((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIdx, titleIdx, reverse]);

  const currentText = titles[titleIdx].substring(0, subIdx);
  const isHighlighted = titleIdx !== 0;

  return (
    <span className="typewriterText">
      {isHighlighted ? <em>{currentText}</em> : currentText}
      <span className="typewriterCursor" />
    </span>
  );
}

// --- PARTICLE CANVAS COMPONENT ---
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 122, 255, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 94, 54, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvasBg" />;
}

// --- DATA DEFINITIONS ---

const skillCategories = [
  { id: 'all', label: 'All Tech' },
  { id: 'core', label: 'Core iOS & Swift' },
  { id: 'arch', label: 'Architecture & UI' },
  { id: 'hardware', label: 'Hardware & SDKs' },
  { id: 'voip', label: 'VoIP & Real-Time' },
  { id: 'cicd', label: 'CI/CD & Testing' }
];

const skills = [
  { name: 'Swift', cat: 'core' },
  { name: 'SwiftUI', cat: 'core' },
  { name: 'UIKit', cat: 'core' },
  { name: 'MVVM', cat: 'arch' },
  { name: 'Clean Architecture', cat: 'arch' },
  { name: 'SOLID Principles', cat: 'arch' },
  { name: 'Swift Concurrency', cat: 'core' },
  { name: 'Async / Await', cat: 'core' },
  { name: 'Actors & Concurrency', cat: 'core' },
  { name: 'Combine Framework', cat: 'core' },
  { name: 'GCD / Multithreading', cat: 'core' },
  { name: 'Core Data', cat: 'hardware' },
  { name: 'Core Bluetooth (BLE)', cat: 'hardware' },
  { name: 'AVFoundation', cat: 'hardware' },
  { name: 'Linphone VoIP (SIP)', cat: 'voip' },
  { name: 'Agora Video RTC', cat: 'voip' },
  { name: 'Socket.io', cat: 'voip' },
  { name: 'Firebase', cat: 'voip' },
  { name: 'RESTful APIs / URLSession', cat: 'arch' },
  { name: 'Keychain Services', cat: 'hardware' },
  { name: 'SQLite', cat: 'hardware' },
  { name: 'XCTest & XCUITest', cat: 'cicd' },
  { name: 'Fastlane Automation', cat: 'cicd' },
  { name: 'TestFlight & App Store', cat: 'cicd' },
  { name: 'Swift Package Manager', cat: 'cicd' },
  { name: 'Git & GitHub', cat: 'cicd' }
];

const projects = [
  {
    id: 'gettrx',
    name: 'GETTRX Payment System',
    tag: 'Hardware & Payments',
    description: 'Enterprise iOS application interfacing with GETTRX hardware devices via Core Bluetooth for secure point-of-sale transactions and encrypted payload transfer.',
    stack: ['Swift', 'Core Bluetooth', 'Firebase', 'Keychain', 'SQLite'],
    role: 'Hardware Integration & Core UI Lead',
    team: '2 Developers',
    details: [
      'Architected Core Bluetooth auto-discovery, custom hardware handshake protocol, and connection state management.',
      'Implemented secure encryption token storage using iOS Keychain Services and hardware pin verification.',
      'Built local transaction event logging and offline payload queueing with SQLite fallback.',
      'Designed responsive point-of-sale checkout UI optimized for iPad and iPhone screens.'
    ]
  },
  {
    id: 'jamvee',
    name: 'Jamvee VoIP Platform',
    tag: 'VoIP & Messaging',
    description: 'SIP-based VoIP calling platform integrated with Linphone SDK supporting high-definition audio/video calls, conferencing, mute, hold, and real-time socket chat.',
    stack: ['Swift', 'Linphone VoIP', 'Socket.io', 'PushKit', 'AVFoundation'],
    role: 'End-to-End iOS Developer',
    team: '4 Developers',
    details: [
      'Integrated Linphone C-core library into native Swift using Objective-C bridging headers.',
      'Implemented complete call lifecycle: SIP registration, audio route selection, call hold/transfer, and DTMF tones.',
      'Configured PushKit VoIP notifications for instant incoming call wakeups in background state.',
      'Engineered real-time socket messaging pipeline with automatic reconnect and message delivery status.'
    ]
  },
  {
    id: 'yuonair',
    name: 'Yuonair Live Stream',
    tag: 'Broadcasting & RTC',
    description: 'High-throughput video broadcasting iOS app featuring real-time stream publishing, subscriber live chat, watch history recommendations, and audio background mode.',
    stack: ['Swift', 'Agora RTC SDK', 'AVFoundation', 'Firebase', 'Combine'],
    role: 'Lead Mobile Developer',
    team: '2 Developers',
    details: [
      'Integrated Agora Live Stream SDK for sub-second low latency video broadcasting to thousands of concurrent viewers.',
      'Custom camera controls, orientation locking, and beauty filter pipelines using AVFoundation.',
      'Built live subscriber comment stream with socket event batching to maintain 60 FPS UI performance.',
      'Optimized memory consumption and prevented memory leaks during continuous streaming sessions.'
    ]
  },
  {
    id: 'feablerner',
    name: 'Feablerner LMS',
    tag: 'Educational Tech',
    description: 'Digital learning platform focused on smooth onboarding, offline media caching, interactive video courses, and student progress tracking.',
    stack: ['Swift', 'SwiftUI', 'Core Data', 'Combine', 'RESTful API'],
    role: 'Full Lifecycle Developer',
    team: '5 Developers',
    details: [
      'Developed native SwiftUI interfaces leveraging modern declarational patterns and custom view modifiers.',
      'Built Core Data background synchronization manager for offline lesson downloading and progress sync.',
      'Integrated video playback engine with progress bookmarking and automatic quality adjustments.'
    ]
  }
];

const experience = [
  {
    company: 'Sanvii Techmet Pvt. Ltd',
    role: 'Senior iOS Developer',
    period: '10/2025 – Present',
    location: 'Indore, India',
    bullets: [
      'Lead mobile application development, designing scalable architecture and modern UI/UX patterns in Swift and SwiftUI.',
      'Optimize application code, memory management, and leak detection to improve execution speed and responsiveness.',
      'Prepare RESTful API specifications with sample payloads and coordinate closely with backend engineering.',
      'Mentor junior developers, conduct strict code reviews, and implement automated testing using XCTest.',
      'Manage CI/CD build releases using Fastlane, TestFlight, and App Store Connect.'
    ],
    stack: ['Swift', 'SwiftUI', 'MVVM', 'Fastlane', 'XCTest']
  },
  {
    company: 'Coprpod Digital India Pvt. Ltd.',
    role: 'Senior iOS Developer',
    period: '07/2024 – 01/2025',
    location: 'Indore, India',
    bullets: [
      'Developed native iOS applications with polished interfaces using UIKit, Auto Layout, and Storyboards/XIBs.',
      'Integrated third-party APIs using URLSession and JSON Codable with full production crash debugging.',
      'Managed independent module development and published production releases to the App Store.'
    ],
    stack: ['Swift', 'UIKit', 'URLSession', 'App Store Connect']
  },
  {
    company: 'Icreon Communications Pvt. Ltd.',
    role: 'Senior iOS Developer',
    period: '06/2025 – 08/2025',
    location: 'Indore, India',
    bullets: [
      'Led end-to-end native iOS development using MVVM and Clean Architecture principles.',
      'Refactored legacy codebases to improve app stability, memory footprint, and modularity.',
      'Handled complex integrations including real-time video, VoIP, push notifications, and analytics.'
    ],
    stack: ['Swift', 'Clean Architecture', 'VoIP', 'Agora SDK']
  },
  {
    company: 'Logical Softtech Pvt. Ltd',
    role: 'Senior iOS Developer',
    period: '04/2021 – 03/2024',
    location: 'Indore, India',
    bullets: [
      'Developed native iOS applications using UIKit, Auto Layout, and custom UI components.',
      'Participated in requirements gathering, client communication, and accurate project estimation.',
      'Managed independent project modules and full App Store publication lifecycle.'
    ],
    stack: ['Swift', 'UIKit', 'Core Data', 'Firebase']
  },
  {
    company: 'The OneInfotech',
    role: 'Junior iOS Developer',
    period: '03/2019 – 02/2021',
    location: 'Indore, India',
    bullets: [
      'Developed native iOS applications with intuitive UI/UX for retail and consumer clients.',
      'Handled client requirement mapping, technical estimates, and framework integrations.'
    ],
    stack: ['Swift', 'UIKit', 'JSON Codable', 'Git']
  }
];

const codeSnippets = {
  developer: `// Subhash.swift
import SwiftUI
import Combine

struct iOSArchitect {
    let name = "Subhash Jaiswar"
    let role = "Senior iOS Developer"
    let experience = "6+ Years"
    
    var coreStack: [String] {
        return ["Swift", "SwiftUI", "UIKit", "MVVM", "Clean Architecture"]
    }
    
    var specializations: [String] {
        return [
            "Core Bluetooth Payment SDKs",
            "Linphone VoIP & SIP Integration",
            "Agora Video Live Streaming",
            "App Store Publishing & Fastlane"
        ]
    }
}`,
  architecture: `// Architecture.swift
import Foundation
import Combine

final class PaymentEngine: ObservableObject {
    @Published private(set) var state: ConnectionState = .idle
    private let bluetoothManager: BLEManagerProtocol
    private var cancellables = Set<AnyCancellable>()

    init(bluetoothManager: BLEManagerProtocol) {
        self.bluetoothManager = bluetoothManager
        bindBluetoothEvents()
    }

    func initiateHardwareHandshake() async throws {
        state = .connecting
        try await bluetoothManager.discoverAndPair()
        state = .connected
    }
}`
};

// --- MAIN APP COMPONENT ---

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);
  const [activeCodeTab, setActiveCodeTab] = useState('developer');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // SCROLL REVEAL OBSERVER HOOK
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeCategory, searchQuery]);

  const closeNav = () => setNavOpen(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    triggerToast(`Copied ${label} to clipboard!`);
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.cat === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    triggerToast('Thank you! Your message has been sent.');
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  // 3D MAGNETIC TILT HOVER HANDLER FOR PROFILE CARD
  const profileCardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = profileCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateY(${x / 18}deg) rotateX(${-y / 18}deg)`;
  };
  const handleMouseLeave = () => {
    const card = profileCardRef.current;
    if (card) card.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <div>
      <ParticleCanvas />
      <div className="bgGlow" />
      <div className="gridPattern" />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="toast">
          <Check size={18} /> {toastMessage}
        </div>
      )}

      {/* NAVBAR */}
      <header className="nav">
        <a className="brand" href="#home" onClick={closeNav}>
          <div className="brandLogo">SJ</div>
          Subhash Jaiswar<span>.ios</span>
        </a>

        <button className="menuBtn" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle Navigation">
          {navOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`navlinks ${navOpen ? 'open' : ''}`}>
          <a href="#about" onClick={closeNav}>About</a>
          <a href="#skills" onClick={closeNav}>Toolkit</a>
          <a href="#projects" onClick={closeNav}>Projects</a>
          <a href="#experience" onClick={closeNav}>Experience</a>
          <a href="#contact" onClick={closeNav}>Contact</a>

          <div className="navActions">
            <button className="btnNavResume" onClick={() => { setShowResumeModal(true); closeNav(); }}>
              <FileText size={15} /> CV Preview
            </button>
            <a className="btnNavCta" href="#contact" onClick={closeNav}>
              Let's Talk <ArrowUpRight size={16} />
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="section hero">
          <div className="heroCopy reveal">
            <div className="eyebrow">
              <span className="dot"></span> Available for Senior iOS Roles
            </div>
            <h1>
              I'm Subhash<br />
              <Typewriter />
            </h1>
            <p className="heroSubtitle">
              Specialized in building high-performance native iOS applications with Swift, SwiftUI, and UIKit — from Clean Architecture and hardware Bluetooth integration to VoIP and App Store delivery.
            </p>

            <div className="heroActions">
              <a className="btnPrimary" href="#projects">
                Explore Projects <ArrowUpRight size={18} />
              </a>
              <button className="btnSecondary" onClick={() => copyToClipboard('subhashjaiswar12@gmail.com', 'email')}>
                <Mail size={16} /> Quick Email Copy
              </button>
            </div>

            <div className="heroStats">
              <div className="statItem">
                <h4>6<span>+</span></h4>
                <p>Years Exp</p>
              </div>
              <div className="statItem">
                <h4>100<span>%</span></h4>
                <p>Native Swift</p>
              </div>
              <div className="statItem">
                <h4>5<span>+</span></h4>
                <p>Apps Published</p>
              </div>
            </div>
          </div>

          {/* HERO VISUAL PROFILE COLUMN */}
          <div className="heroVisual reveal delay-1">
            <div
              className="profileCard"
              ref={profileCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="profileImageWrapper">
                <img
                  src="/profile.png"
                  alt="Subhash Jaiswar - Senior iOS Developer"
                  className="profileImg"
                />
              </div>

              <div className="badgeFloating topRight">
                <Sparkles size={16} />
                <div>
                  <div>SwiftUI & Swift</div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '11px' }}>iOS Architecture</small>
                </div>
              </div>

              <div className="badgeFloating bottomLeft">
                <ShieldCheck size={16} />
                <div>
                  <div>Core Bluetooth & VoIP</div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Hardware / Linphone</small>
                </div>
              </div>
            </div>

            {/* INTERACTIVE CODE WIDGET */}
            <div className="codeCard">
              <div className="codeHeader">
                <div className="codeDots">
                  <span></span><span></span><span></span>
                </div>
                <div className="codeTabs">
                  <button
                    className={`codeTab ${activeCodeTab === 'developer' ? 'active' : ''}`}
                    onClick={() => setActiveCodeTab('developer')}
                  >
                    Subhash.swift
                  </button>
                  <button
                    className={`codeTab ${activeCodeTab === 'architecture' ? 'active' : ''}`}
                    onClick={() => setActiveCodeTab('architecture')}
                  >
                    Architecture.swift
                  </button>
                </div>
              </div>
              <pre className="codeBody">
                <code>{codeSnippets[activeCodeTab]}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section">
          <div className="sectionLabel reveal">01 / ABOUT ME</div>
          <div className="aboutGrid">
            <div className="reveal delay-1">
              <h2 className="sectionTitle">
                Architecting <em>scalable, resilient & fast</em> iOS software.
              </h2>
            </div>
            <div className="reveal delay-2">
              <p className="aboutLead">
                With over 6 years of focused native iOS engineering experience, I transform complex business specifications into clean, fluid mobile experiences.
              </p>
              <p className="aboutBody">
                My career spans hardware Bluetooth integration for payment systems, real-time SIP VoIP audio/video calls using Linphone, live video streaming with Agora RTC, and decoupled Clean Architectures. I manage the complete SDLC from concept and API specification to App Store deployment and maintenance.
              </p>

              <div className="aboutHighlights">
                <div className="aboutFeature">
                  <div className="aboutFeatureIcon"><Layers size={20} /></div>
                  <h4>Clean Architecture</h4>
                  <p>MVVM, SOLID principles, Swift Concurrency & modularized codebase structures.</p>
                </div>
                <div className="aboutFeature">
                  <div className="aboutFeatureIcon"><Cpu size={20} /></div>
                  <h4>Hardware & Hardware BLE</h4>
                  <p>Core Bluetooth SDK handshakes, packet parsing, and SQLite caching.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS TOOLKIT SECTION */}
        <section id="skills" className="skillsSection">
          <div className="skillsContainer">
            <div className="sectionLabel reveal">02 / TECHNICAL TOOLKIT</div>
            <div className="sectionHead reveal delay-1">
              <div>
                <h2>Mastered <em>Technologies.</em></h2>
                <p style={{ marginTop: '8px' }}>Categorized breakdown of technical skills acquired over 6+ years in iOS development.</p>
              </div>
            </div>

            <div className="skillsControls reveal delay-2">
              <div className="searchBox">
                <Search size={18} />
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Search skills (e.g., SwiftUI, Combine, BLE)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="skillTabs">
                {skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`skillTab ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="skillsGrid">
              {filteredSkills.map((skill, idx) => (
                <div className={`skillCard reveal delay-${(idx % 4) + 1}`} key={skill.name}>
                  <div className="skillDot" />
                  <span className="skillName">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section">
          <div className="sectionLabel reveal">03 / FEATURED WORK</div>
          <div className="sectionHead reveal delay-1">
            <div>
              <h2>Key Production <em>Projects.</em></h2>
              <p style={{ marginTop: '8px' }}>Real-world applications built for payments, VoIP communications, live streaming, and education.</p>
            </div>
          </div>

          <div className="projectGrid">
            {projects.map((project, idx) => (
              <div className={`projectCard reveal delay-${idx + 1}`} key={project.id}>
                <div>
                  <div className="projectTop">
                    <span className="projectTag">{project.tag}</span>
                    <span className="projectTeam">{project.team}</span>
                  </div>
                  <h3 className="projectTitle">{project.name}</h3>
                  <p className="projectDesc">{project.description}</p>
                </div>

                <div>
                  <div className="projectStack">
                    {project.stack.map((tech) => (
                      <span className="stackBadge" key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="projectFooter">
                    <span className="projectRole">{project.role}</span>
                    <button
                      className="btnProjectDetails"
                      onClick={() => setActiveProject(project)}
                    >
                      View Architecture <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAREER TIMELINE SECTION */}
        <section id="experience" className="section" style={{ paddingTop: '40px' }}>
          <div className="sectionLabel reveal">04 / CAREER JOURNEY</div>
          <div className="sectionHead reveal delay-1">
            <div>
              <h2>Professional <em>Experience.</em></h2>
              <p style={{ marginTop: '8px' }}>Track record of leadership, mobile development, and architecture across tech companies.</p>
            </div>
          </div>

          <div className="timeline">
            {experience.map((job, idx) => (
              <div className={`timelineCard reveal delay-${(idx % 3) + 1}`} key={idx}>
                <div className="timelineHeader">
                  <div>
                    <h3 className="timelineCompany">{job.company}</h3>
                    <div className="timelineRole">{job.role} • {job.location}</div>
                  </div>
                  <div className="timelinePeriod">{job.period}</div>
                </div>

                <ul className="timelineBullets">
                  {job.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>

                <div className="projectStack" style={{ marginTop: '20px', marginBottom: 0 }}>
                  {job.stack.map((st) => (
                    <span className="stackBadge" key={st}>{st}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="section" style={{ paddingTop: '20px' }}>
          <div className="sectionLabel reveal">05 / EDUCATION</div>
          <div className="eduGrid">
            <div className="eduCard reveal delay-1">
              <span className="eduPeriod">2012 – 2015</span>
              <h3 className="eduDegree">Master of Computer Application (MCA)</h3>
              <p className="eduCollege">SGSITS College, Indore • RGPV University</p>
            </div>
            <div className="eduCard reveal delay-2">
              <span className="eduPeriod">2009 – 2012</span>
              <h3 className="eduDegree">Bachelor of Computer Application (BCA)</h3>
              <p className="eduCollege">Srishti Computer Education, Betul (M.P.)</p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <div className="contactGrid reveal">
            <div className="contactInfo">
              <div className="sectionLabel">06 / GET IN TOUCH</div>
              <h2>Let's build extraordinary <em>iOS apps.</em></h2>
              <p>Available for senior iOS roles, contract projects, and architecture consulting.</p>

              <div className="contactButtons">
                <button className="btnContactCopy" onClick={() => copyToClipboard('subhashjaiswar12@gmail.com', 'Email')}>
                  <span><Mail size={18} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> subhashjaiswar12@gmail.com</span>
                  <ExternalLink size={16} />
                </button>
                <button className="btnContactCopy" onClick={() => copyToClipboard('+918982694106', 'Phone')}>
                  <span><Phone size={18} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> +91 8982694106</span>
                  <ExternalLink size={16} />
                </button>
                <div className="btnContactCopy" style={{ cursor: 'default' }}>
                  <span><MapPin size={18} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Indore, Madhya Pradesh, India</span>
                </div>
              </div>
            </div>

            <div>
              <form className="contactForm" onSubmit={handleContactSubmit}>
                <div className="formGroup">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="formGroup">
                  <input type="email" placeholder="Your Email Address" required />
                </div>
                <div className="formGroup">
                  <textarea placeholder="Tell me about your app project or role opportunity..." required></textarea>
                </div>
                <button type="submit" className="btnPrimary" style={{ width: '100%', justifyContent: 'center' }}>
                  {formSubmitted ? 'Message Sent!' : 'Send Message'} <ArrowUpRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* PROJECT DETAILS MODAL */}
      {activeProject && (
        <div className="modalBackdrop" onClick={() => setActiveProject(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalCloseBtn" onClick={() => setActiveProject(null)}>
              <X size={20} />
            </button>
            <div className="modalTag">{activeProject.tag} • {activeProject.team}</div>
            <h2 className="modalTitle">{activeProject.name}</h2>
            <p className="aboutBody">{activeProject.description}</p>

            <div className="modalSectionTitle">Role & Impact</div>
            <p style={{ color: 'var(--text-main)', fontStyle: 'italic' }}>{activeProject.role}</p>

            <div className="modalSectionTitle">Key Technical Highlights</div>
            <ul className="modalList">
              {activeProject.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>

            <div className="modalSectionTitle">Technology Stack</div>
            <div className="projectStack">
              {activeProject.stack.map((s) => (
                <span className="stackBadge" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RESUME PREVIEW MODAL */}
      {showResumeModal && (
        <div className="modalBackdrop" onClick={() => setShowResumeModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalCloseBtn" onClick={() => setShowResumeModal(false)}>
              <X size={20} />
            </button>
            <div className="modalTag">Curriculum Vitae</div>
            <h2 className="modalTitle">Subhash Jaiswar</h2>
            <p style={{ color: 'var(--swift)', fontWeight: '700', marginBottom: '20px' }}>Senior iOS Developer • 6+ Years Experience</p>

            <div className="modalSectionTitle">Professional Summary</div>
            <p className="aboutBody" style={{ fontSize: '13.5px' }}>
              Experienced Senior iOS Developer with 6+ years of expertise in designing, developing, and maintaining native iOS applications using Swift and SwiftUI. Skilled in Clean Architecture, REST APIs, Core Data, Core Bluetooth, VoIP, and video streaming.
            </p>

            <div className="modalSectionTitle">Key Strengths</div>
            <ul className="modalList" style={{ fontSize: '13.5px' }}>
              <li>Native iOS Development in Swift, SwiftUI & UIKit</li>
              <li>Core Bluetooth Hardware SDK Handshakes & Encryption</li>
              <li>Linphone SIP VoIP Calling & Agora RTC Streaming</li>
              <li>Clean Architecture, MVVM, Swift Concurrency, Combine</li>
              <li>App Store Connect & Fastlane CI/CD Automation</li>
            </ul>

            <div style={{ marginTop: '30px', display: 'flex', gap: '12px' }}>
              <button className="btnPrimary" onClick={() => window.print()}>
                Print / Save PDF <Download size={16} />
              </button>
              <button className="btnSecondary" onClick={() => copyToClipboard('subhashjaiswar12@gmail.com', 'Email')}>
                Contact Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div>© {new Date().getFullYear()} Subhash Jaiswar. All rights reserved.</div>
        <div className="footerSocials">
          <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={18} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
