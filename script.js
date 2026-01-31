document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    const langSelect = document.getElementById("language-select");
    const formRo = document.getElementById('confirmation-form-ro');
    const formCz = document.getElementById('confirmation-form-cz');
    const formDe = document.getElementById("confirmation-form-de");
    const elements = document.querySelectorAll("[data-lang]");
  
    // Traducerea site-ului
    const translations = {
      ro: {},
      cz: {
        paragraph1: "Byli jednou dva cizinci, každý se svými sny, a přesto předurčeni k tomu, aby se jejich cesty setkaly. Z obyčejných rozhovorů se zrodil smích, porozumění a láska, která s každým dnem sílila.",
        paragraph2: "Jak se měnila roční období, měnili jsme se i my – nacházeli jsme sílu ve vzájemné laskavosti a den za dnem jsme se stále více zamilovávali. Společně jsme objevili, že pravá láska znamená podporu, trpělivost a radost ze sdílených okamžiků.",
        paragraph3: "S láskou vás zveme, abyste byli součástí našeho příběhu a prožili s námi jeden z nejdůležitějších dnů našeho života! ❤️",
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
        churchlocationdate: "25 ČERVENEC 2025",
        religiousceremonytime: "Čas: 16:00",
        religiousceremonylocation: "Místo: Kostel „Sf. Anton de Padova”",
        partytime2: "Čas: 18:00",
        partylocation2: "Místo: AvaGarden",
        story2: "TĚŠÍME SE NA VÁS!"
      },
      de: { // NOU
      paragraph1: "Es waren einmal zwei Fremde, jeder mit seinen eigenen Träumen, und doch dazu bestimmt, dass sich ihre Wege kreuzen. Was als einfache Gespräche begann, wurde zu Lachen, Geschichten und einer immer stärkeren Verbindung, die wir nicht ignorieren konnten.",
      paragraph2: "Mit jedem Erfolg und jeder Herausforderung entdeckten wir, dass wahre Liebe Unterstützung, Geduld und die Freude an den gemeinsam erlebten, einfachen Momenten bedeutet.",
      paragraph3: "Mit viel Liebe laden wir euch ein, Teil unserer Geschichte zu sein und gemeinsam mit uns einen der schönsten Tage unseres Lebens zu feiern! ❤️",
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
  
    // Salvarea textului original din elementele marcate data-lang in index
    elements.forEach(el => {
      const key = el.getAttribute("data-lang");
      translations.ro[key] = el.textContent.trim();
    });
  
    // Functie de traducerea site-ului
    function applyTranslation(lang) {
      elements.forEach(el => {
        const key = el.getAttribute("data-lang");
        const translation = translations[lang][key];
        if (translation) {
          if (el.tagName.toLowerCase() === "title") {
            document.title = translation;
          } else {
            el.textContent = translation;
          }
        }
      });
    }
  
    // Functie care afiseaza formularul de confirmare in functie de limba selectata
    function updateForm() {
      const lang = langSelect.value;
      if (lang === 'ro') {
        formRo.style.display = 'block';
        formCz.style.display = 'none';
        formDe.style.display = 'none';
      } else if (lang === 'cz') {
        formRo.style.display = 'none';
        formDe.style.display = 'none';
        formCz.style.display = 'block';
      }else if (lang === 'de') {
        formRo.style.display = 'none';
        formCz.style.display = 'none';
        formDe.style.display = 'block';
      }
    }
  
    // Meniul pentru varianta mobilă a site-ului
    document.querySelector('.menu-toggle').addEventListener('click', function () {
      document.querySelector('.nav-links').classList.toggle('show');
    });
  
    // Actualizarea traducerii / formularelor de fiecare data cand se schimba limba
    langSelect.addEventListener("change", function () {
      applyTranslation(this.value);
      updateForm();
    });
  
    // Initializarea site-ului la deschidere / refresh
    applyTranslation(langSelect.value);
    updateForm();
  });
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
  
    // Efectul de paralaxa pentru prima imagine
    const img1 = document.querySelector('.parallax-img');
    const storySection = document.querySelector('.story');
    if (img1 && storySection) {
      const sectionTop = storySection.offsetTop;
      const sectionHeight = storySection.offsetHeight;
      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        const offset = (scrollY - sectionTop) * -0.5;
        img1.style.transform = `translateY(${offset}px)`;
      }
    }
  
    // Efectul de paralaxa pentru a doua imagine
    const img2 = document.querySelector('.parallax-img2');
    const wwSection = document.querySelector('.when-where');
    if (img2 && wwSection) {
      const sectionTop = wwSection.offsetTop;
      const sectionHeight = wwSection.offsetHeight;
      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        const offset = (scrollY - sectionTop) * -1.0;
        img2.style.transform = `translateY(${offset}px)`;
      }
    }
  
    // Evidentierea butonului corespunzator sectiunii in care utilizatorul se afla
    let current = '';
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; 
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Efect de slider imagini si efect cascada
  
  let slideIndex = 1;
  
  function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
  
    slides.forEach(slide => slide.style.display = 'none');
    slides[slideIndex - 1].style.display = 'block';
  
    const textOverlay = document.querySelector('.text-overlay');
    if (textOverlay) {
      textOverlay.style.backgroundImage = `url('images/nunta${slideIndex}.jpg')`;
    }
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  // Setare interval pentru schimbarea automată a imaginilor
  setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5500);
  
  // Initializarea efectului de slider
  showSlides(slideIndex);
  