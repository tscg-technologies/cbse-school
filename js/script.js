/**
 * CBSE SCHOOL - PREMIUM EDUCATIONAL INSTITUTION WEBSITE
 * Interactive Functionality & Accessibility
 * Strictly Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. STICKY NAVIGATION & ACTIVE SECTION HIGHLIGHTING
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const handleScroll = () => {
    // Header shadow on scroll
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // Active link highlighting
    const scrollPosition = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
        drawerLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     02. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.drawer-close');

  const openDrawer = () => {
    menuToggle.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
    document.body.classList.add('no-scroll');
  };

  const closeDrawer = () => {
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // Close drawer when any mobile nav link is selected
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  /* ==========================================================================
     03. SMOOTH SCROLLING FOR INTERNAL LINKS
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight + 5;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     04. ANIMATED STATISTICS COUNTER (SECTION 07)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateCounters = () => {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out quadratic
        const currentCount = Math.floor(progress * (2 - progress) * target);
        stat.textContent = `${currentCount}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const highlightsSection = document.querySelector('.highlights-section');
  if (highlightsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(highlightsSection);
  } else {
    animateCounters();
  }

  /* ==========================================================================
     05. ACADEMIC PROGRAMME MODALS (SECTION 05)
     ========================================================================== */
  const programmeModal = document.getElementById('programmeModal');
  const programmeModalTitle = document.getElementById('programmeModalTitle');
  const programmeModalBody = document.getElementById('programmeModalBody');
  const programmeModalClose = document.getElementById('programmeModalClose');

  const programmeDetails = {
    foundational: {
      title: 'Foundational Learning (Nursery to Kindergarten)',
      body: `
        <p><strong>Ages:</strong> 3 – 6 Years | <strong>Focus:</strong> Play-Based Holistic Development</p>
        <p>Our foundational wing is thoughtfully modeled after the National Curriculum Framework (NCF-FS). It provides a nurturing, joyful transition from home to school.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Key Learning Pillars:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Phonological awareness and early multilingual exposure.</li>
          <li>Sensory integration, motor control, and creative expression through music and movement.</li>
          <li>Foundational numeracy through manipulatives, counting frames, and block play.</li>
          <li>Social harmony, sharing, emotional regulation, and positive self-identity.</li>
        </ul>
        <p><em>Note: Demonstrative syllabus blueprint. Actual school admissions and age criteria are subject to institutional guidelines.</em></p>
      `
    },
    primary: {
      title: 'Primary Education (Grades 1 to 5)',
      body: `
        <p><strong>Grades:</strong> 1 to 5 | <strong>Focus:</strong> Inquiry & Conceptual Clarity</p>
        <p>In the primary years, we emphasize conceptual mastery, linguistic fluencies, and scientific inquiry through structured active learning.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Core Curriculum Scope:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Languages: English, Hindi, and Regional Language options.</li>
          <li>Mathematics: Concrete-Pictorial-Abstract (CPA) pedagogical method.</li>
          <li>Environmental Studies (EVS) encouraging environmental stewardship.</li>
          <li>Visual & Performing Arts, physical education, and beginner computational thinking.</li>
        </ul>
        <p><em>Illustrative sample curriculum design.</em></p>
      `
    },
    middle: {
      title: 'Middle School Education (Grades 6 to 8)',
      body: `
        <p><strong>Grades:</strong> 6 to 8 | <strong>Focus:</strong> Analytical Thinking & Subject Depth</p>
        <p>Middle school bridges foundational concepts with specialized academic disciplines, introducing students to formal sciences, social studies, and applied digital technology.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Core Curriculum Scope:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Distinct Science disciplines: Physics, Chemistry, Biology laboratory investigations.</li>
          <li>Higher Mathematics: Pre-algebra, geometry, and data interpretation.</li>
          <li>Social Sciences: History, Geography, Civics, and Contemporary Indian Heritage.</li>
          <li>Coding, AI awareness, robotics projects, and life-skills workshops.</li>
        </ul>
        <p><em>Illustrative sample curriculum design.</em></p>
      `
    },
    secondary: {
      title: 'Secondary School Education (Grades 9 to 10)',
      body: `
        <p><strong>Grades:</strong> 9 & 10 | <strong>Focus:</strong> CBSE Board Curriculum & Academic Rigour</p>
        <p>Secondary education focuses on in-depth analytical competence, formal laboratory work, and rigorous preparation for CBSE Class X Board examinations.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Curricular Highlights:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Complete alignment with CBSE national syllabi and assessment frameworks.</li>
          <li>Internal assessments, project portfolios, and experiential science labs.</li>
          <li>Aptitude diagnostics and individualized career guidance seminars.</li>
          <li>Stress-management, yoga, and physical fitness integrations.</li>
        </ul>
        <p><em>Illustrative sample curriculum design for demonstration purposes.</em></p>
      `
    },
    senior: {
      title: 'Senior Secondary Education (Grades 11 to 12)',
      body: `
        <p><strong>Grades:</strong> 11 & 12 | <strong>Focus:</strong> Specialized Streams & Entrance Readiness</p>
        <p>Offering specialized academic streams tailored for competitive success, university admissions, and future career readiness.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Academic Stream Choices:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li><strong>Science Stream:</strong> Physics, Chemistry, Mathematics/Biology, Computer Science, English.</li>
          <li><strong>Commerce Stream:</strong> Accountancy, Business Studies, Economics, Applied Math, English.</li>
          <li><strong>Humanities Stream:</strong> History, Political Science, Psychology, Sociology, English.</li>
          <li>Integrated support for JEE, NEET, CUET, and CLAT aptitude foundations.</li>
        </ul>
        <p><em>Illustrative sample stream offerings.</em></p>
      `
    }
  };

  document.querySelectorAll('[data-programme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-programme');
      const data = programmeDetails[key];
      if (data && programmeModal) {
        programmeModalTitle.textContent = data.title;
        programmeModalBody.innerHTML = data.body;
        programmeModal.classList.add('is-open');
        document.body.classList.add('no-scroll');
      }
    });
  });

  const closeProgrammeModal = () => {
    if (programmeModal) {
      programmeModal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  };

  if (programmeModalClose) {
    programmeModalClose.addEventListener('click', closeProgrammeModal);
  }
  if (programmeModal) {
    programmeModal.addEventListener('click', (e) => {
      if (e.target === programmeModal) closeProgrammeModal();
    });
  }

  /* ==========================================================================
     06. EVENTS "READ MORE" MODAL & "VIEW ALL EVENTS" TOGGLE (SECTION 08)
     ========================================================================== */
  const eventModal = document.getElementById('eventModal');
  const eventModalTitle = document.getElementById('eventModalTitle');
  const eventModalBody = document.getElementById('eventModalBody');
  const eventModalClose = document.getElementById('eventModalClose');

  const eventDetails = {
    sports: {
      title: 'Annual Sports Celebration 2026',
      body: `
        <p><strong>Date:</strong> 14 November 2026 | <strong>Venue:</strong> School Athletic Complex</p>
        <p>A flagship institutional athletic meet celebrating sportsmanship, teamwork, and athletic excellence. Students from four school houses will compete across track and field events.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Event Schedule Highlights:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>08:30 AM: March Past & Torch Lighting Ceremony.</li>
          <li>10:00 AM: Track & Field finals (100m, 200m, 4x100m Relay).</li>
          <li>01:30 PM: Inter-house Football & Tug-of-War championship.</li>
          <li>03:30 PM: Rolling Trophy presentation and closing anthem.</li>
        </ul>
        <p><em>Sample fictional school event for demo presentation.</em></p>
      `
    },
    cultural: {
      title: 'Cultural and Arts Festival 2026',
      body: `
        <p><strong>Date:</strong> 18 December 2026 | <strong>Venue:</strong> School Grand Auditorium</p>
        <p>A vibrant grand celebration of Indian artistic heritage, classical music, drama, and contemporary dance performances.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Festival Highlights:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Bharatanatyam, Kathak, and folk dance ensembles.</li>
          <li>Hindustani & Carnatic classical vocal and instrumental orchestra.</li>
          <li>English and Hindi theatrical dramatics addressing social themes.</li>
          <li>Student Fine Arts & Pottery gallery exhibition open for parent walkthroughs.</li>
        </ul>
        <p><em>Sample fictional school event for demo presentation.</em></p>
      `
    },
    science: {
      title: 'Science & Innovation Exploration Week',
      body: `
        <p><strong>Date:</strong> 22 – 27 January 2027 | <strong>Venue:</strong> School STEM & Science Labs</p>
        <p>A multi-day symposium of scientific curiosity, live experiments, robotics demonstrations, and sustainable green technology prototypes created by our young researchers.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Symposium Highlights:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Working working models on solar harvesting and water conservation.</li>
          <li>Autonomous line-follower robotics competitions.</li>
          <li>Night sky observation camp with high-powered telescopes.</li>
          <li>Junior science quiz and keynote by guest scientists.</li>
        </ul>
        <p><em>Sample fictional school event for demo presentation.</em></p>
      `
    },
    independence: {
      title: 'Independence Day & National Pride Assembly',
      body: `
        <p><strong>Date:</strong> 15 August 2026 | <strong>Venue:</strong> Main Campus Ceremonial Lawn</p>
        <p>A solemn and patriotic ceremony instilling timeless values of national pride, unity, civic responsibility, and constitutional awareness.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--navy-primary);">Assembly Highlights:</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>National Tricolor hoisting ceremony accompanied by the National Anthem.</li>
          <li>Cadet parade by the School NCC & Scout Troop.</li>
          <li>Patriotic musical tributes and student speech competition.</li>
          <li>Distribution of sweets and community social outreach pledge.</li>
        </ul>
        <p><em>Sample fictional school event for demo presentation.</em></p>
      `
    }
  };

  document.querySelectorAll('[data-event]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-event');
      const data = eventDetails[key];
      if (data && eventModal) {
        eventModalTitle.textContent = data.title;
        eventModalBody.innerHTML = data.body;
        eventModal.classList.add('is-open');
        document.body.classList.add('no-scroll');
      }
    });
  });

  const closeEventModal = () => {
    if (eventModal) {
      eventModal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  };

  if (eventModalClose) {
    eventModalClose.addEventListener('click', closeEventModal);
  }
  if (eventModal) {
    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) closeEventModal();
    });
  }

  // "View All Events" button toggle
  const viewAllEventsBtn = document.getElementById('viewAllEventsBtn');
  const extraEvents = document.querySelectorAll('.event-card.extra-event');

  if (viewAllEventsBtn) {
    viewAllEventsBtn.addEventListener('click', () => {
      let isShowingExtra = false;
      extraEvents.forEach((card) => {
        card.classList.toggle('is-visible');
        if (card.classList.contains('is-visible')) {
          isShowingExtra = true;
        }
      });
      viewAllEventsBtn.textContent = isShowingExtra ? 'Show Fewer Events' : 'View All Events';
    });
  }

  /* ==========================================================================
     07. GALLERY CATEGORY FILTERING & FULLSCREEN LIGHTBOX (SECTION 09)
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let activeVisibleItems = [...galleryItems];
  let currentLightboxIndex = 0;

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      // Update active visible items list for lightbox
      activeVisibleItems = galleryItems.filter((item) => !item.classList.contains('hidden'));
    });
  });

  // Lightbox functions
  const updateLightbox = (index) => {
    if (activeVisibleItems.length === 0) return;
    if (index < 0) index = activeVisibleItems.length - 1;
    if (index >= activeVisibleItems.length) index = 0;

    currentLightboxIndex = index;
    const currentItem = activeVisibleItems[currentLightboxIndex];
    const imgEl = currentItem.querySelector('.gallery-img');
    const titleEl = currentItem.querySelector('.gallery-item-title');
    const catEl = currentItem.querySelector('.gallery-item-category');

    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt;
    }
    if (lightboxTitle && titleEl) {
      lightboxTitle.textContent = titleEl.textContent;
    }
    if (lightboxCaption && catEl) {
      lightboxCaption.textContent = `Category: ${catEl.textContent} • CBSE School Campus Life`;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `Image ${currentLightboxIndex + 1} of ${activeVisibleItems.length}`;
    }
  };

  const openLightbox = (index) => {
    updateLightbox(index);
    if (lightboxModal) {
      lightboxModal.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const visibleIndex = activeVisibleItems.indexOf(item);
      if (visibleIndex !== -1) {
        openLightbox(visibleIndex);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentLightboxIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentLightboxIndex + 1);
    });
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentLightboxIndex + 1);
  });

  // Touch swipe support for lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) {
        // Swipe Left -> Next
        updateLightbox(currentLightboxIndex + 1);
      }
      if (touchEndX > touchStartX + 50) {
        // Swipe Right -> Prev
        updateLightbox(currentLightboxIndex - 1);
      }
    }, { passive: true });
  }

  /* ==========================================================================
     08. PARENT TESTIMONIALS SLIDER (SECTION 10)
     ========================================================================== */
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;

  // Build dots
  if (dotsContainer && totalSlides > 0) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const updateSlidePosition = () => {
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    const dots = document.querySelectorAll('.carousel-dots .dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  };

  const goToSlide = (index) => {
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    updateSlidePosition();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      restartAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      restartAutoSlide();
    });
  }

  const startAutoSlide = () => {
    autoSlideTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  };

  const restartAutoSlide = () => {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    startAutoSlide();
  };

  const carouselBox = document.querySelector('.testimonial-carousel-container');
  if (carouselBox) {
    carouselBox.addEventListener('mouseenter', () => {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
    });
    carouselBox.addEventListener('mouseleave', () => {
      startAutoSlide();
    });

    // Mobile swipe for testimonials
    let tStartX = 0;
    let tEndX = 0;
    carouselBox.addEventListener('touchstart', (e) => {
      tStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselBox.addEventListener('touchend', (e) => {
      tEndX = e.changedTouches[0].screenX;
      if (tEndX < tStartX - 40) {
        goToSlide(currentSlide + 1);
        restartAutoSlide();
      }
      if (tEndX > tStartX + 40) {
        goToSlide(currentSlide - 1);
        restartAutoSlide();
      }
    }, { passive: true });
  }

  startAutoSlide();

  /* ==========================================================================
     09. FAQ ACCORDION (SECTION 12)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all other items (single expanded rule)
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherPanel = otherItem.querySelector('.faq-panel');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        // Toggle clicked item
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstTrigger = firstItem.querySelector('.faq-trigger');
    const firstPanel = firstItem.querySelector('.faq-panel');
    if (firstItem && firstTrigger && firstPanel) {
      firstItem.classList.add('is-open');
      firstTrigger.setAttribute('aria-expanded', 'true');
      firstPanel.style.maxHeight = `${firstPanel.scrollHeight}px`;
    }
  }

  /* ==========================================================================
     10. ADMISSION ENQUIRY FORM VALIDATION (SECTION 13)
     ========================================================================== */
  const enquiryForm = document.getElementById('enquiryForm');
  const formFeedbackBanner = document.getElementById('formFeedbackBanner');

  if (enquiryForm) {
    const parentName = document.getElementById('parentName');
    const studentName = document.getElementById('studentName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const grade = document.getElementById('grade');
    const message = document.getElementById('message');

    // Indian phone regex: optional +91 or 0 prefix, 10 digits starting with 6,7,8,9
    const indianPhoneRegex = /^(?:\+91[-\s]?|0)?[6-9]\d{9}$/;
    // Standard email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const validateField = (field, condition) => {
      if (condition) {
        field.classList.remove('is-invalid');
        return true;
      } else {
        field.classList.add('is-invalid');
        return false;
      }
    };

    // Attach real-time input listeners
    if (parentName) {
      parentName.addEventListener('input', () => {
        validateField(parentName, parentName.value.trim().length >= 2);
      });
    }
    if (studentName) {
      studentName.addEventListener('input', () => {
        validateField(studentName, studentName.value.trim().length >= 2);
      });
    }
    if (email) {
      email.addEventListener('input', () => {
        validateField(email, emailRegex.test(email.value.trim()));
      });
    }
    if (phone) {
      phone.addEventListener('input', () => {
        const cleanPhone = phone.value.trim().replace(/\s+/g, '');
        validateField(phone, indianPhoneRegex.test(cleanPhone));
      });
    }
    if (grade) {
      grade.addEventListener('change', () => {
        validateField(grade, grade.value !== '');
      });
    }

    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isParentValid = validateField(parentName, parentName.value.trim().length >= 2);
      const isStudentValid = validateField(studentName, studentName.value.trim().length >= 2);
      const isEmailValid = validateField(email, emailRegex.test(email.value.trim()));
      const cleanPhone = phone.value.trim().replace(/\s+/g, '');
      const isPhoneValid = validateField(phone, indianPhoneRegex.test(cleanPhone));
      const isGradeValid = validateField(grade, grade.value !== '');

      if (isParentValid && isStudentValid && isEmailValid && isPhoneValid && isGradeValid) {
        // Successful demo submission
        if (formFeedbackBanner) {
          formFeedbackBanner.classList.add('success');
          formFeedbackBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        enquiryForm.reset();

        // Auto-dismiss banner after 10 seconds
        setTimeout(() => {
          if (formFeedbackBanner) {
            formFeedbackBanner.classList.remove('success');
          }
        }, 10000);
      } else {
        // Focus on first invalid field
        const firstInvalid = enquiryForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  /* ==========================================================================
     11. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     12. GRACEFUL IMAGE FALLBACK & LAZY LOADING
     ========================================================================== */
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.addEventListener('error', function () {
      // Create neutral, elegant fallback SVG with instititutional branding
      const title = this.getAttribute('alt') || 'CBSE School Campus';
      const encodedSvg = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" fill="none">
          <rect width="800" height="500" fill="#142B49"/>
          <circle cx="400" cy="220" r="70" fill="#2457A6" opacity="0.4"/>
          <path d="M370 210 L400 180 L430 210 L400 240 Z" fill="#D8A84E"/>
          <text x="400" y="320" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FAF8F3" text-anchor="middle">${title}</text>
          <text x="400" y="355" font-family="sans-serif" font-size="14" fill="#D8A84E" text-anchor="middle">CBSE SCHOOL • LEARN • GROW • EXCEL</text>
        </svg>
      `);
      this.src = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
      this.classList.add('is-fallback');
    });
  });
});
