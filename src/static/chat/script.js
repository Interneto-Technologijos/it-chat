const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const logoutButton = document.getElementById("logoutButton");

sendButton.disabled = true;

messageInput.addEventListener("input", () => {
  const message = messageInput.value.trim();
  sendButton.disabled =
    typeof message !== "string" || message.length < 10 || message.length > 255;
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
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
});

logoutButton.addEventListener("click", () => {
  logoutButton.disabled = true;
  fetch("https://localhost:3000/api/logout", {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(() => {
      window.location.href = "/login/index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error: " + error.message);
    })
    .finally(() => {
      logoutButton.disabled = false;
    });
});
