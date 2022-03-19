import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../db/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) throw new BadRequestError("email is use");

    const userdb = User.build({ email, password });
    await userdb.save();

    console.log(req.body);

    if (!process.env.JWT_KEY) {
      throw new BadRequestError("jwt key not defined");
    }

    const userJwt = await jwt.sign(
      { _id: userdb._id, email: userdb.email },
      process.env.JWT_KEY
    );

    req.session = {
      jwt: userJwt,
    };

    res.send(userdb);
  }
);

export { router as signupRouter };
