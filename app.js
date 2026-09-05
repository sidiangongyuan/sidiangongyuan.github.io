(() => {
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
})();
