import express, { Request, Response } from "express";
import { Coupon } from "../db/coupon";
import { requireAuth, currentUser, validationRequest } from "../../../lib";
import { Types } from "mongoose";
import { param } from "express-validator";
const router = express.Router();

router.delete(
  "/remove/:id",
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
  validationRequest,
  async (req: Request, res: Response) => {
    const coupondb = await Coupon.findById(req.params.id);

    if (!coupondb) {
      return res.status(404).json({ message: "coupon not found" });
    }

    const user = req.currentUser;

    if (coupondb?.userId?.toString() === user?.id) {
      await coupondb?.remove();
      return res.status(200).json({ message: "coupon removed" });
    } else {
      return res.status(401).json({ message: "you don't have permission" });
    }
  }
);

export { router as removeCoupons };
