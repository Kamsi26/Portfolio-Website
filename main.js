// Set a fixed 5-second preloader
const preloader = document.getElementById("preloader");
setTimeout(() => {
  preloader.classList.add("loaded");
}, 5000);

document.addEventListener("DOMContentLoaded", function () {
  // --- Theme Toggler ---
  const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
  const themeToggleIcons = document.querySelectorAll('#theme-toggle-icon, #theme-toggle-icon-mobile');
  const body = document.body;
  let vantaEffect = null; // To hold the Vanta instance

  const sunIcon = "fa-sun";
  const moonIcon = "fa-moon";

  // Function to initialize or update Vanta
  const setupVanta = (isDarkMode) => {
    if (vantaEffect) {
      vantaEffect.destroy();
    }
    // VANTA.NET is attached to window, but we check just in case
    if (window.VANTA) {
      vantaEffect = VANTA.NET({
        el: ".hero-section",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: isDarkMode ? 0x9f7aea : 0xe8d9ff,
        backgroundColor: isDarkMode ? 0x101010 : 0x9f7aea,
        points: 10.00,
        maxDistance: 25.00,
        spacing: 18.00
      });
    }
  };

  // Function to set the theme
  const applyTheme = (isDarkMode) => {
    body.classList.toggle("dark-mode", isDarkMode);
    themeToggleIcons.forEach(icon => {
      icon.classList.toggle(sunIcon, !isDarkMode);
      icon.classList.toggle(moonIcon, isDarkMode);
    });
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    setupVanta(isDarkMode);
  };

  // Event listener for the toggle button
  themeToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const isCurrentlyDark = body.classList.contains("dark-mode");
      applyTheme(!isCurrentlyDark);
    });
  });

  // Initial theme setup on page load
  const savedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    applyTheme(savedTheme === "dark");
  } else {
    applyTheme(prefersDark);
  }

  // --- Greeting Rotator ---
  const greetingElement = document.getElementById('greeting-text');
  const greetings = ['Hello', 'Bonjour', 'Hola', 'Ciao', 'こんにちは', '안녕하세요', 'Guten Tag', 'Olá', '你好'];
  let greetingIndex = 0;

  if (greetingElement) {
    setInterval(() => {
      gsap.to(greetingElement, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          greetingIndex = (greetingIndex + 1) % greetings.length;
          greetingElement.textContent = greetings[greetingIndex];
          gsap.to(greetingElement, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        },
      });
    }, 3000);
  }

  // --- Animations ---
  const mainTitle = document.querySelector('.main-hero-title');
  const subtitle = document.querySelector('.hero-subtitle');
  const heroButtons = document.querySelector('.hero-buttons');

  // Hide elements initially
  if (subtitle) {
    gsap.set(subtitle, { opacity: 0 });
  }
  if (heroButtons) {
    gsap.set(heroButtons, { opacity: 0 });
  }
  
  // The SplitType animation has been removed as the new hero has dynamic text.
  // A fade-in is now applied to the whole title for a cleaner effect.
  if (mainTitle) {
    gsap.from(mainTitle, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        if (subtitle) {
          gsap.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        }
        if (heroButtons) {
          gsap.to(heroButtons, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
          });
        }
      },
    });
  }

  // Animate On Scroll Initialization
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
});
