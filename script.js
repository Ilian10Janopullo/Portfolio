const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(item => observer.observe(item));

const filters = document.querySelectorAll(".pill");
const skillCards = document.querySelectorAll(".skill-card");
const projectCards = document.querySelectorAll(".project-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    const target = filter.dataset.filter;

    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    skillCards.forEach(card => {
      const active = target === "all" || card.dataset.tags.includes(target);
      card.classList.toggle("active", active);
      card.style.opacity = active ? "1" : "0.35";
      card.style.transform = active ? "translateY(-3px)" : "none";
    });

    projectCards.forEach(card => {
      const show = target === "all" || card.dataset.tags.includes(target);
      card.style.display = show ? "grid" : "none";
    });
  });
});

const toggles = document.querySelectorAll(".toggle");
toggles.forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const detail = document.getElementById(targetId);
    const nowActive = !detail.classList.contains("active");
    detail.classList.toggle("active", nowActive);
    button.textContent = nowActive ? "Hide details" : "See details";
  });
});

// Mobile nav toggle
const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav a");

if (menuToggle && nav) {
  const closeMenu = () => {
    nav.classList.remove("menu-open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach(link => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });
}

// Close menu when GitHub CTA is tapped on mobile
const githubCta = document.querySelector(".github-cta");
if (githubCta && nav) {
  githubCta.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 960px)").matches) {
      nav.classList.remove("menu-open");
      if (menuToggle) {
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
}
