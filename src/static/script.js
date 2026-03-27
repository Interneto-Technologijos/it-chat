fetch("https://localhost:3000/api/profile", {
  method: "GET",
})
  .then((response) => {
    if (!response.ok) {
      window.location.href = "/login/index.html";
    } else {
      window.location.href = "/chat/index.html";
    }
    return response.json();
  })
  .then(() => {})
  .catch((error) => {
    console.error("Error:", error);
    alert("Error: " + error.message);
  });
