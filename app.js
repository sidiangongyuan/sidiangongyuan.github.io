import { matchesPaper } from "./site-utils.mjs?v=20260905-single";

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
initProjectSharing();
