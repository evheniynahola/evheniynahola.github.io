const emailInput = document.querySelector(".login-email");

emailInput.addEventListener("input", function () {
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRx.test(this.value)) {
    this.parentNode.classList.remove("error");
  } else {
    this.parentNode.classList.add("error");
  }
});

const inputItems = document.querySelectorAll(".login-input");

inputItems.forEach((item) => {
  item.addEventListener("input", function () {
    if (item.value) {
      this.parentNode.classList.add("active");
    } else {
      this.parentNode.classList.remove("active", "error");
    }
  });
});

const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", function (form) {
  form.preventDefault();
  inputItems.forEach((item) => {
    if (!item.value) {
      document.querySelector(".login-form_error").classList.add("error");
      document.querySelector(".login-form_error").textContent =
        "Не всі поля заповнені!";
      setTimeout(() => {
        document.querySelector(".login-form_error").textContent = "";
        document.querySelector(".login-form_error").classList.remove("error");
      }, 2000);
    }
  });
});
