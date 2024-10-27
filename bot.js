const botToken = "YOUR_BOT_TOKEN";
const chatId = "8081731044:AAF1Hz8MlNpN8fh1Frl83vG7MR6L8GjjsZ0"; 

document.getElementById("sendMessage").addEventListener("click", sendMessage);
document.getElementById("userMessage").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const userMessage = document.getElementById("userMessage").value;
    if (!userMessage) return;

    // Display the user's message
    displayMessage(userMessage, "user");

    // Send message to Telegram bot
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            fetchBotReply();
        } else {
            console.error("Failed to send message:", data.description);
        }
    })
    .catch(error => console.error("Error:", error));

    document.getElementById("userMessage").value = ""; // Clear input
}

function fetchBotReply() {
    // Fetch updates from the bot to retrieve the bot's response
    fetch(`https://api.telegram.org/bot${botToken}/getUpdates`)
    .then(response => response.json())
    .then(data => {
        const messages = data.result;
        if (messages.length) {
            const lastMessage = messages[messages.length - 1].message;
            if (lastMessage && lastMessage.text && lastMessage.from.is_bot) {
                displayMessage(lastMessage.text, "bot");
            }
        }
    })
    .catch(error => console.error("Error fetching bot reply:", error));
}

function displayMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    document.getElementById("messages").appendChild(messageDiv);
    messageDiv.scrollIntoView();
}
