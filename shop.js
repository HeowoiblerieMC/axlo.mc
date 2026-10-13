"use strict";

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const currentYear = document.getElementById("currentYear");

const shopTabs = document.querySelectorAll("[data-shop-tab]");
const shopPanels = document.querySelectorAll("[data-shop-panel]");
const footerTabs = document.querySelectorAll("[data-footer-tab]");

const purchaseButtons = document.querySelectorAll(
    ".purchase-button[data-product]"
);

const purchaseModal = document.getElementById("purchaseModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalConfirm = document.getElementById("modalConfirm");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

function updateHeader() {
    siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

function toggleNavigation() {
    const navigationIsOpen = mainNavigation.classList.toggle("open");

    menuButton.classList.toggle("active", navigationIsOpen);
    menuButton.setAttribute(
        "aria-expanded",
        String(navigationIsOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        navigationIsOpen
            ? "Close navigation"
            : "Open navigation"
    );

    document.body.classList.toggle(
        "menu-open",
        navigationIsOpen
    );
}

function closeNavigation() {
    mainNavigation.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
}

function activateShopPanel(panelName, updateHash = true) {
    shopTabs.forEach((tab) => {
        const isActive = tab.dataset.shopTab === panelName;
        tab.classList.toggle("active", isActive);
    });

    shopPanels.forEach((panel) => {
        const isActive = panel.dataset.shopPanel === panelName;

        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
    });

    if (updateHash) {
        history.replaceState(
            null,
            "",
            `#${panelName}`
        );
    }

    window.scrollTo({
        top: document.querySelector(".shop-navigation-section").offsetTop - 68,
        behavior: "smooth"
    });
}

function initializeShopNavigation() {
    shopTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activateShopPanel(tab.dataset.shopTab);
        });
    });

    footerTabs.forEach((button) => {
        button.addEventListener("click", () => {
            activateShopPanel(button.dataset.footerTab);
        });
    });

    const requestedPanel = window.location.hash.replace("#", "");

    const validPanelNames = [
        "ranks",
        "upgrades",
        "jewels",
        "tags"
    ];

    if (validPanelNames.includes(requestedPanel)) {
        activateShopPanel(requestedPanel, false);
    }
}

function openPurchaseModal(productName) {
    modalTitle.textContent = productName;

    modalDescription.textContent =
        `${productName} purchasing is not available yet. ` +
        "The official AxloMC Store will open before the network launch.";

    purchaseModal.classList.add("open");
    purchaseModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    window.setTimeout(() => {
        modalClose.focus();
    }, 100);
}

function closePurchaseModal() {
    purchaseModal.classList.remove("open");
    purchaseModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function initializePurchaseModal() {
    purchaseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openPurchaseModal(button.dataset.product);
        });
    });

    modalClose.addEventListener("click", closePurchaseModal);
    modalConfirm.addEventListener("click", closePurchaseModal);
    modalBackdrop.addEventListener("click", closePurchaseModal);

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            purchaseModal.classList.contains("open")
        ) {
            closePurchaseModal();
        }
    });
}

function initializeMobileNavigation() {
    menuButton.addEventListener("click", toggleNavigation);

    mainNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("click", (event) => {
        const clickedNavigation = mainNavigation.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (
            mainNavigation.classList.contains("open") &&
            !clickedNavigation &&
            !clickedMenuButton
        ) {
            closeNavigation();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeNavigation();
        }
    });
}

function initializeWebsite() {
    currentYear.textContent = String(new Date().getFullYear());

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();
    initializeShopNavigation();
    initializePurchaseModal();
    initializeMobileNavigation();
}

initializeWebsite();
