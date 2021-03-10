import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  direction: "vertical",
});

scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(".data-scroll-container", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector(".data-scroll-container").style.transform
    ? "transform"
    : "fixed",
});
gsap.to(".moon", {
  ScrollTrigger: ".work",
  rotation: 720,
  duration: 3,
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

gsap.from(".intro", { opacity: 0, duration: 1, y: -50, stagger: 0.6 });

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
  body.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
});

// Copy to clipboard
const email = document.querySelector(".email");
email.onclick = () => {
  const text = document.querySelector("#email-address").innerText;
  const elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
};
