import { Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";

export default router.post("/", async (req, res) => {
  try {
    const { name, rollno, email } = req.body || {};

    if (!name || name == undefined) {
      return res.send({
        code: 201,
        message: "name is manadatory",
      });
    }

    if (!email || email == undefined) {
      return res.send({
        code: 201,
        message: "email is manadatory",
      });
    }

    if (!rollno || rollno == undefined) {
      return res.send({
        code: 201,
        message: "rollno is manadatory",
      });
    }

    let isEmailValid = String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (isEmailValid == null) {
      return res.send({
        code: 203,
        message: "Invalid email format",
      });
    }

    let isRollnoExists = await studentModel.findOne({ rollno: rollno });

    if (isRollnoExists) {
      return res.send({
        code: 202,
        message: "Roll Number already exists",
      });
    }

    let isEmailExists = await studentModel.findOne({ email: email });

    if (isEmailExists) {
      return res.send({
        code: 202,
        message: "Email already exists",
      });
    }

    await studentModel.create({
      name,
      rollno,
      email,
      //   name:student_name
    });

    return res.send({
      code: 200,
      message: "Student created successfully",
    });
  } catch (error) {
    console.log("Create Student", error);
    return res.send({
      code: 500,
      message: "Something went wrong!!",
    });
  }
});


git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/shravya-u-rao/internship-jan-2026.git
git push -u origin main