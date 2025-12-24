document.addEventListener("DOMContentLoaded", () => {

  /* ===================== */
  /* SLIDER (HANYA JIKA ADA) */
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

    overlayBox.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  /* ===================== */
  /* PAGE TRANSITION (NAVBAR) */
  /* ===================== */
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    link.addEventListener("click", (e) => {
      e.preventDefault();

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  /* ===================== */
  /* TOP UP CARD (OPSIONAL) */
  /* ===================== */
  document.querySelectorAll(".topup-card").forEach(card => {
    card.addEventListener("click", () => {
      alert("Menu Top Up akan dibuka");
    });
  });

  /* ===================== */
  /* CTA RESELLER */
  /* ===================== */
  const resellerBtn = document.querySelector(".reseller-btn");
  if (resellerBtn) {
    resellerBtn.addEventListener("click", () => {
      window.open(
        "https://wa.me/628XXXXXXXXXX?text=Kak%20saya%20ingin%20daftar%20reseller",
        "_blank"
      );
    });
  }

});

/* ===================== */
/* WHATSAPP FLOAT (ISOLATED) */
/* ===================== */
document.addEventListener("DOMContentLoaded", () => {
  const waToggle = document.getElementById("waToggle");
  const waPopup = document.getElementById("waPopup");

  if (!waToggle || !waPopup) return;

  waToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    waPopup.classList.toggle("show");
  });

  // Klik di luar → tutup
  document.addEventListener("click", () => {
    waPopup.classList.remove("show");
  });

  // Klik di popup → jangan tutup
  waPopup.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
