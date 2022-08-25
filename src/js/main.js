//Header Profile Slider
window.onload = changeBg;

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
///Hire Me
const elementToView = document.querySelector(".contact");
const hireBtn = document.getElementById("hireBtn");

hireBtn.addEventListener("click", function () {
  elementToView.scrollIntoView();
});

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
const categoryTitle = document.querySelectorAll(".cat");
const allCategoryPosts = document.querySelectorAll(".all");

for (let i = 0; i < categoryTitle.length; i++) {
  categoryTitle[i].addEventListener(
    "click",
    filterPosts.bind(this, categoryTitle[i])
  );
}

function filterPosts(item) {
  changeActivePosition(item);
  for (let i = 0; i < allCategoryPosts.length; i++) {
    if (allCategoryPosts[i].classList.contains(item.attributes.id.value)) {
      allCategoryPosts[i].style.display = "block";
    } else {
      allCategoryPosts[i].style.display = "none";
    }
  }
}

function changeActivePosition(activeItem) {
  for (let i = 0; i < categoryTitle.length; i++) {
    categoryTitle[i].classList.remove("active");
  }
  activeItem.classList.add("active");
}

//
///Contact
const contactSubmit = document.getElementById("contactSubmit");
const result = document.querySelector(".result");
const modal = document.querySelector(".modal");
const close = document.getElementById("modalBtn");

close.addEventListener("click", (e) => {
  userForm.reset();
  modal.style.display = "none";
});

const userForm = document.getElementById("contactForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userWebsite = document.getElementById("userWebsite");
const userMessage = document.getElementById("userMessage");

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    name: userName.value,
    email: userEmail.value,
    website: userWebsite.value,
    message: userMessage.value,
  };
  console.log(userData);
  formData(userData);
});

function formData(userData) {
  fetch("https://borjomi.loremipsum.ge/api/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(async (response) => {
      if (response.status == 200) {
        modal.style.display = "flex";
        result.innerHTML =
          "Thank you for getting in touch! <br> We appreciate you contacting us.";
      }
      return response.json();
    })
    .catch((error) => {
      modal.style.display = "flex";
      result.innerHTML = "Something went wrong!";
      console.log(error);
    })
    .then((data) => {
      console.log(data);
      setTimeout(() => {
        userForm.reset();
        modal.style.display = "none";
      }, 10000);
    });
}
