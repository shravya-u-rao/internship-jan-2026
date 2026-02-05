import { Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import { authenticate } from "../../middlewares/authencate.js";
import upload from "../../middlewares/uploads.js";
const imageUpload = upload.single("image");
// const imageUpload = upload.array("images",3);
// const imageUpload = upload.fields([
//   { name: "prod-images", maxCount: 3 },
//   { name: "cat-images", maxCount: 1 },
// ]);

export default router.post("/", authenticate, async (req, res) => {
  try {
    imageUpload(req, res, async (err) => {
      if (err) {
        return send(res, setErrMsg(err, RESPONSE.MULTER_ERR));
      }

      if (!req.file || req.file == undefined) {
        return send(res, setErrMsg("image", RESPONSE.REQUIRED));
      }

      //for upload.array & upload.fields
      // if (!req.files || req.files.length == 0) {
      //   return send(res, setErrMsg("images", RESPONSE.REQUIRED));
      // }

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

      let isEmailValid = String(email).match(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      );

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
        teacher_id: req.user.id, //accessing teacher id from token
        image: req.file.filename,
      });

      return send(res, RESPONSE.SUCCESS);
    });
  } catch (error) {
    console.log("Create Student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
