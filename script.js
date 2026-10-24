"use strict";

const SERVER_IP = "play.axlomc.net";
const phrase = "Explore your world. Make your life cool.";

const header = document.getElementById("siteHeader");
const menu = document.getElementById("menuButton");
const nav = document.getElementById("mainNavigation");
const type = document.getElementById("typewriterText");
const cursor = document.getElementById("typewriterCursor");
const address = document.getElementById("serverAddress");
const actions = document.getElementById("heroActions");
const copyButton = document.getElementById("copyIpButton");
const joinButton = document.getElementById("joinCopyButton");
const joinLabel = document.getElementById("joinCopyLabel");
const toast = document.getElementById("toast");
const currentYear = document.getElementById("currentYear");

let index = 0;
let timer;

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

function addInformationCard() {
  const featureGrid = document.querySelector(".feature-grid");

  if (!featureGrid || featureGrid.querySelector(".information-feature-card")) {
    return;
  }

  const informationCard = document.createElement("article");
  informationCard.className =
    "feature-card wide rgb-interactive reveal information-feature-card";

  informationCard.innerHTML = `
    <span class="card-number">02</span>
    <div>
      <p class="eyebrow">ABOUT THE NETWORK</p>
      <h3>Information</h3>
      <p>
        Explore AxloMC's game modes, currencies, ranks, community systems,
        events, and long-term development vision.
      </p>
      <a class="card-link" href="./information.html">
        Explore AxloMC <span>→</span>
      </a>
    </div>
  `;

  const cards = [...featureGrid.children];

  if (cards.length > 1) {
    featureGrid.insertBefore(informationCard, cards[1]);
  } else {
    featureGrid.appendChild(informationCard);
  }

  cards.slice(1).forEach((card, cardIndex) => {
    const number = card.querySelector(".card-number");

    if (number) {
      number.textContent = String(cardIndex + 3).padStart(2, "0");
    }
  });
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

function typeWriter() {
  if (!type || !cursor) {
    return;
  }

  if (index < phrase.length) {
    type.textContent += phrase[index];
    index += 1;
    window.setTimeout(typeWriter, 58);
    return;
  }

  cursor.classList.add("hidden");

  if (address) {
    window.setTimeout(() => {
      address.classList.add("visible");
    }, 180);
  }

  if (actions) {
    window.setTimeout(() => {
      actions.classList.add("visible");
    }, 420);
  }
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");

  area.value = text;
  area.style.position = "fixed";
  area.style.top = "-9999px";

  document.body.appendChild(area);
  area.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  area.remove();

  return copied;
}

async function copyIp() {
  let copied = false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      copied = true;
    } catch (error) {
      copied = false;
    }
  }

  if (!copied) {
    copied = fallbackCopy(SERVER_IP);
  }

  window.clearTimeout(timer);

  if (toast) {
    toast.textContent = copied
      ? "Server IP copied."
      : `Server IP: ${SERVER_IP}`;

    toast.classList.add("visible");
  }

  if (copyButton) {
    copyButton.classList.toggle("copied", copied);
    copyButton.textContent = copied ? "IP Copied" : "Copy Server IP";
  }

  if (joinLabel) {
    joinLabel.textContent = copied ? "Copied" : "Copy IP";
  }

  timer = window.setTimeout(() => {
    if (toast) {
      toast.classList.remove("visible");
    }

    if (copyButton) {
      copyButton.classList.remove("copied");
      copyButton.textContent = "Copy Server IP";
    }

    if (joinLabel) {
      joinLabel.textContent = "Copy IP";
    }
  }, 2200);
}

function initializeCopyButtons() {
  if (copyButton) {
    copyButton.addEventListener("click", copyIp);
  }

  if (joinButton) {
    joinButton.addEventListener("click", copyIp);
  }
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
      threshold: 0.12
    }
  );

  reveals.forEach((element) => {
    observer.observe(element);
  });
}

function enableRgb() {
  const items = [...document.querySelectorAll(".rgb-interactive")];

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

addInformationLinks();
addInformationCard();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

initializeNavigation();
initializeCopyButtons();
initializeRevealAnimations();
enableRgb();

window.setTimeout(typeWriter, 900);
