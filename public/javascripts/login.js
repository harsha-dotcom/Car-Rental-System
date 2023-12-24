let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});
document.getElementById("registrationform").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const ID = document.getElementById("ID").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const userData = {
        name,
        ID,
        password,
        phone,
        address,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("message").textContent = data.message;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
