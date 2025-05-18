document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    const langSelect = document.getElementById("language-select");
    const formRo = document.getElementById('confirmation-form-ro');
    const formCz = document.getElementById('confirmation-form-cz');
    const elements = document.querySelectorAll("[data-lang]");
  
    // Traducerea site-ului
    const translations = {
      ro: {},
      cz: {
        paragraph1: "Kdysi dávno žili dva cizí lidé, každý s vlastními sny, ale nějakým způsobem jim bylo souzeno se setkat. Co začalo jako jednoduché rozhovory, se změnilo v smích, příběhy a rostoucí pouto, které jsem nemohla ignorovat.",
        paragraph2: "Jak se měnila roční období, měnili jsme se i my – nacházeli jsme sílu ve vzájemné laskavosti a den za dnem jsme se stále více zamilovávali. Prostřednictvím každého úspěchu a každé výzvy jsem zjistil/a, že pravá láska znamená podporu, trpělivost a radost z prožívání jednoduchých společných chvil.",
        paragraph3: "S velkou láskou vás zveme, abyste se stali součástí našeho příběhu a prožili s námi ty nejvýjimečnější okamžiky našich životů! ❤️",
        storyheading: "SPOLU UŽ 4 ROKY",
        storymaintitle: "DVĚ SPŘÍZNĚNÉ DUŠE",
        storymaintitle2: "OSLAVÍME NAŠI LÁSKU",
        locationtitlecivileceremony: "OBČANSKÉ MANŽELSTVÍ",
        civileceremonydate: "06 ČERVEN 2026",
        civilceremonytime: "Čas: 16:00",
        civilceremonylocation: "Místo: Radnice Vatra Dornei",
        partytime1: "Čas: 18:00",
        partylocation1: "Místo: Penzion Karmina",
        churchlocationtitle: "NÁBOŽENSKÁ SVATBA",
        churchlocationdate: "25 ČERVENEC 2025",
        religiousceremonytime: "Čas: 16:00",
        religiousceremonylocation: "Místo: Kostel „Sf. Anton de Padova”",
        partytime2: "Čas: 18:00",
        partylocation2: "Místo: AvaGarden",
        story2: "TĚŠÍME SE NA VÁS!"
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
      } else if (lang === 'cz') {
        formRo.style.display = 'none';
        formCz.style.display = 'block';
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
  