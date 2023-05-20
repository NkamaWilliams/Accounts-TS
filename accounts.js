function validateForm() {
    var inputs = document.querySelectorAll("input");
    var error = document.getElementsByClassName("error");
    var name = inputs[0], age = inputs[1], pass = inputs[2], confirmPass = inputs[3];
    if (!validName(name.value)) {
        error[0].classList.remove("hidden");
        return false;
    }
    if (!validAge(age.value)) {
        error[1].classList.remove("hidden");
        return false;
    }
    if (!validPassword(pass.value, confirmPass.value)) {
        error[2].classList.remove("hidden");
        return false;
    }
    localStorage.setItem("name", name.value);
    localStorage.setItem("age", age.value);
    localStorage.setItem("password", pass.value);
    redirect();
    return false;
}
function redirect() {
    window.location.href = "./main.html";
}
function validName(name) {
    var pattern = /^([a-zA-z]+(\s+)?)+$/;
    if (pattern.test(name)) {
        return true;
    }
    return false;
}
function validAge(age) {
    var pattern = /^[0-9]{1,3}$/;
    if (pattern.test(age)) {
        return Number(age) > 17;
    }
    console.log("Unless you're a vampire, there's no way you are up to a thousand years old ");
    return false;
}
function validPassword(pass, confirmPass) {
    if (pass === confirmPass) {
        return true;
    }
    return false;
}