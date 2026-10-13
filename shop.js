""use strict";

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const currentYear = document.getElementById("currentYear");

const shopTabs = document.querySelectorAll("[data-category]");
const shopPanels = document.querySelectorAll("[data-panel]");

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
    document.body.classList.toggle("menu-open", isOpen);
}

function closeNavigation() {
    mainNavigation.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

function showCategory(categoryName, scrollToContent = true) {
    shopTabs.forEach((tab) => {
        tab.classList.toggle(
            "active",
            tab.dataset.category === categoryName
        );
    });

    shopPanels.forEach((panel) => {
        const isActive = panel.dataset.panel === categoryName;
        panel.hidden = !isActive;
    });

    window.history.replaceState(null, "", `#${categoryName}`);

    if (scrollToContent) {
        const navigation = document.querySelector(".shop-navigation-section");

        window.scrollTo({
            top: navigation.offsetTop + navigation.offsetHeight - 70,
            behavior: "smooth"
        });
    }
}

function openPurchaseModal(productName) {
    modalTitle.textContent = productName;

    modalDescription.textContent =
        `${productName} purchasing is not available yet. ` +
        "The official AxloMC Store will open before launch.";

    purchaseModal.classList.add("open");
    purchaseModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closePurchaseModal() {
    purchaseModal.classList.remove("open");
    purchaseModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function initializeShopTabs() {
    shopTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            showCategory(tab.dataset.category);
        });
    });

    const requestedCategory = window.location.hash.slice(1);
    const validCategories = ["ranks", "upgrades", "jewels", "tags"];

    if (validCategories.includes(requestedCategory)) {
        showCategory(requestedCategory, false);
    } else {
        showCategory("ranks", false);
    }
}

function initializePurchaseModal() {
    purchaseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            openPurchaseModal(button.dataset.product);
        });
    });

    modalClose.addEventListener("click", closePurchaseModal);
    modalConfirm.addEventListener("click", closePurchaseModal);
    modalBackdrop.addEventListener("click", closePurchaseModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePurchaseModal();
        }
    });
}

function initializeRgbInteractions() {
    const elements = document.querySelectorAll(".rgb-interactive");

    elements.forEach((element) => {
        element.addEventListener("click", (event) => {
            elements.forEach((currentElement) => {
                if (currentElement !== element) {
                    currentElement.classList.remove("rgb-active");
                }
            });

            element.classList.toggle("rgb-active");
            event.stopPropagation();
        });
    });

    document.addEventListener("click", () => {
        elements.forEach((element) => {
            element.classList.remove("rgb-active");
        });
    });
}

function initializeNavigation() {
    menuButton.addEventListener("click", toggleNavigation);

    mainNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeNavigation();
        }
    });
}

function initializeWebsite() {
    currentYear.textContent = String(new Date().getFullYear());

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();
    initializeNavigation();
    initializeShopTabs();
    initializePurchaseModal();
    initializeRgbInteractions();
}

initializeWebsite();
