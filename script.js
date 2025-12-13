// Theme + small form interaction (no backend required)

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const yearEl = document.getElementById("year");
const toast = document.getElementById("toast");
const form = document.getElementById("notifyForm");
const emailInput = document.getElementById("email");
const launchDateEl = document.getElementById("launchDate");

// Set an optional estimated launch date (edit this string if you want)
const ESTIMATED_LAUNCH = ""; // e.g. "March 2026"
launchDateEl.textContent = ESTIMATED_LAUNCH || "Coming soon";

yearEl.textContent = String(new Date().getFullYear());

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return setTheme(saved);

  // default: match system preference
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  setTheme(prefersLight ? "light" : "dark");
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.style.color = isError ? "rgba(255,255,255,.92)" : "";
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = (emailInput.value || "").trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!ok) {
    emailInput.focus();
    showToast("Please enter a valid email address.", true);
    return;
  }

  // Demo behavior: store locally (replace with real API later)
  const list = JSON.parse(localStorage.getItem("notify_list") || "[]");
  if (!list.includes(email)) list.push(email);
  localStorage.setItem("notify_list", JSON.stringify(list));

  form.reset();
  showToast("Thanks! You’ll be the first to know.");
});

initTheme();
