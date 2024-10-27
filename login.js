const button = document.querySelector(".btn button");

const url = "http://127.0.0.1:5000/login"; // Make sure this URL is correct

button.addEventListener("click", async function(){
    console.log("Sending login request...");

    // Get values from input fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Prepare data to send in request body
    const dataToSend = JSON.stringify({ username, password });

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataToSend
        });

        if (response.ok) {
            let data = await response.json();
            console.log("Login successful:", data);
            // Add logic for successful login, e.g., redirect or show a success message

            const loginSuccess = document.querySelector(".success-login");
            loginSuccess.style.display = "block";   

            setTimeout(function() {
                loginSuccess.style.display = "none;"
            }, 3000);

        } else {
            console.log("Login failed:", response.statusText);
            // Handle login failure, e.g., show an error message
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

