import { Router } from "express";
import { RESPONSE } from "../../config/global.js";
import studentModel from "../../models/studentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { STATE } from "../../config/constant.js";
const router = Router();
import { authenticate } from "../../middlewares/authencate.js";

export default router.get("/", authenticate, async (req, res) => {
  try {
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 10;
    let skip = (page - 1) * limit;

    let students = await studentModel
      .find(
        {
          isactive: STATE.ACTIVE,
          name: {
            $regex: req.query.searchkey ?? "",
            $options: "i",
          },
          teacher_id: req.user.id, //accessing teacher id from token
        },
        { __v: 0 },
      )
      .skip(skip)
      .limit(limit);

    if (students.length == 0) {
      return send(res, setErrMsg("students", RESPONSE.NOT_FOUND));
    }

    students = students.map((student) => ({
      ...student.toJSON(),
      image: student.image ? "/uploads/" + student.image : null,
    }));

    return send(res, RESPONSE.SUCCESS, students);

    // return res.send({
    //   code: 200,
    //   message: "success",
    //   data: students,
    // });
  } catch (error) {
    console.log("list student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
    // return res.send({
    //   code: 500,
    //   message: "Internal server error",
    // });
  }
});
