// =====================================================
// script.js — versiune completă (overlay limbă la fiecare deschidere,
// traduceri + formulare, meniu mobil, paralax, highlight meniu, slider)
// =====================================================

// IMPORTANT:
// - NU folosim localStorage -> overlay apare de fiecare dată.
// - currentSlide() rămâne global pentru onclick-urile din HTML.
// - Codul e defensiv: dacă lipsește un element, nu “omoară” restul scriptului.

// -----------------------------------------------------
// 0) Slider (global) — ca să existe currentSlide() pentru HTML
// -----------------------------------------------------
let slideIndex = 1;

function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex - 1].style.display = "block";
}

// HTML-ul tău cheamă currentSlide(0..4)
function currentSlide(n) {
  showSlides((slideIndex = n + 1));
}

// Autoplay slider
setInterval(() => {
  slideIndex++;
  showSlides(slideIndex);
}, 5500);

// Inițializare slider după încărcare
document.addEventListener("DOMContentLoaded", () => showSlides(slideIndex));

// -----------------------------------------------------
// 1) UI + traduceri + overlay + meniu mobil
// -----------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const langSelect = document.getElementById("language-select");
  const elements = document.querySelectorAll("[data-lang]");

  const formRo = document.getElementById("confirmation-form-ro");
  const formCz = document.getElementById("confirmation-form-cz");
  const formDe = document.getElementById("confirmation-form-de");

  const overlay = document.getElementById("language-overlay");
  const langButtons = document.querySelectorAll(".lang-btn");

  // Dacă nu există selector de limbă sau elemente data-lang, ieșim fără să stricăm restul
  if (!langSelect || !elements.length) return;

  // ------------------------------
  // Traduceri
  // ------------------------------
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
      partylocation1: "Místo: Penzion Karmina",
      churchlocationtitle: "NÁBOŽENSKÁ SVATBA",
      churchlocationdate: "25 ČERVENEC 2026",
      religiousceremonytime: "Čas: 16:00",
      religiousceremonylocation: "Místo: Kostel „Sf. Anton de Padova”",
      partytime2: "Čas: 18:00",
      partylocation2: "Místo: AvaGarden",
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
      partylocation1: "Ort: Pension Karmina",
      churchlocationtitle: "KIRCHLICHE TRAUUNG",
      churchlocationdate: "25 JULI 2026",
      religiousceremonytime: "Uhrzeit: 16:00",
      religiousceremonylocation: "Ort: Kirche „Sf. Anton de Padova”",
      partytime2: "Uhrzeit: 18:00",
      partylocation2: "Ort: AvaGarden",
      story2: "WIR FREUEN UNS AUF EUCH!"
    }
  };

  // Salvează textul original RO din HTML (important ca să poți reveni corect)
  elements.forEach((el) => {
    const key = el.getAttribute("data-lang");
    translations.ro[key] = el.textContent.trim();
  });

  function applyTranslation(lang) {
    elements.forEach((el) => {
      const key = el.getAttribute("data-lang");
      const tr = translations[lang] && translations[lang][key];

      if (lang === "ro") {
        // revenim la original
        if (translations.ro[key] != null) el.textContent = translations.ro[key];
      } else {
        // setăm traducerea dacă există; dacă nu există, păstrăm textul curent
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

  // Dropdown din navbar
  langSelect.addEventListener("change", function () {
    applyLanguageAndUI(this.value);

    // dacă overlay e vizibil și user a ales din dropdown, îl închidem
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

  // Overlay: click pe butoane
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

  // IMPORTANT: la fiecare deschidere, arătăm overlay-ul (user trebuie să aleagă)
  // Inițializăm pagina în RO (ca bază), apoi cerem alegerea.
  applyLanguageAndUI("ro");
  if (overlay) {
    overlay.style.display = "flex";
    document.body.classList.add("modal-open");
  }
});

// iOS / WhatsApp / Messenger: pagina poate reveni din cache fără DOMContentLoaded
window.addEventListener("pageshow", () => {
  const overlay = document.getElementById("language-overlay");
  if (overlay) {
    overlay.style.display = "flex";
    document.body.classList.add("modal-open");
  }
});

// -----------------------------------------------------
// 2) Scroll: paralax + evidențiere meniu
// -----------------------------------------------------
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Paralax 1: imaginea din .parallax-container (clasa ta: .parallax-img)
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

  // Paralax 2: imaginea din .parallax-container2 (clasa ta: .parallax-img2)
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

  // Highlight meniu (secțiunea curentă)
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
