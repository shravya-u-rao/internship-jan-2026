import { Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import { STATE } from "../../config/constant.js";

export default router.delete("/", async (req, res) => {
  try {
    let id = req.query.id;
    if (!id || id == undefined) {
      return send(res, setErrMsg("id", RESPONSE.REQUIRED));
    }

    let isActive = await studentModel.findOne({
      _id: id,
      isactive: STATE.ACTIVE,
    });

    if (!isActive) {
      return send(res, setErrMsg("id", RESPONSE.NOT_FOUND));
    }

    // await studentModel.deleteOne({ _id: id });

    await studentModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          isactive: STATE.INACTIVE,
        },
      },
    );

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("delete Student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
