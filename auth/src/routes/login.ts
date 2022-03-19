import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { Password } from "../services/password";
import { User } from "../db/user";
const router = express.Router();

router.get(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("must be at least 5 chars long"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const userdb = await User.findOne({ email: email });

    if (!userdb) return;
    //     throw new RequestValidationError([{ message: "email not found!" }]);

    const isValid = await Password.compare(userdb.password, password);
    if (isValid) {
      res.send(userdb);
    } else {
    }
  }
);

export { router as loginRouter };
