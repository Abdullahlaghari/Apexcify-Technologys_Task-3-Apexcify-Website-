/* Simple gallery + filter + lightbox with next/prev. */
document.addEventListener('DOMContentLoaded', () => {
  const projects = [
    { title: "Resume Builder Web App", src: "images/image2.png", type: "image", category: "web", description: "Editable templates, live preview, export to PDF/Word." },
    { title: "Chat Application (Real-Time)", src: "images/image3.png", type: "image", category: "web", description: "Realtime messaging with presence & emoji support." },
    { title: "Fintech Mobile App", src: "images/image4.png", type: "image", category: "mobile", description: "Secure payments, charts and analytics for users." },
    { title: "Smart Home Automation", src: "images/image5.png", type: "image", category: "iot", description: "Arduino + sensors to automate lights, water, and security." }
    // Add more project objects here if you add new cards in HTML
  ];

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  // Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach((card, i) => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          // slight animation
          card.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320, easing: 'ease-out' });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox open
  function openLightbox(index) {
    const p = projects[index];
    lightboxContent.innerHTML = '';
    if (!p) return;
    // create image element (or video if needed)
    if (p.type === 'video') {
      const v = document.createElement('video');
      v.src = p.src;
      v.controls = true;
      v.autoplay = true;
      v.style.maxWidth = '100%';
      v.style.maxHeight = '80vh';
      lightboxContent.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.title;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '80vh';
      img.style.borderRadius = '10px';
      lightboxContent.appendChild(img);
    }

    // caption
    const cap = document.createElement('div');
    cap.style.color = '#fff';
    cap.style.marginTop = '10px';
    cap.style.textAlign = 'center';
    cap.innerHTML = `<strong>${p.title}</strong><div style="color:rgba(255,255,255,0.85);font-size:0.95rem">${p.description}</div>`;
    lightboxContent.appendChild(cap);

    lightbox.dataset.index = index;
    lightbox.setAttribute('aria-hidden', 'false');
  }

  // attach view buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.index, 10);
      openLightbox(idx);
    });
  });

  // close
  lbClose.addEventListener('click', () => {
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxContent.innerHTML = '';
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxContent.innerHTML = '';
    }
  });

  // prev/next
  lbPrev.addEventListener('click', () => {
    let idx = parseInt(lightbox.dataset.index || 0, 10);
    idx = (idx - 1 + projects.length) % projects.length;
    openLightbox(idx);
  });
  lbNext.addEventListener('click', () => {
    let idx = parseInt(lightbox.dataset.index || 0, 10);
    idx = (idx + 1) % projects.length;
    openLightbox(idx);
  });

  // keyboard nav
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'ArrowRight') lbNext.click();
      if (e.key === 'ArrowLeft') lbPrev.click();
      if (e.key === 'Escape') lbClose.click();
    }
  });

  // next/prev section navigation (simple scroll)
  document.getElementById('prevSection').addEventListener('click', () => {
    scrollToSection('about');
  });
  document.getElementById('nextSection').addEventListener('click', () => {
    scrollToSection('portfolio');
  });
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // set footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
