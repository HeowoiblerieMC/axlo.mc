"use strict";

const header = document.getElementById("siteHeader");
const menu = document.getElementById("menuButton");
const nav = document.getElementById("mainNavigation");
const chapterNavigation =
  document.getElementById("chapterNavigation");

const currentYear = document.getElementById("currentYear");

function updateHeader() {
  if (header) {
    header.classList.toggle(
      "scrolled",
      window.scrollY > 24
    );
  }
}

function closeMenu() {
  if (!nav || !menu) {
    return;
  }

  nav.classList.remove("open");
  menu.classList.remove("active");
  menu.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function initializeNavigation() {
  if (!nav || !menu) {
    return;
  }

  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");

    menu.classList.toggle("active", open);
    menu.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();
}

function initializeRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1
    }
  );

  reveals.forEach((element) => {
    observer.observe(element);
  });
}

function initializeChapterNavigation() {
  if (!chapterNavigation) {
    return;
  }

  const chapterLinks = [
    ...chapterNavigation.querySelectorAll("a")
  ];

  const sections = chapterLinks
    .map((link) => {
      const id = link.getAttribute("href");

      if (!id || !id.startsWith("#")) {
        return null;
      }

      return document.querySelector(id);
    })
    .filter(Boolean);

  function setActiveChapter() {
    const referencePosition =
      window.scrollY + window.innerHeight * 0.32;

    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= referencePosition) {
        activeSection = section;
      }
    });

    chapterLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") ===
          `#${activeSection.id}`
      );
    });
  }

  chapterLinks.forEach((link) => {
    link.addEventListener("click", () => {
      chapterLinks.forEach((other) => {
        other.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  window.addEventListener(
    "scroll",
    setActiveChapter,
    {
      passive: true
    }
  );

  setActiveChapter();
}

function enableRgb() {
  const items = [
    ...document.querySelectorAll(".rgb-interactive")
  ];

  items.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (
        event.target.closest("a, button") &&
        event.target !== item
      ) {
        return;
      }

      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove("rgb-active");
        }
      });

      item.classList.toggle("rgb-active");
      event.stopPropagation();
    });
  });

  document.addEventListener("click", () => {
    items.forEach((item) => {
      item.classList.remove("rgb-active");
    });
  });
}

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}

initializeNavigation();
initializeRevealAnimations();
initializeChapterNavigation();
enableRgb();
