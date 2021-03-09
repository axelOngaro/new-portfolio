import LocomotiveScroll from "locomotive-scroll";

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  direction: "vertical",
});
console.log(scroll);
scroll.on("call", (args) => {
  const skills = document.querySelector(".skills");
  skills.style.backgroundColor = args;
});

const turnBlue = () => {
  const front = document.querySelector(".front");
  front.style.color = blue;
};

const darkBtn = document.querySelector(".dark-btn");
const fontBtn = document.querySelector(".font-btn");
const fontColorList = ["black", "blue", "green", "red"];
let fontColor = fontColorList[0];

darkBtn.onclick = function () {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
};

fontBtn.addEventListener("click", (event) => {
  const body = document.querySelector("body");
  body.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
});
