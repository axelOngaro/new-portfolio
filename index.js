import LocomotiveScroll from "locomotive-scroll";

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  direction: "vertical",
});

const darkBtn = document.querySelector(".dark-btn");
darkBtn.onclick = function () {
  const body = document.querySelector(".body");
  body.classList.toggle("dark");
};

const changeColor = (e) => {
  console.log("coucou");
};
