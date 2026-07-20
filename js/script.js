/* =========================================================
   PORTFOLIO SCRIPT — Khaled Nat3y
   =========================================================
   Sections:
   1. Nav scroll effect
   2. Hamburger mobile menu
   3. Smooth active nav link highlight
   4. Scroll reveal animations
   5. Resume download (embedded base64)
   6. Typing effect in hero
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. NAV SCROLL EFFECT
     Adds .scrolled class to nav when user scrolls down
  --------------------------------------------------------- */
  const nav = document.querySelector('.site-nav');

  const onScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ---------------------------------------------------------
     2. HAMBURGER MOBILE MENU
  --------------------------------------------------------- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a mobile link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ---------------------------------------------------------
     3. ACTIVE NAV LINK HIGHLIGHT
     Highlights the nav link for the section currently in view
  --------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a, .nav__mobile a');

  const highlightNav = () => {
    let currentId = '';

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= 100) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  /* ---------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
     Elements with .reveal class animate in when scrolled into view
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ---------------------------------------------------------
     5. RESUME DOWNLOAD
     Triggers download of the PDF from the assets folder
  --------------------------------------------------------- */
  const resumeBtns = document.querySelectorAll('[data-resume]');

  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = 'assets/Khaled_Natey_Flutter_Developer.pdf';
      link.download = 'Khaled_Natey_Flutter_Developer.pdf';
      link.click();
    });
  });


  /* ---------------------------------------------------------
     6. TYPING EFFECT IN HERO SUBTITLE
     Cycles through role titles with a typewriter effect
  --------------------------------------------------------- */
  const typingEl = document.querySelector('.hero__typing');
  if (!typingEl) return;

  const roles = [
    'Junior Flutter Developer',
    'Mobile App Engineer',
    'Cross-Platform Specialist',
    'Clean Architecture Advocate',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const TYPING_SPEED = 70;
  const DELETING_SPEED = 40;
  const PAUSE_DURATION = 1800;

  const type = () => {
    const currentRole = roles[roleIndex];

    if (isPaused) return;

    if (!isDeleting) {
      typingEl.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
          tick();
        }, PAUSE_DURATION);
        return;
      }
    } else {
      typingEl.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    tick();
  };

  const tick = () => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    setTimeout(type, speed);
  };

  tick();

});
