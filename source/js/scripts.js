var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
var sendButton = document.querySelector(".review__send");
var formOK = document.querySelector(".form-review-ok");
var formError = document.querySelector(".form-review-error");
var ButtonOK =  document.querySelector(".form-review-ok__button");
var ButtonError =  document.querySelector(".form-review-error__button");

navMain.classList.remove("main-nav--nojs");
navMain.classList.add("main-nav--closed");
navMain.classList.remove("main-nav--opened");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

sendButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  try
  {
    formOK.classList.remove("visually-hidden");
  }
  catch (error)
  {
    formError.classList.remove("visually-hidden");
  }
});

ButtonOK.addEventListener("click", function() {
  formOK.classList.add("visually-hidden");
});

ButtonError.addEventListener("click", function() {
  formError.classList.add("visually-hidden");
});
