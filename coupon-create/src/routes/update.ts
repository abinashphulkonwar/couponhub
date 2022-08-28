import express, { Request, Response } from "express";
import { Coupon } from "../db/coupon";
import { requireAuth, currentUser, validationRequest } from "../../../lib";
import { Types } from "mongoose";
import { param, body } from "express-validator";
const router = express.Router();

router.put(
  "/update/:id",
  currentUser,
  requireAuth,
  [
    param("id")
      .isString()
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("id is required"),
  ],
  [
    body("title")
      .isString()
      .trim()
      .escape()
      .withMessage("title is required")
      .optional({ nullable: true }),
  ],
  [
    body("image")
      .isURL()
      .trim()
      .withMessage("image is required")
      .optional({ nullable: true }),
  ],
  [
    body("video")
      .isURL()
      .trim()

      .withMessage("video is required")
      .optional({ nullable: true }),
  ],
  [
    body("des")
      .isArray()
      .withMessage("des is required")
      .optional({ nullable: true }),
  ],
  [
    body("type")
      .isString()
      .trim()
      .escape()
      .withMessage("type is required")
      .optional({ nullable: true }),
  ],
  [
    body("coupon")
      .isString()
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("coupon is required")
      .optional({ nullable: true }),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const coupondb = await Coupon.findById(req.params.id);

    if (!coupondb) {
      return res.status(404).json({ message: "coupon not found" });
    }
    const user = req.currentUser;

    if (coupondb?.userId?.toString() === user?.id) {
      const { title, image, video, coupon, type, des } = req.body;

      if (title) coupondb.set({ title: title });
      if (image) coupondb.set({ image: image });
      if (video) coupondb.set({ video: video });
      if (coupon) coupondb.set({ coupon: coupon });
      if (type) coupondb.set({ type: type });
      if (des) coupondb.set({ des: des });

      await coupondb.save();

      return res.status(200).json(coupondb);
    } else {
      return res.status(401).json({ message: "you don't have permission" });
    }

    // res.status(200).json({ length: coupondblength.length });
  }
);

export { router as updateRoute };
