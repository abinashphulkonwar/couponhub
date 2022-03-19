import express from "express";
const router = express.Router();

router.get("/logout", async (req, res) => {
  req.session = null;
  res.send({ currentUser: null });
});

export { router as logoutRouter };
