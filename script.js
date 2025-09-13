// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(".animate-fade-up").forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-background");
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add floating animation to benefit cards
document.querySelectorAll(".benefit-card").forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Add ripple effect to CTA buttons
document
  .querySelectorAll(".cta-button, .cta-button-secondary")
  .forEach((button) => {
    button.addEventListener("click", createRipple);
  });

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .cta-button, .cta-button-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 600ms linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 500);
  }
});

// Add counter animation for benefits
function animateCounters() {
  const counters = document.querySelectorAll(".benefit-card");

  counters.forEach((counter, index) => {
    const rect = counter.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible && !counter.classList.contains("animated")) {
      counter.classList.add("animated");

      // Add staggered animation delay
      setTimeout(() => {
        counter.style.animation = "fadeUp 0.8s ease forwards";
      }, index * 200);
    }
  });
}

// Observe counter elements
window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

// Add ice particle animation
function createIceParticle() {
  const particle = document.createElement("div");
  particle.style.position = "fixed";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "rgba(255, 255, 255, 0.8)";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "1000";
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = "-10px";
  particle.style.animation = "fall 3s linear forwards";

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 3000);
}

// Add CSS for falling particles
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create ice particles periodically
setInterval(createIceParticle, 2000);

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Add CSS for loading animation
  const loadingStyle = document.createElement("style");
  loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
  document.head.appendChild(loadingStyle);
});

// Add scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.position = "fixed";
  progressBar.style.top = "0";
  progressBar.style.left = "0";
  progressBar.style.width = "0%";
  progressBar.style.height = "3px";
  progressBar.style.background = "linear-gradient(90deg, #2563eb, #1d4ed8)";
  progressBar.style.zIndex = "9999";
  progressBar.style.transition = "width 0.1s ease";

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
}

// Initialize scroll progress
createScrollProgress();

// Add hover effects to contact items
document.querySelectorAll(".contact-item, .location-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateX(10px)";
    item.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateX(0)";
    item.style.boxShadow = "none";
  });
});

// Add click-to-call functionality
document.querySelectorAll(".contact-item").forEach((item) => {
  const phoneItem = item.querySelector("i.fa-phone");
  if (phoneItem) {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      window.location.href = "tel:855-408-4440";
    });
  }

  const emailItem = item.querySelector("i.fa-envelope");
  if (emailItem) {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      window.location.href = "mailto:ewadlington@ice2go.net";
    });
  }
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll(
  ".section-header, .benefits-grid, .contact-content"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  revealObserver.observe(el);
});

// Add dynamic background colors based on time of day
function updateBackgroundBasedOnTime() {
  const hour = new Date().getHours();
  const heroBackground = document.querySelector(".hero-background");

  if (hour >= 6 && hour < 12) {
    // Morning - lighter blue
    heroBackground.style.background =
      "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
  } else if (hour >= 12 && hour < 18) {
    // Afternoon - bright blue
    heroBackground.style.background =
      "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)";
  } else if (hour >= 18 && hour < 22) {
    // Evening - darker blue
    heroBackground.style.background =
      "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)";
  } else {
    // Night - dark blue with purple
    heroBackground.style.background =
      "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)";
  }
}

// Update background on load and every hour
updateBackgroundBasedOnTime();
setInterval(updateBackgroundBasedOnTime, 3600000); // Update every hour
