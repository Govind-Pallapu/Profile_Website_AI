/* ==========================================
   GOVIND PORTFOLIO - script.js
   Author: Govind | Java Full Stack Developer
   ========================================== */

'use strict';

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 600);
    }
  }, 1800);
});

/* ===== AOS INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  initTyped();
  initNavbar();
  initHamburger();
  initScrollProgress();
  initCursor();
  initParticles();
  initSkillBars();
  initCounters();
  initProjectFilter();
  initContactForm();
  initSmoothScroll();
  initActiveNavHighlight();
});

/* ===== TYPED.JS ===== */
function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el || typeof Typed === 'undefined') return;

  new Typed(el, {
    strings: [
      'Java Developer',
      'Full Stack Developer',
      'Backend Developer',
      'Spring Boot Learner',
      'Problem Solver',
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1800,
    loop: true,
    smartBackspace: true,
    showCursor: false,
  });
}

/* ===== NAVBAR: Scroll Behavior ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ===== HAMBURGER MENU ===== */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ===== SCROLL PROGRESS BAR ===== */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  }, { passive: true });
}

/* ===== CUSTOM CURSOR ===== */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Smooth follower with RAF
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, .service-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

/* ===== PARTICLE CANVAS ===== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '34, 211, 238' : '59, 130, 246';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  const count = Math.min(80, Math.floor(canvas.width / 20));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    particles.forEach((p, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animFrame = requestAnimationFrame(animate);
  }
  animate();
}

/* ===== SKILL BARS ANIMATION ===== */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '0';
        bar.style.width = `${width}%`;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ===== ANIMATED COUNTERS ===== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, 0, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    el.textContent = Math.round(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ===== PROJECT FILTER ===== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category || '';
        const show = filter === 'all' || category.includes(filter);

        if (show) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===== ACTIVE NAV HIGHLIGHT ON SCROLL ===== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-60px 0px -60px 0px',
  });

  sections.forEach(section => observer.observe(section));
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { el: document.getElementById('name'), errEl: document.getElementById('name-error'), validate: (v) => v.trim().length >= 2 ? '' : 'Name must be at least 2 characters.' },
    email: { el: document.getElementById('email'), errEl: document.getElementById('email-error'), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.' },
    subject: { el: document.getElementById('subject'), errEl: document.getElementById('subject-error'), validate: (v) => v.trim().length >= 3 ? '' : 'Subject must be at least 3 characters.' },
    message: { el: document.getElementById('message'), errEl: document.getElementById('message-error'), validate: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' },
  };

  // Real-time validation
  Object.values(fields).forEach(({ el, errEl, validate }) => {
    if (!el) return;
    el.addEventListener('input', () => {
      const error = validate(el.value);
      if (errEl) errEl.textContent = error;
      el.style.borderColor = error ? '#f87171' : '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.values(fields).forEach(({ el, errEl, validate }) => {
      if (!el) return;
      const error = validate(el.value);
      if (errEl) errEl.textContent = error;
      el.style.borderColor = error ? '#f87171' : '';
      if (error) isValid = false;
    });

    if (!isValid) return;

    // Simulate form submission
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const successMsg = document.getElementById('form-success');

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.classList.add('hidden');
    if (btnLoading) btnLoading.classList.remove('hidden');

    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.classList.remove('hidden');
      if (btnLoading) btnLoading.classList.add('hidden');
      if (successMsg) {
        successMsg.classList.remove('hidden');
        setTimeout(() => successMsg.classList.add('hidden'), 5000);
      }
      form.reset();
      // Clear border colors
      Object.values(fields).forEach(({ el }) => { if (el) el.style.borderColor = ''; });
    }, 2000);
  });
}

/* ===== BACK TO TOP BUTTON VISIBILITY ===== */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.style.opacity = window.scrollY > 400 ? '1' : '0';
  btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
}, { passive: true });

/* ===== HERO TEXT ANIMATION ON LOAD ===== */
window.addEventListener('load', () => {
  const heroElements = [
    '.hero-greeting',
    '.hero-name',
    '.hero-title',
    '.hero-bio',
    '.hero-cta',
    '.hero-socials',
  ];

  heroElements.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 150);
  });

  // Hero image fade in
  const imageWrap = document.querySelector('.hero-image-wrap');
  if (imageWrap) {
    imageWrap.style.opacity = '0';
    imageWrap.style.transform = 'scale(0.9)';
    imageWrap.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      imageWrap.style.opacity = '1';
      imageWrap.style.transform = 'scale(1)';
    }, 800);
  }
});

/* ===== GLOWING CARD MOUSE TRACKING ===== */
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.project-card, .service-card, .cert-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${px}%`);
      card.style.setProperty('--mouse-y', `${py}%`);
    }
  });
});

/* ===== SCROLL-TRIGGERED NAVBAR LOGO COLOR ===== */
window.addEventListener('scroll', () => {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;
  if (window.scrollY > 200) {
    logo.style.opacity = '0.9';
  } else {
    logo.style.opacity = '1';
  }
}, { passive: true });

/* ===== RESIZE HANDLER ===== */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    AOS.refresh();
  }, 200);
});
