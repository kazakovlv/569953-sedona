var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
var sendButton = document.querySelector(".review__send");
var formOK = document.querySelector(".form-review-ok");
var formError = document.querySelector(".form-review-error");
var ButtonOK =  document.querySelector(".review-ok-button");
var ButtonError =  document.querySelector(".review-error-button");
var FormReview = document.querySelector(".review");
var UserName =  FormReview.querySelector("[name=user-first]");
var UserFamily =  FormReview.querySelector("[name=user-last]");
var UserName =  FormReview.querySelector("[name=user-first]");
var UserPhone =  FormReview.querySelector("[name=user-phone]");

FormReview.addEventListener("submit", function (evt) {
  if(!UserName.value) {
    evt.preventDefault();
    formError.classList.remove("visually-hidden");
    UserName.focus();
  } else {
    if(!UserFamily.value) {
      evt.preventDefault();
      formError.classList.remove("visually-hidden");
      UserFamily.focus();
    } else {
      if(!UserPhone.value) {
        evt.preventDefault();
        formError.classList.remove("visually-hidden");
        UserPhone.focus();
      } else {
        formOK.classList.remove("visually-hidden");
      }
    }
  }
});

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

ButtonOK.addEventListener("click", function() {
  formOK.classList.add("visually-hidden");
});

ButtonError.addEventListener("click", function() {
  formError.classList.add("visually-hidden");
});
