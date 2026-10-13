"use strict";

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const currentYear = document.getElementById("currentYear");

const categoryButtons = document.querySelectorAll("[data-category]");
const storePanels = document.querySelectorAll("[data-panel]");
const footerCategoryButtons = document.querySelectorAll(
    "[data-footer-category]"
);

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
    const isOpen = mainNavigation.classList.toggle("open");

    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    document.body.classList.toggle("menu-open", isOpen);
}

function closeNavigation() {
    mainNavigation.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
}

function showCategory(categoryName, updateUrl = true) {
    categoryButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.category === categoryName
        );
    });

    storePanels.forEach((panel) => {
        const isSelected = panel.dataset.panel === categoryName;

        panel.hidden = !isSelected;
        panel.classList.toggle("active", isSelected);
    });

    if (updateUrl) {
        window.history.replaceState(
            null,
            "",
            `#${categoryName}`
        );
    }

    const navigationSection = document.querySelector(
        ".category-navigation-section"
    );

    const destination =
        navigationSection.offsetTop + navigationSection.offsetHeight - 68;

    window.scrollTo({
        top: destination,
        behavior: "smooth"
    });
}

function initializeCategories() {
    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showCategory(button.dataset.category);
        });
    });

    footerCategoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showCategory(button.dataset.footerCategory);
        });
    });

    const categoryFromUrl = window.location.hash.slice(1);
    const validCategories = [
        "ranks",
        "upgrades",
        "jewels",
        "tags"
    ];

    if (validCategories.includes(categoryFromUrl)) {
        showCategory(categoryFromUrl, false);
    } else {
        showCategory("ranks", false);
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
    initializeCategories();
    initializePurchaseModal();
    initializeMobileNavigation();
}

initializeWebsite();
