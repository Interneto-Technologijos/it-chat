const getResponse = (chatMessageElement, message, cb) => {
  fetch("http://localhost:3000/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((data) => {
      chatMessageElement.textContent = data.response;
      cb();
    })
    .catch((error) => {
      console.error("Error:", error);
      chatMessageElement.textContent = "Error fetching response.";
      cb();
    });
};
