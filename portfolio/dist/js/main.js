/**
 * main.js - Site-wide functionality
 * Note: Navbar and Footer are now rendered by React (portfolio/src/main.jsx).
 * This file handles typing animation and other non-navbar/footer features.
 */

// Typing Animation
const roles = [
  "Aspiring Software Engineer",
  "Front-end Web Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Video Editor",
  "OSINT Researcher",
  "Cybersecurity Enthusiast",
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingTimeoutId = null;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBetweenRoles = 1500;

function getRoleTextElement() {
  return document.getElementById("role-text");
}

function stopTypingAnimation() {
  if (typingTimeoutId !== null) {
    clearTimeout(typingTimeoutId);
    typingTimeoutId = null;
  }
}

function resetTypingAnimation() {
  stopTypingAnimation();
  currentRoleIndex = 0;
  currentCharIndex = 0;
  isDeleting = false;

  const roleTextElement = getRoleTextElement();
  if (roleTextElement) {
    roleTextElement.textContent = "";
  }
}

function type() {
  const roleTextElement = getRoleTextElement();
  if (!roleTextElement) {
    stopTypingAnimation();
    return;
  }

  const currentRole = roles[currentRoleIndex];

  if (isDeleting) {
    currentCharIndex--;
  } else {
    currentCharIndex++;
  }

  roleTextElement.textContent = currentRole.substring(0, currentCharIndex);

  let delay = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && currentCharIndex === currentRole.length) {
    delay = pauseBetweenRoles;
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    delay = 500;
  }

  stopTypingAnimation();
  typingTimeoutId = setTimeout(type, delay);
}

function startTypingAnimation() {
  const roleTextElement = getRoleTextElement();
  if (!roleTextElement) {
    return;
  }

  resetTypingAnimation();
  type();
}

window.startTypingAnimation = startTypingAnimation;
window.resetTypingAnimation = resetTypingAnimation;

function handleTypingAnimationLifecycle() {
  const roleTextElement = getRoleTextElement();
  if (roleTextElement) {
    startTypingAnimation();
  } else {
    stopTypingAnimation();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", handleTypingAnimationLifecycle);
} else {
  handleTypingAnimationLifecycle();
}

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    handleTypingAnimationLifecycle();
  }
});