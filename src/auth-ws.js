const { apiRouter } = require("./web-server");

const STUDENT_IDS = ["12345678", "87654321", "11111111"];

const isStudentIdValid = (req) => {
  return STUDENT_IDS.includes(req.cookies?.studentId);
};

apiRouter.post("/login", (req, res) => {
  const { studentId } = req.body;
  if (typeof studentId !== "string" || !/^\d{8}$/.test(studentId)) {
    return res.status(400).json({ error: "Invalid student ID format" });
  }
  console.log("Received student ID:", studentId);
  if (STUDENT_IDS.includes(studentId)) {
    res.cookie("studentId", studentId, { httpOnly: true });
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
});

apiRouter.get("/profile", (req, res) => {
  const { studentId } = req.cookies;
  if (STUDENT_IDS.includes(studentId)) {
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
});

exports.isStudentIdValid = isStudentIdValid;
