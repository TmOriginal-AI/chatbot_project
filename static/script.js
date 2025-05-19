function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="user-msg"><strong>אתה:</strong> ${userInput}</div>`;
    document.getElementById("user-input").value = "";

    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // אפקט הקלדה
        typeBotReply(data.reply);
    })
    .catch(error => {
        chatBox.innerHTML += `<div class="bot-msg error"><strong>שגיאה:</strong> לא ניתן לקבל תשובה</div>`;
    });
}

function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function autoGrow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
}

// פונקציית אפקט הקלדה
function typeBotReply(text) {
    const chatBox = document.getElementById("chat-box");
    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-msg");
    botMsg.innerHTML = '<strong>בוט:</strong> ';
    chatBox.appendChild(botMsg);

    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            botMsg.innerHTML += text.charAt(i);
            i++;
            chatBox.scrollTop = chatBox.scrollHeight;
        } else {
            clearInterval(interval);
        }
    }, 30); // מהירות ההקלדה
}
