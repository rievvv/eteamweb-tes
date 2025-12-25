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

/* ===================== */
/* DAFTAR TALENT - FINAL CLEAN */
/* ===================== */
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("talentForm");
  if (!form) return;

  const nama = document.getElementById("nama");
  const idMico = document.getElementById("idMico");
  const bulan = document.getElementById("bulanAktif");
  const whatsapp = document.getElementById("whatsapp");
  const submitBtn = document.getElementById("submitTalent");
  const waError = document.getElementById("waError");
  const successPopup = document.getElementById("successPopup");

  function onlyNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, "");
  }
  // =====================
// ID MICO: ANGKA ONLY (REAL BLOCK)
// =====================

// blok ketik huruf
idMico.addEventListener("keypress", (e) => {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
});

// blok paste non-angka
idMico.addEventListener("paste", (e) => {
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData("text");
  if (/^\d+$/.test(text)) {
    idMico.value += text;
  }
});

  function validateWhatsapp() {
    onlyNumber(whatsapp);

    if (!whatsapp.value.startsWith("0")) {
      waError.style.display = "block";
      return false;
    }

    waError.style.display = "none";
    return true;
  }

  function validateForm() {
    const valid =
      nama.value.trim() &&
      idMico.value.trim() &&
      bulan.value &&
      validateWhatsapp();

    submitBtn.disabled = !valid;
    return valid;
  }

  // realtime validation
  nama.addEventListener("input", validateForm);
  idMico.addEventListener("input", validateForm);
  whatsapp.addEventListener("input", validateForm);
  bulan.addEventListener("change", validateForm);

  // SUBMIT
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    successPopup.classList.add("show");

    const timer = setTimeout(() => {
      window.location.href = "index.html";
    }, 2500);

    successPopup.addEventListener(
      "click",
      () => {
        clearTimeout(timer);
        window.location.href = "index.html";
      },
      { once: true }
    );
  });

});
