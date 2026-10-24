"use strict";

const header = document.getElementById("siteHeader");
const menu = document.getElementById("menuButton");
const nav = document.getElementById("mainNavigation");

const tabs = [...document.querySelectorAll("[data-category]")];
const panels = [...document.querySelectorAll("[data-panel]")];
const purchaseButtons = [...document.querySelectorAll("[data-product]")];

const modal = document.getElementById("purchaseModal");
const backdrop = document.getElementById("modalBackdrop");
const closeButton = document.getElementById("modalClose");
const confirmButton = document.getElementById("modalConfirm");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const currentYear = document.getElementById("currentYear");

function addInformationLinks() {
  if (nav && !nav.querySelector('a[href="./information.html"]')) {
    const informationLink = document.createElement("a");
    informationLink.href = "./information.html";
    informationLink.textContent = "Information";

    const shopLink = nav.querySelector('a[href="./shop.html"]');

    if (shopLink) {
      nav.insertBefore(informationLink, shopLink);
    } else {
      nav.appendChild(informationLink);
    }
  }

  const footerNavigation = document.querySelector(".site-footer nav");

  if (
    footerNavigation &&
    !footerNavigation.querySelector('a[href="./information.html"]')
  ) {
    const informationLink = document.createElement("a");
    informationLink.href = "./information.html";
    informationLink.textContent = "Information";

    const shopLink = footerNavigation.querySelector('a[href="./shop.html"]');

    if (shopLink) {
      footerNavigation.insertBefore(informationLink, shopLink);
    } else {
      footerNavigation.appendChild(informationLink);
    }
  }
}

function updateHeader() {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 24);
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

function showCategory(name, scrollPage = true) {
  tabs.forEach((tab) => {
    tab.classList.toggle(
      "active",
      tab.dataset.category === name
    );
  });

  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== name;
  });

  window.history.replaceState(null, "", `#${name}`);

  if (scrollPage) {
    const bar = document.querySelector(".shop-nav-wrap");

    if (bar) {
      window.scrollTo({
        top: bar.offsetTop + bar.offsetHeight - 70,
        behavior: "smooth"
      });
    }
  }
}

function initializeCategories() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      showCategory(tab.dataset.category);
    });
  });

  const requested = window.location.hash.slice(1);
  const validCategories = [
    "ranks",
    "upgrades",
    "jewels",
    "tags"
  ];

  showCategory(
    validCategories.includes(requested)
      ? requested
      : "ranks",
    false
  );
}

function openModal(name) {
  if (
    !modal ||
    !modalTitle ||
    !modalDescription
  ) {
    return;
  }

  modalTitle.textContent = name;
  modalDescription.textContent =
    `${name} purchasing is not available yet. ` +
    "The official AxloMC Store will open before launch.";

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function initializeModal() {
  purchaseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openModal(button.dataset.product);
    });
  });

  [backdrop, closeButton, confirmButton]
    .filter(Boolean)
    .forEach((element) => {
      element.addEventListener("click", closeModal);
    });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function enableRgb() {
  const items = [...document.querySelectorAll(".rgb-interactive")];

  items.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (
        event.target.closest("button, a") &&
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

addInformationLinks();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

initializeNavigation();
initializeCategories();
initializeModal();
enableRgb();
