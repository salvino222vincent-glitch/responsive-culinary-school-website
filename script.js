/** Mobile menu */
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
if(menuToggle && siteNav){
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/** Contact form validation (client-side demo) */
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fields = ['name','email','program','message'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      const errorEl = document.querySelector(`.error[data-for="${id}"]`);
      if(!el.checkValidity() || (el.tagName === 'SELECT' && el.value === '')){
        valid = false;
        errorEl.textContent = 'This field is required.';
      }else{
        errorEl.textContent = '';
      }
    });
    const status = document.getElementById('formStatus');
    if(valid){
      status.textContent = '✅ Thanks! Your message has been sent (demo).';
      form.reset();
    }else{
      status.textContent = '❗ Please fix the errors above.';
    }
  });
}
