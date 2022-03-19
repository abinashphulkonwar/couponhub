import express from "express";

const router = express.Router();

router.get("/currentuser", async (req, res) => {
  res.json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
