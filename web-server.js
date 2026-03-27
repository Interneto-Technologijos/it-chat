require("dotenv").config();

const express = require("express");
const axios = require("axios");
const path = require("path");

// axios.interceptors.request.use((request) => {
//   console.log("Axios Request:", {
//     url: request.url,
//     method: request.method,
//     headers: request.headers,
//     data: request.data,
//   });
//   return request;
// });

// axios.interceptors.response.use(
//   (response) => {
//     console.log("Axios Response:", {
//       status: response.status,
//       data: response.data,
//     });
//     return response;
//   },
//   (error) => {
//     console.log("Axios Error:", {
//       message: error.message,
//       status: error.response.status,
//       data: error.response.data,
//     });
//     return Promise.reject(error);
//   },
// );

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "static")));

app.post("/api/message", (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);

  // axios
  //   .post("https://ogs.google.com/u/0/_/OneGoogleWidgetUi/idv/", ``, {
  //     headers: {
  //       Cookie: process.env.COOKIE,
  //     },
  //   })
  //   .then((response) => {
  //     const setCookieHeaders = response.headers["set-cookie"] || [];
  //     const cookieString = setCookieHeaders
  //       .map((cookie) => cookie.split(";")[0])
  //       .join("; ");
  //     console.log("Collected cookies:", cookieString);
  //     return cookieString;
  //   })
  //   .then((cookieString) => {
  axios
    .post(
      "https://notebooklm.google.com/_/LabsTailwindUi/data/google.internal.labs.tailwind.orchestration.v1.LabsTailwindOrchestrationService/GenerateFreeFormStreamed",
      `f.req=%5Bnull%2C%22%5B%5B%5B%5B%5C%2278dec403-3eb6-41ba-a2dc-31875e26a432%5C%22%5D%5D%5D%2C%5C%22${encodeURIComponent(message)}%5C%22%2Cnull%2C%5B2%2Cnull%2C%5B1%5D%2C%5B1%5D%5D%2C%5C%2295fc8323-1f8c-4f6a-bf3f-a85f3e020b4e%5C%22%2Cnull%2Cnull%2C%5C%221ea78ac6-618b-475d-81e2-67fb82ed08b3%5C%22%2C1%5D%22%5D&at=AIXQIkYo9x0MPmyEsswjvS7rE5HZ%3A1774259087194&`,
      {
        headers: {
          Cookie: process.env.COOKIE,
        },
        responseType: "stream",
      },
    )
    .then((response) => {
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Transfer-Encoding", "chunked");
      let message = "";
      response.data.on("data", (chunk) => {
        const chunkStr = chunk.toString();
        // console.log("Received chunk:", chunkStr);
        if (chunkStr.toString().startsWith(")]}'\n\n")) {
          message += chunkStr.toString().replace(")]}'\n\n", "");
        } else if (chunkStr.toString().startsWith(',["wrb.fr",')) {
          message += chunkStr.toString().substring(1);
        } else {
          message += chunkStr.toString();
        }
        if (message.startsWith("[[")) {
          message = message.substring(1);
        }
        if (message.endsWith('"]')) {
          try {
            const parsedMessage = JSON.parse(JSON.parse(message)[2])[0][0];
            console.log("Message", parsedMessage);
            res.write(parsedMessage + "\n");
            message = "";
          } catch (error) {
            console.log("Error parsing message:", error.message);
            console.log("Raw message:", message);
            res.write("Error parsing message: " + error.message + "\n");
            message = "";
            return;
          }
        }
      });
      response.data.on("end", () => {
        console.log("All chunks received.");
        res.end();
      });
    })
    .catch((error) => {
      console.log("Error during API call:", error.message);
      res.status(500);
      res.write(error.message + "\n");
      res.end();
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
