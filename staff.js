"use strict";

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const currentYear = document.getElementById("currentYear");

const staffTabs = document.querySelectorAll("[data-staff-filter]");
const staffCards = document.querySelectorAll("[data-staff-category]");
const emptyFilterMessage = document.getElementById("emptyFilterMessage");

const applicationButton = document.getElementById("applicationButton");
const toast = document.getElementById("toast");

let toastTimer = null;

function updateHeader() {
    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 24
    );
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

function filterStaff(filterName) {
    let visibleCount = 0;

    staffTabs.forEach((tab) => {
        tab.classList.toggle(
            "active",
            tab.dataset.staffFilter === filterName
        );
    });

    staffCards.forEach((card) => {
        const categories = card.dataset.staffCategory.split(" ");

        const shouldDisplay =
            filterName === "all" ||
            categories.includes(filterName);

        card.classList.toggle("filtered-out", !shouldDisplay);

        if (shouldDisplay) {
            visibleCount += 1;
        }
    });

    emptyFilterMessage.hidden = visibleCount !== 0;
}

function initializeStaffFilters() {
    staffTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            filterStaff(tab.dataset.staffFilter);
        });
    });
}

function showToast(message) {
    window.clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.add("visible");

    toastTimer = window.setTimeout(() => {
        toast.classList.remove("visible");
    }, 2400);
}

function initializeApplicationButton() {
    applicationButton.addEventListener("click", () => {
        showToast("Staff applications are currently closed.");
    });
}

function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

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
    initializeMobileNavigation();
    initializeStaffFilters();
    initializeRevealAnimations();
    initializeApplicationButton();
}

initializeWebsite();
