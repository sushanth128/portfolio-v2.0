(function () {
  const buttons = document.querySelectorAll(".nav-btn");

  function setActive(id) {
    buttons.forEach(b => b.classList.toggle("is-active", b.dataset.target === id));
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => scrollToId(btn.dataset.target));
  });

  // update active state on scroll
  const sections = ["about", "projects", "skills", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    },
    { root: null, threshold: [0.35, 0.55, 0.75] }
  );

  sections.forEach(s => obs.observe(s));
})();
