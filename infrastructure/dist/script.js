"use strict";
const correctTuple = {
    phone: "+12345678901",
    email: "Semyon@Volkov.com",
    password: "123456"
};
const secretTuple = {
    phone: "+12345678902",
    email: "Secret@redir.haha",
    password: "nichegoneproizoshlo"
};
document.addEventListener("DOMContentLoaded", () => {
    const inputEmailPhone = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const showButton = document.querySelector(".show-element");
    const loginForm = document.getElementById("login-form");
    const keepSignedIn = document.getElementById("keep-signed-in");
    const appleButton = document.querySelector(".apple-button");
    if (showButton) {
        showButton.addEventListener("click", () => {
            if (inputPassword.type === "password") {
                inputPassword.type = "text";
                showButton.textContent = "Hide";
            }
            else {
                inputPassword.type = "password";
                showButton.textContent = "Show";
            }
        });
    }
    if (inputEmailPhone) {
        inputEmailPhone.addEventListener("input", () => {
            if (inputEmailPhone.value.startsWith("+")) {
                inputEmailPhone.setAttribute("maxlength", "12");
            }
            else {
                inputEmailPhone.setAttribute("maxlength", "100");
            }
        });
    }
    function validateForm(event) {
        let emailOrPhone = inputEmailPhone.value.trim();
        let password = inputPassword.value.trim();
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+\d{11}$/;
        if (!emailOrPhone) {
            alert("Пожалуйста, введите email или номер телефона.");
            isValid = false;
        }
        else if (!(emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone))) {
            alert("Введите корректный email или номер телефона.");
            isValid = false;
        }
        if (!password) {
            alert("Введите пароль.");
            isValid = false;
        }
        else if (password.length < 6) {
            alert("Пароль должен содержать минимум 6 символов.");
            isValid = false;
        }
        if (!isValid) {
            event.preventDefault();
            return;
        }
        if ((emailOrPhone === correctTuple.email || emailOrPhone === correctTuple.phone) &&
            password === correctTuple.password) {
            alert("Введено правильно");
            if (keepSignedIn.checked) {
                localStorage.setItem("emailOrPhone", emailOrPhone);
                localStorage.setItem("password", password);
            }
        }
        else if ((emailOrPhone === secretTuple.email || emailOrPhone === secretTuple.phone) &&
            password === secretTuple.password) {
            alert("Секретные данные, перенаправляем...");
            if (keepSignedIn.checked) {
                localStorage.setItem("emailOrPhone", emailOrPhone);
                localStorage.setItem("password", password);
            }
            setTimeout(() => {
                window.location.href = "https://github.com/VasKuzn";
            }, 500);
            event.preventDefault();
        }
        else {
            alert("Введено неправильно");
            event.preventDefault();
        }
    }
    if (appleButton) {
        appleButton.addEventListener("click", () => {
            if (localStorage.getItem("emailOrPhone")) {
                inputEmailPhone.value = localStorage.getItem("emailOrPhone") || "";
            }
            if (localStorage.getItem("password")) {
                inputPassword.value = localStorage.getItem("password") || "";
            }
        });
    }
    loginForm.addEventListener("submit", validateForm);
});
