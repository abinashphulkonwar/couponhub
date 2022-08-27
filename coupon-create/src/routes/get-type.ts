import express, { Request, Response } from "express";
import { Coupon } from "../db/coupon";
import { requireAuth, currentUser, validationRequest } from "../../../lib";
import { query } from "express-validator";
const router = express.Router();
interface Query {
  start: string;
  limit: string;
  type: string;
}

router.get(
  "/get/type",
  [
    query("start")
      .isInt()

      .withMessage("start is required"),
  ],
  [
    query("limit")
      .isInt()

      .withMessage("start is required"),
  ],
  [
    query("type")
      .isString()
      .escape()

      .withMessage("type is required"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { start, limit, type } = req.query as unknown as Query;

    const data = await Coupon.find({ type: type })
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .sort({ createAted: 1 });

    res.status(200).send(data);
  }
);

export { router as getTypeRoutes };
