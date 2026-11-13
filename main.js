// Theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function currentTheme() {
  return root.dataset.theme === "dark" ? "dark" : "light";
}

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  particles.setColor();
});

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") closeMenu();
});

// Sticky nav border + active section tracking
const navbar = document.querySelector(".navbar");
const sections = [...document.querySelectorAll("main section[id], header[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 8);

  const offset = window.scrollY + window.innerHeight * 0.35;
  let activeId = null;
  for (const section of sections) {
    if (section.offsetTop <= offset) activeId = section.id;
  }
  for (const anchor of navAnchors) {
    anchor.classList.toggle("active", anchor.hash === `#${activeId}`);
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

// Typewriter for the hero subtitle
const typewriter = document.getElementById("typewriter");
const phrases = [
  "I turn industrial processes into visualizations people can read.",
  "Industrial engineer, data and teaching.",
  "Load curves, dashboards, predictive models.",
];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeLoop() {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    typewriter.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? 28 : 46;
    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 320;
    }
    setTimeout(tick, delay);
  }

  tick();
}

if (prefersReducedMotion) {
  typewriter.textContent = phrases[0];
} else {
  typeLoop();
}

// Particle field for the hero
const particles = (() => {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  const reduced = prefersReducedMotion;
  const density = 0.00008; // dots per square pixel
  const maxDots = 90;
  const linkDistance = 130;

  let dots = [];
  let width = 0;
  let height = 0;
  let linkColor = "10, 154, 181";
  let dotColor = "232, 169, 106";
  let frame = null;

  function setColor() {
    const style = getComputedStyle(document.documentElement);
    const link = style.getPropertyValue("--particle-link-rgb").trim();
    const dot = style.getPropertyValue("--particle-dot-rgb").trim();
    if (link) linkColor = link;
    if (dot) dotColor = dot;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(maxDots, Math.round(width * height * density));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 1 + Math.random() * 1.6,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const dot of dots) {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < 0 || dot.x > width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > height) dot.vy *= -1;
    }

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < linkDistance) {
          ctx.strokeStyle = `rgba(${linkColor}, ${0.34 * (1 - distance / linkDistance)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }

    for (const dot of dots) {
      ctx.fillStyle = `rgba(${dotColor}, 0.65)`;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    draw();
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (frame !== null || reduced) return;
    loop();
  }

  function stop() {
    if (frame === null) return;
    cancelAnimationFrame(frame);
    frame = null;
  }

  setColor();
  resize();
  if (reduced) {
    draw(); // one static frame
  } else {
    start();
  }

  window.addEventListener("resize", () => {
    resize();
    if (reduced) draw();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  return { setColor };
})();
