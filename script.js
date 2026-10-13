"use strict";

const SERVER_IP = "play.axlomc.net";
const TYPEWRITER_TEXT = "Explore your world. Make your life cool.";
const TYPEWRITER_SPEED = 58;
const TYPEWRITER_DELAY = 900;

const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const currentYear = document.getElementById("currentYear");

const typewriterText = document.getElementById("typewriterText");
const typewriterCursor = document.getElementById("typewriterCursor");
const serverAddress = document.getElementById("serverAddress");
const heroActions = document.getElementById("heroActions");

const copyIpButton = document.getElementById("copyIpButton");
const copyIpButtonText = document.getElementById("copyIpButtonText");
const joinCopyButton = document.getElementById("joinCopyButton");
const joinCopyLabel = document.getElementById("joinCopyLabel");
const toast = document.getElementById("toast");

let typewriterIndex = 0;
let toastTimer = null;
let copyTimer = null;

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

function runTypewriter() {
    if (typewriterIndex < TYPEWRITER_TEXT.length) {
        typewriterText.textContent += TYPEWRITER_TEXT.charAt(typewriterIndex);
        typewriterIndex += 1;
        window.setTimeout(runTypewriter, TYPEWRITER_SPEED);
        return;
    }

    typewriterCursor.classList.add("hidden");

    window.setTimeout(() => {
        serverAddress.classList.add("visible");
    }, 180);

    window.setTimeout(() => {
        heroActions.classList.add("visible");
    }, 420);
}

function fallbackCopy(value) {
    const textarea = document.createElement("textarea");

    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";

    document.body.appendChild(textarea);
    textarea.select();

    let success = false;

    try {
        success = document.execCommand("copy");
    } catch (error) {
        success = false;
    }

    document.body.removeChild(textarea);

    return success;
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

    if (!copied) {
        showToast(`Server IP: ${SERVER_IP}`);
        return;
    }

    window.clearTimeout(copyTimer);

    copyIpButton.classList.add("copied");
    copyIpButtonText.textContent = "IP Copied";
    joinCopyLabel.textContent = "Copied";

    showToast("Server IP copied.");

    copyTimer = window.setTimeout(() => {
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

function initializeRevealAnimations() {
    const elements = document.querySelectorAll
