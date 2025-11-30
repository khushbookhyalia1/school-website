// Basic UI interactions for the school website
document.addEventListener('DOMContentLoaded', () => {
  // MOBILE NAV TOGGLE: reuse id pattern navToggle / mainNav (multiple pages)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.header-inner');
      const nav = parent.querySelector('.main-nav ul');
      if (nav) nav.classList.toggle('show');
    });
  });

  // FOOTER YEAR
  const years = ['year','year2','year3','year4','year5','year6'];
  const y = new Date().getFullYear();
  years.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // COUNTERS (animate from 0 to target)
  animateCounter('counter-students', 860);
  animateCounter('counter-teachers', 48);
  animateCounter('counter-years', 24);

  function animateCounter(id, target, duration = 1400) {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const stepTime = Math.max(10, Math.floor(duration / target));
    const timer = setInterval(() => {
      start += Math.ceil(target / (duration / stepTime));
      if (start >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = start;
      }
    }, stepTime);
  }

  // SIMPLE SLIDER
  const slides = document.querySelectorAll('#programSlider .slide');
  let slideIndex = 0;
  if (slides && slides.length) {
    slides[0].classList.add('active');
    document.getElementById('nextSlide')?.addEventListener('click', () => changeSlide(1));
    document.getElementById('prevSlide')?.addEventListener('click', () => changeSlide(-1));
    function changeSlide(dir) {
      slides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + dir + slides.length) % slides.length;
      slides[slideIndex].classList.add('active');
    }
    // auto rotate
    setInterval(() => changeSlide(1), 6000);
  }

  // ADMISSION FORM: validation & fake submit
  const admissionForm = document.getElementById('admissionForm');
  const formMsg = document.getElementById('formMsg');
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(admissionForm);
      const name = formData.get('parentName')?.toString().trim();
      const child = formData.get('childName')?.toString().trim();
      const grade = formData.get('grade')?.toString().trim();
      const phone = formData.get('phone')?.toString().trim();

      // simple validation
      if (!name || !child || !grade) {
        formMsg.textContent = 'Please fill required fields.';
        formMsg.style.color = 'crimson';
        return;
      }
      const phoneValid = /^\d{10}$/.test(phone);
      if (!phoneValid) {
        formMsg.textContent = 'Enter a valid 10-digit phone number.';
        formMsg.style.color = 'crimson';
        return;
      }

      // simulate submit (no backend) — show success and reset
      formMsg.style.color = 'green';
      formMsg.textContent = 'Thanks — your enquiry has been received. Our admissions team will call you.';
      setTimeout(() => {
        admissionForm.reset();
      }, 1200);
    });

    // reset button
    document.getElementById('resetForm')?.addEventListener('click', () => {
      admissionForm.reset();
      formMsg.textContent = '';
    });
  }

  // GALLERY MODAL
  const gallery = document.getElementById('galleryGrid');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  if (gallery && modal) {
    gallery.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains('gallery-item')) {
        modalImg.src = target.src;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden','false');
      }
    });
    modalClose?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  function closeModal() {
    if (modal) { modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); modalImg.src = ''; }
  }

  // If page has anchor #admission and clicked "Apply Now", scroll to section (or open modal in future)
  document.getElementById('openAdmission')?.addEventListener('click', (e) => {
    // default anchor behaviour will scroll; we ensure smooth scroll if needed
    const admission = document.getElementById('admission');
    if (admission) admission.scrollIntoView({behavior:'smooth', block:'center'});
  });
});
