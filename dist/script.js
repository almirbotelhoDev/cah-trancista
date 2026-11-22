const SITE_CONFIG = {
  // Use apenas números, incluindo DDI e DDD. Exemplo: "5511999999999".
  whatsappNumber: "5511950506878",
  // Cole aqui o link completo do Instagram. Exemplo: "https://instagram.com/cahtrancista".
  instagramUrl: "https://www.instagram.com/cah_trancista09/",
};

const styleContent = {
  box: {
    tag: "Versátil · marcante",
    title: "Box braids",
    description:
      "Tranças soltas que permitem variar comprimento, espessura e finalização. Uma escolha forte para mudar o visual com liberdade.",
  },
  nago: {
    tag: "Desenho · precisão",
    title: "Nagô",
    description:
      "Tranças presas à raiz que criam linhas, curvas e composições únicas. O desenho pode ser discreto, geométrico ou cheio de atitude.",
  },
  boho: {
    tag: "Textura · movimento",
    title: "Boho braids",
    description:
      "Uma combinação de tranças e mechas soltas para um resultado leve, texturizado e cheio de movimento.",
  },
  twists: {
    tag: "Leveza · personalidade",
    title: "Twists",
    description:
      "Duas mechas torcidas formam um visual elegante e expressivo, com diferentes possibilidades de volume e comprimento.",
  },
};

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const heroMedia = document.querySelector("[data-hero-media]");

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
  menu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  menu?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 28);
    if (heroMedia && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const offset = Math.min(window.scrollY * 0.04, 26);
      heroMedia.style.transform = `scale(1.05) translateY(${offset}px)`;
    }
  },
  { passive: true },
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const styleSwitcher = document.querySelector("[data-style-switcher]");
const stylePanel = document.querySelector(".style-panel");
const styleTitle = document.querySelector("[data-style-title]");
const styleTag = document.querySelector("[data-style-tag]");
const styleDescription = document.querySelector("[data-style-description]");

styleSwitcher?.querySelectorAll("[data-style]").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedStyle = styleContent[button.dataset.style];
    if (!selectedStyle) return;

    styleSwitcher.querySelectorAll("[data-style]").forEach((item) => {
      item.setAttribute("aria-selected", String(item === button));
    });

    stylePanel?.classList.add("is-changing");
    window.setTimeout(() => {
      styleTag.textContent = selectedStyle.tag;
      styleTitle.textContent = selectedStyle.title;
      styleDescription.textContent = selectedStyle.description;
      stylePanel?.setAttribute("aria-labelledby", button.id);
      stylePanel?.classList.remove("is-changing");
    }, 170);
  });
});

const whatsappLink = document.querySelector("[data-whatsapp-link]");
const instagramLink = document.querySelector("[data-instagram-link]");
const contactStatus = document.querySelector("[data-contact-status]");

if (SITE_CONFIG.whatsappNumber) {
  const message = encodeURIComponent(
    "Oi, Cah! Vi seu site e gostaria de saber mais sobre os estilos e o agendamento.",
  );
  whatsappLink.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  whatsappLink.removeAttribute("aria-disabled");
} else {
  whatsappLink?.addEventListener("click", (event) => event.preventDefault());
}

if (SITE_CONFIG.instagramUrl) {
  instagramLink.href = SITE_CONFIG.instagramUrl;
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
  instagramLink.removeAttribute("aria-disabled");
} else {
  instagramLink?.addEventListener("click", (event) => event.preventDefault());
}

if (SITE_CONFIG.whatsappNumber || SITE_CONFIG.instagramUrl) {
  contactStatus?.remove();
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
