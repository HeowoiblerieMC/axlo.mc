"use strict";

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const currentYear = document.getElementById("currentYear");

const purchaseModal = document.getElementById("purchaseModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalConfirm = document.getElementById("modalConfirm");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const purchaseButtons = document.querySelectorAll(
    ".purchase-button[data-product]"
);

const shopTabs = document.querySelectorAll(".shop-tab");

function updateHeader() {
    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 24
    );
}

function toggleNavigation() {
    const navigationIsOpen =
        mainNavigation.classList.toggle("open");

    menuButton.classList.toggle(
        "active",
        navigationIsOpen
    );

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

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation"
    );

    document.body.classList.remove("menu-open");
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

function initializePurchaseButtons() {
    purchaseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productName =
                button.dataset.product || "This product";

            openPurchaseModal(productName);
        });
    });

    modalClose.addEventListener(
        "click",
        closePurchaseModal
    );

    modalConfirm.addEventListener(
        "click",
        closePurchaseModal
    );

    modalBackdrop.addEventListener(
        "click",
        closePurchaseModal
    );

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            purchaseModal.classList.contains("open")
        ) {
            closePurchaseModal();
        }
    });
}

function initializeRevealAnimations() {
    const revealElements =
        document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

function initializeMobileNavigation() {
    menuButton.addEventListener(
        "click",
        toggleNavigation
    );

    const navigationLinks =
        mainNavigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
        link.addEventListener(
            "click",
            closeNavigation
        );
    });

    document.addEventListener("click", (event) => {
        const clickedNavigation =
            mainNavigation.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

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

function initializeShopTabs() {
    shopTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            shopTabs.forEach((currentTab) => {
                currentTab.classList.remove("active");
            });

            tab.classList.add("active");
        });
    });

    const sections = [
        document.getElementById("permanentRanks"),
        document.getElementById("upgrades"),
        document.getElementById("jewels"),
        document.getElementById("comingSoon")
    ].filter(Boolean);

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const matchingTab =
                    document.querySelector(
                        `.shop-tab[href="#${entry.target.id}"]`
                    );

                if (!matchingTab) {
                    return;
                }

                shopTabs.forEach((tab) => {
                    tab.classList.remove("active");
                });

                matchingTab.classList.add("active");
            });
        },
        {
            threshold: 0.3,
            rootMargin: "-120px 0px -45% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

function initializeWebsite() {
    currentYear.textContent =
        String(new Date().getFullYear());

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

    updateHeader();
    initializeMobileNavigation();
    initializeRevealAnimations();
    initializePurchaseButtons();
    initializeShopTabs();
}

initializeWebsite();
