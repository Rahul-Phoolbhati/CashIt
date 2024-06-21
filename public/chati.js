// const { io } = require("socket.io-client");

const socket = io();
// process.env.SocketIo_URL || "http://localhost:3000"


const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-message");
const chatMessages = document.querySelector(".chat-screen .messages");

const userId = ((document.cookie).split('; ')[0].split('=')[1]);
// console.log(userId);


// console.log(window.location);
const pathname = window.location.pathname; // "/api/v1/chat/64f1b013f439059eb19f2eea"
const parts = pathname.split('/');
const recId = parts[parts.length - 1]; // "64f1b013f439059eb19f2eea"

socket.on("connect", ()=>{
    
    socket.emit('getBwMessages', {userId,recId});
    socket.on('sendAllMessages',(data)=>{
        if(data){
            // console.log(data);
            data.map((dataEl)=>{
                if(dataEl.sender === userId){
                    renderMessage("my", dataEl.message);
                }else{
                    renderMessage("other", dataEl.message);
                }
            })
        }
    })
    socket.emit('addUser', {userId:userId});
    // console.log(socket.id);
})

socket.on('getMessage', data=>{
    // console.log("le bhai ");
    // console.log(data.receiverId , recId);
    if(data.receiverId === recId){
        renderMessage("other", data.message);
    }
        

})


sendButton.addEventListener("click", (e)=>{
e.preventDefault();
    const message = messageInput.value.trim();
    if(message !== ""){

        const data = {
            receiverId: recId,
            senderId: userId,
            message,
        }
        
        socket.emit("sendMessage", data);
        renderMessage("my", message);
        messageInput.value = "";
    }
})


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
