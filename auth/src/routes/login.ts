import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { Password } from "../services/password";
import { User } from "../db/user";
import { validationRequest } from "../middlewares/request-validation";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    next();
  },
  [
    body("email").isEmail().normalizeEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("must be at least 5 chars long"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userdb = await User.findOne({ email: email });

    if (!userdb) throw new BadRequestError("email not found!");

    const isValid = await Password.compare(userdb.password, password);
    if (isValid) {
      const userJwt = await jwt.sign({ id: userdb._id }, process.env.JWT_KEY!);

      req.session = {
        jwt: userJwt,
      };
      res.send(userdb);
    } else {
      throw new BadRequestError("email or password wrong");
    }
  }
);

export { router as loginRouter };
