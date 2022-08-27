import express, { Request, Response } from "express";
import { Coupon } from "../db/coupon";
import { requireAuth, currentUser, validationRequest } from "../../../lib";
import { Types } from "mongoose";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/create",
  currentUser,
  requireAuth,
  [
    body("title")
      .isString()
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("title is required"),
  ],
  [
    body("coupon")
      .isString()
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("coupon is required"),
  ],
  [body("image").isURL().withMessage("video is required")],
  [body("type").isString().withMessage("type is required")],
  [body("video").isURL().withMessage("video is required")],
  [body("des").isArray().withMessage("des is required")],
  validationRequest,
  async (req: Request, res: Response) => {
    const user = req.currentUser;
    const { title, des, coupon, image, video, type } = req.body;
    const coupondb = new Coupon({
      userId: new Types.ObjectId(user?.id),
      title: title,
      type: type,
      coupon: coupon,
      des: des,
      image: image,
      video: video,
    });

    await coupondb.save();

    res.status(200).send(coupondb);
  }
);

export { router as createRoute };
