"use strict";

const header = document.getElementById("siteHeader");
const menu = document.getElementById("menuButton");
const nav = document.getElementById("mainNavigation");

const tabs = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll("[data-groups]")];

const applicationButton =
  document.getElementById("applicationButton");

const toast = document.getElementById("toast");
const currentYear = document.getElementById("currentYear");

let toastTimer;

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

function filterStaff(name) {
  tabs.forEach((tab) => {
    tab.classList.toggle(
      "active",
      tab.dataset.filter === name
    );
  });

  cards.forEach((card) => {
    const groups = card.dataset.groups.split(" ");

    card.classList.toggle(
      "filtered-out",
      name !== "all" && !groups.includes(name)
    );
  });
}

function initializeFilters() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterStaff(tab.dataset.filter);
    });
  });
}

function initializeApplicationButton() {
  if (!applicationButton || !toast) {
    return;
  }

  applicationButton.addEventListener("click", (event) => {
    event.stopPropagation();

    window.clearTimeout(toastTimer);
    toast.classList.add("visible");

    toastTimer = window.setTimeout(() => {
      toast.classList.remove("visible");
    }, 2300);
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
initializeFilters();
initializeApplicationButton();
enableRgb();
