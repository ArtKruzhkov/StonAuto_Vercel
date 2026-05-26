document.addEventListener('DOMContentLoaded', function () {
  // emailJS init
  emailjs.init('aIhEVF8GV6cy8D_Rt');

  // Initialize Icons
  lucide.createIcons();

  // Mobile Menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Navbar Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('glass');
    } else {
      navbar.classList.remove('glass');
    }
  });

  // Animation Observer
  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       entry.target.style.opacity = '1';
  //       entry.target.style.transform = 'translateY(0)';
  //     }
  //   });
  // });

  // document.querySelectorAll('.glass-card, .service-card').forEach((el, index) => {
  //   el.style.opacity = '0';
  //   el.style.transform = 'translateY(20px)';
  //   el.style.transition = `all 0.6s ease ${index * 0.1}s`;
  //   observer.observe(el);
  // });

  // Contact Form
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      if (!contactForm.checkValidity()) return;

      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // date
      const now = new Date();

      const formatted = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      contactForm.date_time.value = formatted;

      // loading state

      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      try {
        // Send Email
        await emailjs.sendForm('service_gwtm3nr', 'template_3koqg5z', contactForm);

        // Success
        btn.innerHTML = 'Sent!';
        btn.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600');
        btn.classList.add('bg-green-500');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-green-500');
          btn.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600');
          btn.disabled = false;
          contactForm.reset();
        }, 2500);
      } catch (error) {
        console.error('EmailJS Error:', error);
        btn.innerHTML = 'Error!';
        btn.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600');
        btn.classList.add('bg-red-500');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-red-500');
          btn.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600');
          btn.disabled = false;
        }, 2500);
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.add('hidden');
      }
    });
  });

  // Swiper
  const swiper = new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 20,
    grabCursor: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // const parallaxImgs = document.querySelectorAll('.parallax-img');

  // parallaxImgs.forEach((img) => {
  //   if (img.src.includes('legal-hero')) {
  //     img.dataset.scale = '1.2';
  //   }
  // });

  // function updateParallax() {
  //   const isDesktop = window.innerWidth >= 1280;

  //   parallaxImgs.forEach((img) => {
  //     const y = window.scrollY * 0.3;
  //     const scale = img.dataset.scale;

  //     if (scale && isDesktop) {
  //       img.style.transform = `translateY(${y}px) scaleY(${scale})`;
  //     } else {
  //       img.style.transform = `translateY(${y}px)`;
  //     }
  //   });
  // }

  // updateParallax();
  // window.addEventListener('scroll', updateParallax);

  const parallaxImgs = document.querySelectorAll('.parallax-img');

  parallaxImgs.forEach((img) => {
    if (img.src.includes('legal-hero')) {
      img.dataset.scale = '1.2';
    }
  });

  let latestScroll = 0;
  let ticking = false;

  function updateParallax() {
    const isDesktop = window.innerWidth >= 1280;

    parallaxImgs.forEach((img) => {
      const y = latestScroll * 0.3;
      const scale = img.dataset.scale;

      if (scale && isDesktop) {
        img.style.transform = `translate3d(0, ${y}px, 0) scaleY(${scale})`;
      } else {
        img.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    latestScroll = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  updateParallax();
});
