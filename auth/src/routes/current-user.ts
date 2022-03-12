import express from 'express';

const router = express.Router();

router.get('/currentuser', (req, res) => {
  res.json({ currentUser: "hiiiiiiiiii" });
});

export { router as currentUserRouter };