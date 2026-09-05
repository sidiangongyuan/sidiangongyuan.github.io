import { matchesPaper, wrapIndex } from "./site-utils.mjs?v=20260905-gallery";

function initTheme() {
  const root = document.documentElement;
  const button = document.querySelector(".theme-toggle");
  const label = button.querySelector(".theme-label");
  let preference = "system";

  try {
    const saved = localStorage.getItem("color-theme");
    if (["light", "dark", "system"].includes(saved)) preference = saved;
  } catch {
    // The page remains usable when browser storage is unavailable.
  }

  function applyTheme() {
    if (preference === "system") delete root.dataset.theme;
    else root.dataset.theme = preference;
    label.textContent = preference === "system" ? "Auto" : preference === "dark" ? "Dark" : "Light";
    const next = preference === "system" ? "light" : preference === "light" ? "dark" : "system";
    button.setAttribute("aria-label", `Color theme: ${preference}. Switch to ${next} theme.`);
    button.title = `Color theme: ${preference}. Click for ${next}.`;
  }

  button.addEventListener("click", () => {
    preference = preference === "system" ? "light" : preference === "light" ? "dark" : "system";
    applyTheme();
    try {
      localStorage.setItem("color-theme", preference);
    } catch {
      // A preference can still be applied for the current visit.
    }
  });

  applyTheme();
  button.hidden = false;
}

function initPaperFilters() {
  const form = document.querySelector("#paper-filters");
  const search = document.querySelector("#paper-search");
  const year = document.querySelector("#paper-year");
  const count = document.querySelector("#paper-count");
  const clear = document.querySelector("#clear-filters");
  const empty = document.querySelector("#empty-results");
  const papers = [...document.querySelectorAll(".paper-list .paper")].map(element => ({
    element,
    year: element.dataset.year,
    text: `${element.id} ${element.textContent}`,
  }));

  function applyFilters() {
    let visible = 0;
    for (const paper of papers) {
      const matched = matchesPaper(paper, search.value, year.value);
      paper.element.hidden = !matched;
      paper.element.classList.toggle("first-visible", matched && visible === 0);
      if (matched) visible += 1;
    }
    count.textContent = `${visible} ${visible === 1 ? "paper" : "papers"}`;
    empty.hidden = visible > 0;
    clear.hidden = search.value === "" && year.value === "all";
  }

  function resetFilters() {
    search.value = "";
    year.value = "all";
    applyFilters();
  }

  form.addEventListener("submit", event => event.preventDefault());
  form.addEventListener("reset", event => {
    event.preventDefault();
    resetFilters();
    search.focus();
  });
  search.addEventListener("input", applyFilters);
  year.addEventListener("change", applyFilters);
  applyFilters();
  form.hidden = false;
  return resetFilters;
}

function initNavigation(resetFilters) {
  const mobileMenu = document.querySelector(".mobile-navigation");

  function revealTarget(hash) {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    let revealed = false;
    const disclosure = target.closest("details");
    if (disclosure && !disclosure.open) {
      disclosure.open = true;
      revealed = true;
    }
    if (target.closest(".paper[hidden]")) {
      resetFilters();
      revealed = true;
    }
    if (revealed) target.scrollIntoView({ block: "start" });
  }

  document.addEventListener("click", event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    mobileMenu.open = false;
    revealTarget(link.getAttribute("href"));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector("summary").focus();
    }
  });
  window.addEventListener("hashchange", () => revealTarget(window.location.hash));
  revealTarget(window.location.hash);
}

function initGallery() {
  const choices = [...document.querySelectorAll(".gallery-choice")];
  const preview = document.querySelector("#gallery-preview");
  const previewImage = document.querySelector("#gallery-image");
  const caption = document.querySelector("#gallery-caption");
  const enlarge = document.querySelector("#enlarge-figure");
  const previewError = document.querySelector("#gallery-error");
  const dialog = document.querySelector("#figure-viewer");
  const viewerImage = document.querySelector("#viewer-image");
  const viewerStage = document.querySelector("#viewer-stage");
  const viewerTitle = document.querySelector("#viewer-title");
  const viewerCaption = document.querySelector("#viewer-caption");
  const viewerError = document.querySelector("#viewer-error");
  const original = document.querySelector("#original-figure");
  const zoom = document.querySelector("#zoom-figure");
  let current = 0;

  function selectFigure(index) {
    current = wrapIndex(index, choices.length);
    const choice = choices[current];
    choices.forEach((item, i) => item.setAttribute("aria-current", String(i === current)));
    preview.href = choice.href;
    enlarge.href = choice.href;
    preview.setAttribute("aria-label", `Enlarge CoVLM-Bench ${choice.dataset.label} figure`);
    caption.textContent = choice.dataset.caption;
    previewImage.alt = choice.querySelector("img").alt;
    previewError.hidden = true;
    preview.setAttribute("aria-busy", "true");
    previewImage.src = choice.dataset.preview;
    if (previewImage.complete && previewImage.naturalWidth > 0) {
      preview.setAttribute("aria-busy", "false");
    }
    if (dialog.open) showViewerImage();
  }

  function resetZoom() {
    viewerStage.classList.remove("is-zoomed");
    viewerStage.scrollTop = 0;
    viewerStage.scrollLeft = 0;
    zoom.textContent = "Zoom in";
    zoom.setAttribute("aria-pressed", "false");
  }

  function showViewerImage() {
    const choice = choices[current];
    resetZoom();
    viewerTitle.textContent = choice.dataset.label;
    viewerCaption.textContent = choice.dataset.caption;
    viewerImage.alt = choice.querySelector("img").alt;
    viewerError.hidden = true;
    viewerStage.setAttribute("aria-busy", "true");
    viewerImage.src = choice.href;
    original.href = choice.href;
    if (viewerImage.complete && viewerImage.naturalWidth > 0) {
      viewerStage.setAttribute("aria-busy", "false");
    }
  }

  choices.forEach((choice, index) => {
    // Links retain their original-image destination when JavaScript is unavailable.
    choice.setAttribute("role", "button");
    choice.setAttribute("aria-label", `Show ${choice.dataset.label} figure`);
    choice.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      selectFigure(index);
    });
    choice.addEventListener("keydown", event => {
      if (event.key === " ") {
        event.preventDefault();
        selectFigure(index);
      } else if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? choices.length - 1
          : wrapIndex(index + (event.key === "ArrowRight" ? 1 : -1), choices.length);
        choices[next].focus();
        selectFigure(next);
      }
    });
  });
  previewImage.addEventListener("load", () => {
    preview.setAttribute("aria-busy", "false");
    previewError.hidden = true;
  });
  previewImage.addEventListener("error", () => {
    preview.setAttribute("aria-busy", "false");
    previewError.hidden = false;
  });
  if (previewImage.complete && previewImage.naturalWidth === 0) previewError.hidden = false;

  // Older browsers keep the ordinary image links instead of an incomplete modal.
  if (typeof dialog.showModal !== "function") return;
  for (const link of [preview, enlarge]) {
    link.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showViewerImage();
      dialog.showModal();
      document.body.classList.add("viewer-open");
    });
  }
  document.querySelector("#close-viewer").addEventListener("click", () => dialog.close());
  document.querySelector("#previous-figure").addEventListener("click", () => selectFigure(current - 1));
  document.querySelector("#next-figure").addEventListener("click", () => selectFigure(current + 1));
  dialog.addEventListener("close", () => {
    document.body.classList.remove("viewer-open");
    resetZoom();
  });
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener("keydown", event => {
    if (viewerStage.classList.contains("is-zoomed")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      selectFigure(current + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  zoom.addEventListener("click", () => {
    const zoomed = viewerStage.classList.toggle("is-zoomed");
    zoom.textContent = zoomed ? "Fit image" : "Zoom in";
    zoom.setAttribute("aria-pressed", String(zoomed));
    if (!zoomed) resetZoom();
  });
  viewerImage.addEventListener("load", () => {
    viewerStage.setAttribute("aria-busy", "false");
    viewerError.hidden = true;
  });
  viewerImage.addEventListener("error", () => {
    viewerStage.setAttribute("aria-busy", "false");
    viewerError.hidden = false;
  });
}

function initProjectSharing() {
  const button = document.querySelector("#copy-project-link");
  const feedback = document.querySelector("#copy-feedback");
  const shareUrl = document.querySelector("#share-url");
  let timeout;
  button.hidden = false;
  button.addEventListener("click", async () => {
    clearTimeout(timeout);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText("https://sidiangongyuan.github.io/#covlm-bench");
      feedback.textContent = "Link copied.";
      shareUrl.hidden = true;
    } catch {
      feedback.textContent = "Select and copy the project link below.";
      shareUrl.hidden = false;
      shareUrl.focus();
      shareUrl.select();
    }
    timeout = setTimeout(() => { feedback.textContent = ""; }, 5000);
  });
}

initTheme();
initNavigation(initPaperFilters());
initGallery();
initProjectSharing();
