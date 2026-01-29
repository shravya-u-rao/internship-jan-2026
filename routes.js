import createStudent from "./src/controllers/manageStudent/createStudent.js";

const router = (app) => {
  app.use("/api/create-student", createStudent);
};
export default router;