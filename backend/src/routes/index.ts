import { Router } from "express";
import artistRoutes from "./artists.js";
import artworkRoutes from "./artworks.js";
import commissionRoutes from "./commissions.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));

router.use("/artists", artistRoutes);
router.use("/artworks", artworkRoutes);
router.use("/commissions", commissionRoutes);

export default router;
