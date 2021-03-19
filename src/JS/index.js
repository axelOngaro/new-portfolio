import LocomotiveScroll from "locomotive-scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,
});

locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".smooth-scroll").style.transform
    ? "transform"
    : "fixed",
});

const titleAnimation = (target, trigger, x, color) => {
  gsap.to(target, {
    x: x,
    color: color,
    opacity: 1,
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: trigger,
      start: "0 50%",
      scrub: true,
      end: "top top",
    },
  });
};
const horizontalScroll = (target) => {
  gsap.to(target, {
    x: -1000,
    scrollTrigger: {
      trigger: target,
      scroller: ".smooth-scroll",
      scrub: true,
    },
  });
};

titleAnimation(".work-title--2", ".work", 750, "red");
titleAnimation(".work-title--3", ".work", 1500, "blue");
titleAnimation(".skills-title--2", ".skills-title", 750, "red");
titleAnimation(".skills-title--3", ".skills-title", 1500, "blue");

horizontalScroll(".front");
horizontalScroll(".back");
horizontalScroll(".db");
horizontalScroll(".devops");
horizontalScroll(".cloud");

gsap.to(".header", {
  scrollTrigger: {
    trigger: ".skills",
    scroller: ".smooth-scroll",
    scrub: "true",
    start: "top top",
    endTrigger: ".work",
    end: "top top",
    toggleClass: {
      targets: ".header",
      className: "white",
    },
  },
});

gsap.to(".skills", {
  opacity: 1,
  scrollTrigger: {
    scroller: ".smooth-scroll",
    trigger: ".skills",
    endTrigger: ".back",
    end: "50% 50%",
    scrub: true,
  },
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".skills",
    scroller: ".smooth-scroll",
    start: "50vh",
    scrub: true,
  },
});

tl.to(".skills", {
  backgroundColor: "rgb(7, 90, 7)",
});
tl.to(".skills", {
  backgroundColor: "red",
});
tl.to(".skills", {
  backgroundColor: "rgb(192, 93, 27)",
});
tl.to(".skills", {
  backgroundColor: "rgb(24, 23, 23)",
});

gsap.to(".contact-banner--text", {
  x: -500,
  scrollTrigger: {
    scroller: ".smooth-scroll",
    trigger: ".contact-banner",
    scrub: true,
  },
});

//Loading animations
gsap.from(".intro", { opacity: 0, duration: 1, y: -50, stagger: 0.5 });
gsap.from(".header", { opacity: 0, duration: 2 });

//Button event handlers
const darkBtn = document.querySelector(".dark-btn");
const fontBtn = document.querySelector(".font-btn");

darkBtn.onclick = () => {
  const body = document.querySelector("body");
  const moon = document.querySelector(".moon");
  const sun = document.querySelector(".sun");
  body.classList.toggle("dark");
  moon.classList.toggle("hidden");
  sun.classList.toggle("hidden");
};

fontBtn.addEventListener("click", (event) => {
  const body = document.querySelector("body");
  gsap.to(body, {
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    duration: 1,
  });
});

//Hover effects
const email = document.querySelector(".email");
const header = document.querySelector(".header");
const contactLinks = document.querySelector(".contact-links");

email.addEventListener("mouseenter", () => {
  header.classList.toggle("blured");
  contactLinks.classList.toggle("blured");
});
email.addEventListener("mouseleave", () => {
  header.classList.toggle("blured");
  contactLinks.classList.toggle("blured");
});

// Copy to clipboard
email.onclick = () => {
  const text = document.querySelector("#email-address").innerText;
  const elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
};

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
