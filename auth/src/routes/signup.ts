import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().normalizeEmail().withMessage("email is requried"),
    body("password")
      .isLength({ min: 5, max: 20 })
      .escape()
      .withMessage("must be at least 5 chars long"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("email or password wrong");
    }
    const { email, password } = req.body;
    console.log(req.body);

    res.send(req.body);
  }
);

export { router as signupRouter };
