import express, { Request, Response } from "express";
import { Coupon } from "../db/coupon";
import { requireAuth, currentUser, validationRequest } from "../../../lib";
import { query } from "express-validator";
const router = express.Router();
interface Query {
  start: string;
  limit: string;
}

router.get(
  "/get",
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
  validationRequest,
  async (req: Request, res: Response) => {
    const { start, limit } = req.query as unknown as Query;

    const data = await Coupon.find({})
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .sort({ createAted: 1 });

    res.status(200).send(data);
  }
);

export { router as getRoutes };
