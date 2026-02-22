// =====================================================
// script.js — versiune curată (FĂRĂ DUPLICĂRI)
// - Overlay limbă: apare la fiecare deschidere
// - Traduceri + formulare
// - Meniu mobil
// - Paralax + highlight meniu
// - Slider funcțional cu currentSlide(0..N-1) din HTML
// =====================================================

// ------------------------------
// SLIDER (GLOBAL) - necesar pentru onclick din HTML
// ------------------------------
let slideIndex = 1;

function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach((s) => (s.style.display = "none"));
  slides[slideIndex - 1].style.display = "block";
}

// HTML-ul tău cheamă currentSlide(0..4) => convertim la 1..N
function currentSlide(n) {
  slideIndex = n + 1;
  showSlides(slideIndex);
}

// Autoplay
setInterval(() => {
  slideIndex++;
  showSlides(slideIndex);
}, 5500);

// Init slider
document.addEventListener("DOMContentLoaded", () => showSlides(slideIndex));


// ------------------------------
// UI + TRADUCERI + OVERLAY + MENIU MOBIL
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const langSelect = document.getElementById("language-select");
  const elements = document.querySelectorAll("[data-lang]");

  const formRo = document.getElementById("confirmation-form-ro");
  const formCz = document.getElementById("confirmation-form-cz");
  const formDe = document.getElementById("confirmation-form-de");

  const overlay = document.getElementById("language-overlay");
  const langButtons = document.querySelectorAll(".lang-btn");

  // Defensive
  if (!langSelect || !elements.length) return;

  // Traduceri
  const translations = {
    ro: {},
    cz: {
      paragraph1:
        "Byli jednou dva cizinci, každý se svými sny, a přesto předurčeni k tomu, aby se jejich cesty setkaly. Z obyčejných rozhovorů se zrodil smích, porozumění a láska, která s každým dnem sílila.",
      paragraph2:
        "Jak se měnila roční období, měnili jsme se i my – nacházeli jsme sílu ve vzájemné laskavosti a den za dnem jsme se stále více zamilovávali. Společně jsme objevili, že pravá láska znamená podporu, trpělivost a radost ze sdílených okamžiků.",
      paragraph3:
        "S láskou vás zveme, abyste byli součástí našeho příběhu a prožili s námi jeden z nejdůležitějších dnů našeho života! ❤️",
      storyheading: "SPOLU JIŽ 4 ROKY",
      storymaintitle: "DVĚ SPŘÍZNĚNÉ DUŠE",
      storymaintitle2: "OSLAVÍME NAŠI LÁSKU",
      locationtitlecivileceremony: "OBČANSKÉ MANŽELSTVÍ",
      civileceremonydate: "06 ČERVEN 2026",
      civilceremonytime: "Čas: 16:00",
      civilceremonylocation: "Místo: Radnice Vatra Dornei",
      seeLocation: "Zobrazit polohu",
      partytime1: "Čas: 18:00",
      partylocation1: "Místo: Eventová hala Salon du Parc",
      churchlocationtitle: "NÁBOŽENSKÁ SVATBA",
      churchlocationdate: "25 ČERVENEC 2026",
      religiousceremonytime: "Čas: 16:00",
      religiousceremonylocation: "Místo: Katedrála „Sf. Anton de Padova”",
      partytime2: "Čas: 18:00",
      partylocation2: "Místo: Eventová hala AvaGarden",
      story2: "TĚŠÍME SE NA VÁS!"
    },
    de: {
      paragraph1:
        "Es waren einmal zwei Fremde, jeder mit seinen eigenen Träumen, und doch dazu bestimmt, dass sich ihre Wege kreuzen. Was als einfache Gespräche begann, wurde zu Lachen, Geschichten und einer immer stärkeren Verbindung, die wir nicht ignorieren konnten.",
      paragraph2:
        "Mit jedem Erfolg und jeder Herausforderung entdeckten wir, dass wahre Liebe Unterstützung, Geduld und die Freude an den gemeinsam erlebten, einfachen Momenten bedeutet.",
      paragraph3:
        "Mit viel Liebe laden wir euch ein, Teil unserer Geschichte zu sein und gemeinsam mit uns einen der schönsten Tage unseres Lebens zu feiern! ❤️",
      storyheading: "SEIT 4 JAHREN ZUSAMMEN",
      storymaintitle: "ZWEI SEELENVERWANDTE",
      storymaintitle2: "WIR FEIERN UNSERE LIEBE",
      locationtitlecivileceremony: "STANDESAMTLICHE TRAUUNG",
      civileceremonydate: "06 JUNI 2026",
      civilceremonytime: "Uhrzeit: 16:00",
      civilceremonylocation: "Ort: Rathaus Vatra Dornei",
      seeLocation: "Standort anzeigen",
      partytime1: "Uhrzeit: 18:00",
      partylocation1: "Ort: Eventhalle Salon du Parc",
      churchlocationtitle: "KIRCHLICHE TRAUUNG",
      churchlocationdate: "25 JULI 2026",
      religiousceremonytime: "Uhrzeit: 16:00",
      religiousceremonylocation: "Ort: Kathedrale „Sf. Anton de Padova”",
      partytime2: "Uhrzeit: 18:00",
      partylocation2: "Ort: Eventhalle AvaGarden",
      story2: "WIR FREUEN UNS AUF EUCH!"
    }
  };

  // Salvează textul RO original
  elements.forEach((el) => {
    const key = el.getAttribute("data-lang");
    translations.ro[key] = el.textContent.trim();
  });

  function applyTranslation(lang) {
    elements.forEach((el) => {
      const key = el.getAttribute("data-lang");
      if (lang === "ro") {
        if (translations.ro[key] != null) el.textContent = translations.ro[key];
      } else {
        const tr = translations[lang] && translations[lang][key];
        if (tr) el.textContent = tr;
      }
    });
    document.documentElement.lang = lang;
  }

  function updateForm(lang) {
    if (!formRo || !formCz || !formDe) return;
    formRo.style.display = lang === "ro" ? "block" : "none";
    formCz.style.display = lang === "cz" ? "block" : "none";
    formDe.style.display = lang === "de" ? "block" : "none";
  }

  function applyLanguageAndUI(lang) {
    if (!["ro", "cz", "de"].includes(lang)) lang = "ro";
    langSelect.value = lang;
    applyTranslation(lang);
    updateForm(lang);
  }

  // Dropdown limbă
  langSelect.addEventListener("change", function () {
    applyLanguageAndUI(this.value);
    if (overlay) {
      overlay.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });

  // Meniu mobil
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      const nav = document.querySelector(".nav-links");
      if (nav) nav.classList.toggle("show");
    });
  }

  // Overlay butoane
  if (overlay && langButtons.length) {
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        applyLanguageAndUI(lang);
        overlay.style.display = "none";
        document.body.classList.remove("modal-open");
      });
    });
  }

  // Forțăm overlay la fiecare deschidere
  applyLanguageAndUI("ro");
  if (overlay) {
    overlay.style.display = "flex";
    document.body.classList.add("modal-open");
  }
});

// iOS cache fix
window.addEventListener("pageshow", () => {
  const overlay = document.getElementById("language-overlay");
  if (overlay) {
    overlay.style.display = "flex";
    document.body.classList.add("modal-open");
  }
});


// ------------------------------
// PARALAX + HIGHLIGHT MENIU
// ------------------------------
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Paralax 1
  const img1 = document.querySelector(".parallax-img");
  const storySection = document.querySelector(".story");
  if (img1 && storySection) {
    const sectionTop = storySection.offsetTop;
    const sectionHeight = storySection.offsetHeight;
    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      const offset = (scrollY - sectionTop) * -0.5;
      img1.style.transform = `translateY(${offset}px)`;
    }
  }

  // Paralax 2
  const img2 = document.querySelector(".parallax-img2");
  const wwSection = document.querySelector(".when-where");
  if (img2 && wwSection) {
    const sectionTop = wwSection.offsetTop;
    const sectionHeight = wwSection.offsetHeight;
    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      const offset = (scrollY - sectionTop) * -1.0;
      img2.style.transform = `translateY(${offset}px)`;
    }
  }

  // Highlight meniu
  let current = "";
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
  });
});
