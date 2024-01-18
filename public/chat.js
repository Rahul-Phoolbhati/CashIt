document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-message");
    const chatMessages = document.querySelector(".chat-screen .messages");
    const recipientUsername = "RecipientUsername"; // Replace with the recipient's username

    // Set the username when the user joins
    socket.emit("setUsername", "YourUsername"); // Replace with the user's username

    // Handle incoming private messages
    socket.on("privateMessage", (message) => {
        renderMessage("other", message);
    });

    // Handle other user joining
    socket.on("userJoined", (username) => {
        renderMessage("system", `${username} joined the chat.`);
    });

    // Handle other user leaving
    socket.on("userLeft", (username) => {
        renderMessage("system", `${username} left the chat.`);
    });

    // Send a private message
    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message !== "") {
            renderMessage("my", { text: message });
            socket.emit("privateMessage", { to: recipientUsername, message });
            messageInput.value = "";
        }
    });

    function renderMessage(type, message) {
        // ...
        // Your message rendering code remains the same as in the previous example
        if (type === "my") {
                        // Render user's own message
                        const el = document.createElement("div");
                        el.classList.add("message", "my-message");
                        el.innerHTML = `
                            <div>
                                <div class="name">You</div>
                                <div class="text">${message.text}</div>
                            </div>
                        `;
                        chatMessages.appendChild(el);
                    } else if (type === "other") {
                        // Render messages from others
                        const el = document.createElement("div");
                        el.classList.add("message", "other-message");
                        el.innerHTML = `
                            <div>
                                <div class="name">Other User</div>
                                <div class="text">${message}</div>
                            </div>
                        `;
                        chatMessages.appendChild(el);
                    }
            
                    // Scroll to the bottom of the chat container
                    chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

