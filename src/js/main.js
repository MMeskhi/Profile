//
///Header Profile Slider
// function changeBg() {
//   const images = [
//     'url("src/img/profileimg-1.png")',
//     'url("src/img/profileimg-2.png")',
//     'url("src/img/profileimg-3.png")',
//   ];

// const profileBg = document.querySelector(".profileBg");
//   const bg = images[Math.floor(Math.random() * images.length)];
//   profileBg.style.backgroundImage = bg;
// }
// setInterval(changeBg, 5000);

let i = 0;
let images = [];

function changeBg() {
  images[0] = 'url("src/img/profileimg-1.png")';
  images[1] = 'url("src/img/profileimg-2.png")';
  images[2] = 'url("src/img/profileimg-3.png")';

  const profileBg = document.querySelector(".profileBg");
  profileBg.style.backgroundImage = images[i];

  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout("changeBg()", 5000);
}

window.addEventListener("DOMContentLoaded", (event) => {
  changeBg();
});

//
///Skills Bar
const skills = document.querySelectorAll("#skills-bar");

const animate = function (el) {
  el.animate(
    [
      {
        width: 0,
      },
      {
        width: el.getAttribute("data-percentage"),
      },
    ],
    {
      duration: 2000,
      easing: "ease-out",
    }
  );
  el.style.width = el.getAttribute("data-percentage");
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      Array.from(skills).forEach(animate);
    }
  });
});

observer.observe(document.querySelector(".skills-cont"));

//
///Review Slider
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const changeSlide = (n) => {
  for (slide of slides) {
    slide.classList.remove("active");
  }
  slides[n].classList.add("active");
};

const changeDot = (n) => {
  for (dot of dots) {
    dot.classList.remove("active");
  }
  dots[n].classList.add("active");
};

dots.forEach((slide, iDot) => {
  slide.addEventListener("click", () => {
    i = iDot;
    changeDot(i);
    changeSlide(i);
  });
});

//
///Projects Menu
