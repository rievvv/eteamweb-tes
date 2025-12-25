document.addEventListener("DOMContentLoaded", () => {

  /* ===================== */
  /* SLIDER (HOME ONLY) */
  /* ===================== */
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  if (sliderWrapper && slides.length && nextBtn && prevBtn) {
    let index = 0;
    let interval;

    function updateSlider() {
      sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function nextSlide() {
      index = (index + 1) % slides.length;
      updateSlider();
    }

    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
    }

    function startAuto() {
      interval = setInterval(nextSlide, 4000);
    }

    function resetAuto() {
      clearInterval(interval);
      startAuto();
    }

    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAuto();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAuto();
    });

    dots.forEach(dot => {
      dot.addEventListener("click", e => {
        index = Number(e.target.dataset.index);
        updateSlider();
        resetAuto();
      });
    });

    startAuto();
  }

  /* ===================== */
  /* OVERLAY NOTIFICATION */
  /* ===================== */
  const overlay = document.getElementById("overlayNotif");
  const closeBtn = document.getElementById("closeOverlay");
  const overlayBox = document.querySelector(".overlay-box");

  if (overlay && closeBtn && overlayBox) {
    if (sessionStorage.getItem("overlayClosed")) {
      overlay.style.display = "none";
    }

    function closeOverlay() {
      overlay.style.display = "none";
      sessionStorage.setItem("overlayClosed", "true");
    }

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeOverlay();
    });

    overlay.addEventListener("click", closeOverlay);
    overlayBox.addEventListener("click", (e) => e.stopPropagation());
  }

  /* ===================== */
  /* HAMBURGER MENU (FINAL) */
  /* ===================== */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });

    navMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  /* ===================== */
  /* WHATSAPP FLOAT */
  /* ===================== */
  const waToggle = document.getElementById("waToggle");
  const waPopup = document.getElementById("waPopup");

  if (waToggle && waPopup) {
    waToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      waPopup.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      waPopup.classList.remove("show");
    });

    waPopup.addEventListener("click", (e) => e.stopPropagation());
  }

});
