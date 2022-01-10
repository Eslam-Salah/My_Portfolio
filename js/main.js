// Create class for header to background
let header = document.querySelector("header");

function sticky() {
  header.classList.toggle("sticky", window.scrollY > 0);
}

window.addEventListener("scroll", sticky);
window.addEventListener("load", sticky);

// add class on Navbar
let bars = document.querySelector("header .bars i");
let navBar = document.querySelector("header .navbar");

bars.addEventListener("click", () => {
  navBar.classList.toggle("active");
  bars.classList.toggle("fa-times");
});

document.addEventListener("click", (e) => {
  if (e.target !== bars && e.target !== navBar) {
    navBar.classList.remove("active");
    bars.classList.remove("fa-times");
  }
});

// Setting Box
let settingBox = document.querySelector(".setting-box");
let settingToggle = document.querySelector(".setting-toggle");
let settingIcon = document.querySelector(".setting-toggle i");
let ulColorList = document.querySelector(".colors-list");
let liColor = document.querySelectorAll(".colors-list li");

settingToggle.addEventListener("click", () => {
  settingBox.classList.toggle("open");
  settingIcon.classList.toggle("fa-spin");
});

document.addEventListener("click", (e) => {
  if (e.target !== settingBox && e.target !== settingIcon) {
    settingBox.classList.remove("open");
    settingIcon.classList.remove("fa-spin");
  }
});

settingBox.onclick = function (e) {
  e.stopPropagation();
};

// for localStorage liColor
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--primary-color", mainColors);

  // Remove all active class #border from li
  liColor.forEach((el) => {
    el.classList.remove("active");
    // add active class with data-color === local storage
    if (el.dataset.color == mainColors) {
      el.classList.add("active");
    }
  });
}

liColor.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--primary-color", e.target.dataset.color);
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// for Night Mode
let nightMode = document.querySelector(".night-mode i");
let textMode = document.querySelector(".night-mode h4");

if (localStorage.getItem("theme") === "dark-theme") {
  document.body.classList.add("dark-theme");
  nightMode.classList.toggle("fa-sun");
} else {
  if (textMode.textContent == "Night Mode") {
    textMode.textContent = "Night Mode";
  } else {
    textMode.textContent = "Light Mode";
  }
}

nightMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  nightMode.classList.toggle("fa-sun");
  if (textMode.textContent == "Night Mode") {
    textMode.textContent = "Light Mode";
  } else {
    textMode.textContent = "Night Mode";
  }
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-theme") ? "dark-theme" : "light"
  );
});

// Craete popup for project section
let allImages = document.querySelectorAll(".projects-box img");
let closeModal = document.querySelector(".modal .fa-times");
let modal = document.querySelector(".projects .modal");
let overlay = document.querySelector(".projects .overlay");

allImages.forEach((el) => {
  el.addEventListener("click", () => {
    modal.style.cssText = `opacity: 1; visibility: visible;`;
    overlay.setAttribute("style", "opacity: 1; pointer-events: all;");
    document.querySelector(".img-modal").src = el.src;
    document.querySelector(".modal-title").innerHTML = el.alt;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.cssText = `opacity: 0; visibility: hidden;`;
  overlay.setAttribute("style", "opacity: 0; pointer-events: none;");
});

// create filter for project section
let switcherLis = document.querySelectorAll(".projects-filter li");
let myProjects = document.querySelectorAll(".projects-box");

switcherLis.forEach((li) => {
  li.addEventListener("click", () => {
    switcherLis.forEach((el) => {
      el.classList.remove("active");
    });
    li.classList.add("active");

    myProjects.forEach((project) => {
      project.style.display = "none";
    });

    document.querySelectorAll(li.dataset.cat).forEach((el) => {
      el.style.display = "block";
    });
  });
});

// Create scroll spy when scroll
let sections = document.querySelectorAll("section");
let navlink = document.querySelectorAll("header .navbar li a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navlink.forEach((links) => {
        links.classList.remove("active");
        document.querySelector("header .navbar li a[href*=" + id + "]").classList.add("active");
      });
    }
  });
};

// Function for remove and add active class
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Create scroll Top
let toTop = document.querySelector(".top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// typing text animation for home section
let typeTextSpan = document.querySelectorAll(".typed-text");
let cursorSpan = document.querySelectorAll(".cursor");

let textArray = ["Web Developer", "Designer", "Freelancer"];
let typingDelay = 200;
let erasingDelay = 50;
let newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    cursorSpan.forEach((ele) => {
      if (!ele.classList.contains("typing")) ele.classList.add("typing");
    });
    typeTextSpan.forEach((el) => {
      el.textContent += textArray[textArrayIndex].charAt(charIndex);
    });
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    // erase
    cursorSpan.forEach((ele) => {
      ele.classList.remove("typing");
    });
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    // erase
    cursorSpan.forEach((ele) => {
      if (!ele.classList.contains("typing")) ele.classList.add("typing");
    });
    typeTextSpan.forEach(
      (el) => (el.textContent = textArray[textArrayIndex].substring(0, charIndex - 1))
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    // type
    cursorSpan.forEach((ele) => {
      ele.classList.remove("typing");
    });
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, newTextDelay);
});
