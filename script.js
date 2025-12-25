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
/* VALIDASI FORM DAFTAR TALENT */
/* ===================== */

const form = document.getElementById("talentForm");

if (form) {

  const nama = document.getElementById("nama");
  const idMico = document.getElementById("idMico");
  const bulan = document.getElementById("bulanAktif");
  const whatsapp = document.getElementById("whatsapp");
  const submitBtn = document.getElementById("submitTalent");

  function onlyNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, "");
  }

  idMico.addEventListener("input", () => onlyNumber(idMico));
  whatsapp.addEventListener("input", () => onlyNumber(whatsapp));

  function validateForm() {
    let valid = true;

    if (!nama.value.trim()) valid = false;
    if (!idMico.value.trim()) valid = false;
    if (!bulan.value) valid = false;
    if (!whatsapp.value.trim()) valid = false;

    if (whatsapp.value && !whatsapp.value.startsWith("0")) {
      whatsapp.setCustomValidity("Nomor WhatsApp harus diawali angka 0");
      valid = false;
    } else {
      whatsapp.setCustomValidity("");
    }

    submitBtn.disabled = !valid;
    return valid;
  }

  form.addEventListener("input", validateForm);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Mohon lengkapi data dengan benar");
      return;
    }

    showSuccessPopup();
  });
}
form.addEventListener("submit", (e) => {
  if (!validateWhatsapp()) {
    e.preventDefault();
  }
});


/* ===================== */
/* VALIDASI WHATSAPP */
/* ===================== */
const whatsappInput = document.getElementById("whatsapp");
const waError = document.getElementById("waError");
const submitBtn = document.getElementById("submitTalent");

function validateWhatsapp() {
  const value = whatsappInput.value.trim();

  // hanya angka
  whatsappInput.value = value.replace(/[^0-9]/g, "");

  if (value === "") {
    waError.style.display = "none";
    submitBtn.disabled = true;
    return false;
  }

  if (!value.startsWith("0")) {
    waError.style.display = "block";
    submitBtn.disabled = true;
    return false;
  }

  waError.style.display = "none";
  return true;
}

if (whatsappInput) {
  whatsappInput.addEventListener("input", () => {
    validateWhatsapp();
  });
}


/* ===================== */
/* POPUP SUKSES */
/* ===================== */
function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.classList.add("show");
}
