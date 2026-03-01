const form = document.getElementById("input-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop the browser from reloading the page
    const email = emailInput.value.trim()
    const password = password.value.trim();

    if (!email || !password){
        return alert("Please fill out both fields.");
    };
});

