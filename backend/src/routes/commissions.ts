import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { createError } from "../middleware/errorHandler.js";

const router = Router();
const prisma = new PrismaClient();

// ── POST /api/commissions ─────────────────────────────────────────
// Public endpoint — inquiry from prospective buyer
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, company, description, budget, timeline, location, materials, commissionType } = req.body;

    if (!name || !email || !description || !budget) {
      return next(createError("name, email, description, and budget are required", 400));
    }

    // Create or find a placeholder artist (ERA team) to hold the inquiry
    // In production, this would route to the matching engine
    const placeholder = await prisma.artist.upsert({
      where: { email: "team@everythingrecycledarts.com" },
      create: {
        email: "team@everythingrecycledarts.com",
        firstName: "ERA",
        lastName: "Team",
        displayName: "ERA Team",
        registrationComplete: true,
      },
      update: {},
    });

    // Create or find user record
    const user = await prisma.artist.upsert({
      where: { email },
      create: {
        email,
        firstName: name.split(" ")[0] || name,
        lastName: name.split(" ").slice(1).join(" ") || "",
        displayName: name,
        location,
      },
      update: { displayName: name, location },
    });

    const commission = await prisma.commission.create({
      data: {
        userId: user.id,
        artistId: placeholder.id,
        requirements: JSON.stringify({
          description,
          commissionType,
          materials,
          company,
        }),
        materials: Array.isArray(materials) ? materials.join(", ") : materials,
        budget: Number(budget),
        timeline: timeline || "Flexible",
        status: "INQUIRY",
      },
    });

    res.status(201).json({
      success: true,
      data: { id: commission.id },
      message: "Commission inquiry received. We'll be in touch within 48 hours.",
    });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/commissions ──────────────────────────────────────────
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const commissions = await prisma.commission.findMany({
      include: {
        user: { select: { displayName: true, email: true } },
        artist: { select: { displayName: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: commissions });
  } catch (err) {
    next(err);
  }
});

export default router;
