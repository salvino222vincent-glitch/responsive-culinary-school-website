
/* JS Orchestrator === */
(function(){
  // Track mouse for button glow
  document.addEventListener('pointermove', function(e){
    document.querySelectorAll('.button-glow, .btn-glow').forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100 + '%';
      const my = ((e.clientY - rect.top) / rect.height) * 100 + '%';
      btn.style.setProperty('--mx', mx);
      btn.style.setProperty('--my', my);
    });
  }, {passive:true});

  // Add reveal class to common elements if not already labeled
  const selectors = [
    'section', 'header', 'footer',
    '.hero', '.hero *[class*="title"]', '.subtitle', 
    '.card', '.cards > *', '.feature', '.features > *', '.menu-item', '.course', '.teacher',
    '.gallery img', '.cta', '.testimonial', '.about', '.contact', '.price', '.faq-item',
    '.grid > *', '.col', '.row > *'
  ];
  try {
    document.querySelectorAll(selectors.join(',')).forEach(el => {
      if(!el.classList.contains('reveal')) el.classList.add('reveal');
    });
  } catch(e) {}

  // IntersectionObserver fallback
  function ioFallback(){
    const io = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if(ent.isIntersecting){
          ent.target.classList.add('in-view');
          io.unobserve(ent.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    document.querySelectorAll('.text-ghost').forEach(el => io.observe(el));
  }

  // AOS init (if available)
  if (window.AOS) {
    AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 80 });
  }

  // GSAP timelines (if available)
  function gsapBlock(){
    if (!window.gsap) return ioFallback();
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Header entrance (always trigger on load)
    gsap.from("header", {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "power3.out"
    });

    // Hero entrance
    gsap.utils.toArray('.hero, .hero *').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 1,
        delay: i * 0.03,
        ease: 'power3.out'
      });
    });

    // Generic reveal for sections
    gsap.utils.toArray('section, .feature, .card, .course, .teacher, .testimonial, .faq-item').forEach((el) => {
      gsap.from(el, {
        opacity: 0, y: 28, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
      });
    });

    // Stagger cards/grids
    gsap.utils.toArray('.cards, .features, .grid, .row').forEach(group => {
      const items = group.querySelectorAll(':scope > *');
      if (items.length > 1) {
        gsap.from(items, {
          opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 82%', toggleActions: 'play none none none' }
        });
      }
    });

    // ✅ Footer entrance
    gsap.from("footer", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "footer",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    // Parallax on elements with .parallax
    gsap.utils.toArray('.parallax').forEach(el => {
      gsap.to(el, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: el, scrub: true }
      });
    });

    // Background parallax on elements with .parallax-bg
    gsap.utils.toArray('.parallax-bg').forEach(el => {
      gsap.to(el, {
        backgroundPosition: "50% 20%",
        ease: 'none',
        scrollTrigger: { trigger: el, scrub: true }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gsapBlock);
  } else {
    gsapBlock();
  }
})();
