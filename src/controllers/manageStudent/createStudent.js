import { Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";

export default router.post("/", async (req, res) => {
  try {
    const { name, rollno, email } = req.body || {};

    if (!name || name == undefined) {
      return send(res, setErrMsg("Name", RESPONSE.REQUIRED));
    }

    if (!email || email == undefined) {
      return send(res, setErrMsg("Email", RESPONSE.REQUIRED));
    }

    if (!rollno || rollno == undefined) {
      return send(res, setErrMsg("Roll Number", RESPONSE.REQUIRED));
    }

    let isEmailValid = String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (isEmailValid == null) {
      return send(res, setErrMsg("Email", RESPONSE.INVALID));
    }

    let isRollnoExists = await studentModel.findOne({ rollno: rollno });

    if (isRollnoExists) {
      return send(res, setErrMsg("Roll Number", RESPONSE.ALREADY_EXISTS));
    }

    let isEmailExists = await studentModel.findOne({ email: email });

    if (isEmailExists) {
      return send(res, setErrMsg("Email", RESPONSE.ALREADY_EXISTS));
    }

    await studentModel.create({
      name,
      rollno,
      email,
      //   name:student_name
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Create Student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});