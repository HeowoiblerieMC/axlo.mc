"use strict";

const SERVER_IP = "play.axlomc.net";
const TYPEWRITER_LINES = [
    "Explore your world.",
    "Make your life cool."
];

const TYPE_SPEED = 58;
const LINE_PAUSE = 500;
const START_DELAY = 900;

const typewriterText = document.getElementById("typewriterText");
const typewriterCursor = document.getElementById("typewriterCursor");
const heroActions = document.getElementById("heroActions");
const serverAddress = document.getElementById("serverAddress");
const copyIpButton = document.getElementById("copyIpButton");
const copyIpButtonText = document.getElementById("copyIpButtonText");
const networkCopyButton = document.getElementById("networkCopyButton");
const networkCopyLabel = document.getElementById("networkCopyLabel");
const toast = document.getElementById("toast");
const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const currentYear = document.getElementById("currentYear");

let lineIndex = 0;
let characterIndex = 0;
let renderedText = "";
let toastTimer = null;
let copyResetTimer = null;

function typeNextCharacter() {
    if (lineIndex >= TYPEWRITER_LINES.length) {
        finishTypewriter();
        return;
    }

    const currentLine = TYPEWRITER_LINES[lineIndex];

    if (characterIndex < currentLine.length) {
        renderedText += currentLine.charAt(characterIndex);
        typewriterText.textContent = renderedText;
        characterIndex += 1;
        window.setTimeout(typeNextCharacter, TYPE_SPEED);
        return;
    }

    lineIndex += 1;
    characterIndex = 0;

    if (lineIndex < TYPEWRITER_LINES.length) {
        renderedText += " ";
        typewriterText.textContent = renderedText;
        window.setTimeout(typeNextCharacter, LINE_PAUSE);
        return;
    }

    finishTypewriter();
}

function finishTypewriter() {
    typewriterCursor.classList.add("hidden");

    window.setTimeout(() => {
        serverAddress.classList.add("visible");
    }, 180);

    window.setTimeout(() => {
        heroActions.classList.add("visible");
    }, 450);
}

async function copyServerIp() {
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

    if (copied) {
        showCopiedState();
        showToast("Server IP copied.");
    } else {
        showToast(`Copy this address: ${SERVER_IP}`);
    }
}

function fallbackCopy(text) {
    const temporaryInput = document.createElement("textarea");

    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.top = "-9999px";
    temporaryInput.style.left = "-9999px";

    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    temporaryInput.setSelectionRange(0, temporaryInput.value.length);

    let success = false;

    try {
        success = document.execCommand("copy");
    } catch (error) {
        success = false;
    }

    document.body.removeChild(temporaryInput);

    return success;
}

function showCopiedState() {
    window.clearTimeout(copyResetTimer);

    copyIpButton.classList.add("copied");
    copyIpButtonText.textContent = "IP Copied";
    networkCopyLabel.textContent = "Copied";

    copyResetTimer = window.setTimeout(() => {
        copyIpButton.classList.remove("copied");
        copyIpButtonText.textContent = "Copy Server IP";
        networkCopyLabel.textContent = "Copy IP";
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

function handleHeaderState() {
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

function initializeRevealAnimation() {
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
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

function initializeNavigationLinks() {
    const navigationLinks = mainNavigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("click", (event) => {
        const clickedInsideNavigation = mainNavigation.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (
            mainNavigation.classList.contains("open") &&
            !clickedInsideNavigation &&
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

function initialize() {
    currentYear.textContent = String(new Date().getFullYear());

    copyIpButton.addEventListener("click", copyServerIp);
    networkCopyButton.addEventListener("click", copyServerIp);
    menuButton.addEventListener("click", toggleNavigation);

    window.addEventListener("scroll", handleHeaderState, {
        passive: true
    });

    handleHeaderState();
    initializeRevealAnimation();
    initializeNavigationLinks();

    window.setTimeout(typeNextCharacter, START_DELAY);
}

initialize();
