const getResponse = (chatMessageElement, message, cb) => {
  const reply =
    "I see you wrote a message. Here is my reply. And this is not the end. I would like to tell much more in order more text is returned and then the client who I demo this service would see this reply coming word by word.";
  const words = reply.split(" ");
  let i = 0;
  chatMessageElement.textContent = "";

  const interval = setInterval(() => {
    if (i < words.length) {
      chatMessageElement.textContent += (i === 0 ? "" : " ") + words[i];
      i++;
    } else {
      clearInterval(interval);
      cb();
    }
  }, 100);
};
