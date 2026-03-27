const loginButton = document.getElementById("loginButton");

const studentIdInput = document.getElementById("studentId");

loginButton.disabled = true;

studentIdInput.addEventListener("input", () => {
  const value = studentIdInput.value.trim();
  loginButton.disabled = !/^\d{8}$/.test(value);
});

loginButton.addEventListener("click", () => {
  const studentId = studentIdInput.value.trim();
  if (!studentId) {
    alert("Please enter your student ID.");
    return;
  }
  loginButton.disabled = true;
  fetch("https://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(() => {
      window.location.href = "/chat/index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error: " + error.message);
    })
    .finally(() => {
      loginButton.disabled = false;
    });
});
