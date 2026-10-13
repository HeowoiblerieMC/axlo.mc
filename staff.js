"use strict";

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const currentYear = document.getElementById("currentYear");

const staffTabs = document.querySelectorAll("[data-filter]");
const staffCards = document.querySelectorAll("[data-groups]");
const applicationButton = document.getElementById("applicationButton");
const toast = document.getElementById("toast");

let toastTimer = null;

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

function filterStaff(filterName) {
    staffTabs.forEach((tab) => {
        tab.classList.toggle(
            "active",
            tab.dataset.filter === filterName
        );
    });

    staffCards.forEach((card) => {
        const groups = card.dataset.groups.split(" ");
        const visible = filterName === "all" || groups.includes(filterName);

        card.classList.toggle("filtered-out", !visible);
    });
}

function initializeFilters() {
    staffTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            filterStaff(tab.dataset.filter);
        });
    });
}

function showToast(message) {
    window.clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.add("visible");

    toastTimer = window.setTimeout(() => {
        toast.classList.remove("visible");
    }, 2300);
}

function initializeApplicationButton() {
    applicationButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showToast("Staff applications are currently closed.");
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
    initializeFilters();
    initializeApplicationButton();
    initializeRgbInteractions();
}

initializeWebsite();
