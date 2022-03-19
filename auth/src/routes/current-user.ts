import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/currentuser", async (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = await jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.json({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
