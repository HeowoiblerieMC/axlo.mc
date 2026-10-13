"use strict";

const SERVER_IP = "play.axlomc.net";
const TYPEWRITER_TEXT = "Explore your world. Make your life cool.";
const TYPEWRITER_SPEED = 58;
const TYPEWRITER_START_DELAY = 1100;

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");

const typewriterText = document.getElementById("typewriterText");
const typewriterCursor = document.getElementById("typewriterCursor");

const serverAddress = document.getElementById("serverAddress");
const heroButtons = document.getElementById("heroButtons");

const copyIpButton = document.getElementById("copyIpButton");
const copyIpButtonText = document.getElementById("copyIpButtonText");

const joinCopyButton = document.getElementById("joinCopyButton");
const joinCopyLabel = document.getElementById("joinCopyLabel");

const toast = document.getElementById("toast");
const currentYear = document.getElementById("currentYear");

let typewriterIndex = 0;
let toastTimer = null;
let copyResetTimer = null;

function runTypewriter() {
    if (typewriterIndex < TYPEWRITER_TEXT.length) {
        typewriterText.textContent += TYPEWRITER_TEXT.charAt(typewriterIndex);
        typewriterIndex += 1;

        window.setTimeout(runTypewriter, TYPEWRITER_SPEED);
        return;
    }

    completeHeroIntroduction();
}

function completeHeroIntroduction() {
    typewriterCursor.classList.add("hidden");

    window.setTimeout(() => {
        serverAddress.classList.add("visible");
    }, 180);

    window.setTimeout(() => {
        heroButtons.classList.add("visible");
    }, 450);
}

async function copyServerIp() {
    let copySucceeded = false;

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(SERVER_IP);
            copySucceeded = true;
        } catch (error) {
            copySucceeded = false;
        }
    }

    if (!copySucceeded) {
        copySucceeded = fallbackCopy(SERVER_IP);
    }

    if (copySucceeded) {
        showCopiedState();
        showToast("Server IP copied.");
        return;
    }

    showToast(`Server IP: ${SERVER_IP}`);
}

function fallbackCopy(text) {
    const temporaryTextarea = document.createElement("textarea");

    temporaryTextarea.value = text;
    temporaryTextarea.setAttribute("readonly", "");
    temporaryTextarea.style.position = "fixed";
    temporaryTextarea.style.top = "-9999px";
    temporaryTextarea.style.left = "-9999px";

    document.body.appendChild(temporaryTextarea);

    temporaryTextarea.select();
    temporaryTextarea.setSelectionRange(
        0,
        temporaryTextarea.value.length
    );

    let copySucceeded = false;

    try {
        copySucceeded = document.execCommand("copy");
    } catch (error) {
        copySucceeded = false;
    }

    document.body.removeChild(temporaryTextarea);

    return copySucceeded;
}

function showCopiedState() {
    window.clearTimeout(copyResetTimer);

    copyIpButton.classList.add("copied");
    copyIpButtonText.textContent = "IP Copied";
    joinCopyLabel.textContent = "Copied";

    copyResetTimer = window.setTimeout(() => {
        copyIpButton.classList.remove("copied");
        copyIpButtonText.textContent = "Copy Server IP";
        joinCopyLabel.textContent = "Copy IP";
    }, 2200);
}

function showToast(message) {
    window.clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.add("visible");

    toastTimer = window.setTimeout(() => {
        toast.classList.remove("visible");
    }, 2300);
}

function updateHeader() {
    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 24
    );
}

function toggleNavigation() {
    const navigationIsOpen = mainNavigation.classList.toggle("open");

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

function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

function initializeNavigation() {
    const navigationLinks = mainNavigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
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

    copyIpButton.addEventListener("click", copyServerIp);
    joinCopyButton.addEventListener("click", copyServerIp);
    menuButton.addEventListener("click", toggleNavigation);

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();
    initializeRevealAnimations();
    initializeNavigation();

    window.setTimeout(
        runTypewriter,
        TYPEWRITER_START_DELAY
    );
}

initializeWebsite();
