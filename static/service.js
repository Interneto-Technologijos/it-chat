const getResponse = (chatMessageElement, message, cb) => {
  fetch("http://localhost:3000/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => {
      const reader = response.body.getReader();
      function readChunk() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            cb();
            return;
          }
          chatMessageElement.innerHTML = new TextDecoder()
            .decode(value)
            .replaceAll(/\\\\n/g, "<br>");
          // .replaceAll(/\*\*(.+)\*\*/g, "<b>$1</b>");
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
