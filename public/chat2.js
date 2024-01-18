const socket = io('http://localhost:8000');

const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-message");
    const chatMessages = document.querySelector(".chat-screen .messages");



const name = prompt("Enter the name");
socket.emit('new-user-joined',name);

socket.on('recieve', data=>{
    renderMessage("other",data.message);
})

sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
        renderMessage("my",  message );
        socket.emit('send', message);
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
                            <div class="text">${message}</div>
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


