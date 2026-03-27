const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    sendButton.disabled = true;
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.style.marginLeft = "100px";
    messageElement.style.background = "#e3f2fd";
    chatContainer.appendChild(messageElement);
    messageInput.value = "";
    const chatMessageElement = document.createElement("div");
    chatMessageElement.style.marginRight = "100px";
    chatContainer.appendChild(chatMessageElement);
    getResponse(chatMessageElement, message, () => {
      sendButton.disabled = false;
    });
  }
});
