const getResponse = (chatMessageElement, message, cb) => {
  fetch("http://localhost:3000/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => {
      if (!response.ok) {
        window.location = "/login/index.html";
        return;
      }
      const reader = response.body.getReader();
      function readChunk() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            cb();
            return;
          }
          chatMessageElement.innerHTML = marked.parse(
            new TextDecoder().decode(value),
          );
          return readChunk();
        });
      }
      return readChunk();
    })
    .catch((error) => {
      console.error("Error:", error);
      chatMessageElement.textContent = "Error fetching response.";
      cb();
    });
};
