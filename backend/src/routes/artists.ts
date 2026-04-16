import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createError } from "../middleware/errorHandler.js";

const router = Router();
const prisma = new PrismaClient();

// ── Multer setup ────────────────────────────────────────────────
const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(createError("Invalid file type", 400));
  },
});

// ── GET /api/artists ─────────────────────────────────────────────
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const artists = await prisma.artist.findMany({
      where: { registrationComplete: true },
      select: {
        id: true, displayName: true, location: true, bio: true,
        certificationLevel: true, profileImageUrl: true, primaryMaterials: true,
        createdAt: true,
        artworks: {
          where: { status: "LISTED" },
          select: { id: true, title: true, price: true, material: true, images: { where: { isPrimary: true }, take: 1 } },
          take: 4,
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: artists });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/artists/:id ─────────────────────────────────────────
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: req.params.id },
      include: {
        artworks: { where: { status: "LISTED" }, include: { images: true } },
        certifications: { orderBy: { submittedAt: "desc" } },
      },
    });
    if (!artist) return next(createError("Artist not found", 404));
    res.json({ success: true, data: artist });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/artists/register ───────────────────────────────────
router.post(
  "/register",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "certificationDocs", maxCount: 5 },
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Record<string, Express.Multer.File[]>;
      const profileImageUrl = files?.profileImage?.[0]
        ? `/uploads/${files.profileImage[0].filename}`
        : undefined;

      const body = req.body;
      const artist = await prisma.artist.upsert({
        where: { email: body.email },
        update: {
          firstName: body.firstName,
          lastName: body.lastName,
          displayName: body.displayName || `${body.firstName} ${body.lastName}`,
          phone: body.phone,
          location: body.location,
          website: body.website,
          bio: body.bio,
          artistStatement: body.artistStatement,
          skillLevel: body.skillLevel || "BEGINNER",
          primaryMaterials: body.primaryMaterials,
          yearsExperience: Number(body.yearsExperience) || 0,
          certificationLevel: body.certificationLevel || "NONE",
          registrationStep: Number(body.step) || 1,
          ...(profileImageUrl && { profileImageUrl }),
        },
        create: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          displayName: body.displayName || `${body.firstName} ${body.lastName}`,
          phone: body.phone,
          location: body.location,
          website: body.website,
          bio: body.bio,
          artistStatement: body.artistStatement,
          skillLevel: body.skillLevel || "BEGINNER",
          primaryMaterials: body.primaryMaterials,
          yearsExperience: Number(body.yearsExperience) || 0,
          certificationLevel: body.certificationLevel || "NONE",
          registrationStep: Number(body.step) || 1,
          profileImageUrl,
        },
      });

      // If certification docs were uploaded, create certification record
      if (files?.certificationDocs?.length && body.certificationLevel && body.certificationLevel !== "NONE") {
        const evidenceLinks = files.certificationDocs.map(f => `/uploads/${f.filename}`);
        await prisma.certification.create({
          data: {
            artistId: artist.id,
            level: body.certificationLevel,
            evidenceLinks: JSON.stringify(evidenceLinks),
          },
        });
      }

      res.json({ success: true, data: { id: artist.id, step: artist.registrationStep } });
    } catch (err) {
      next(err);
    }
  }
);

// ── POST /api/artists/register/complete ──────────────────────────
router.post("/register/complete", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { artistId } = req.body;
    const artist = await prisma.artist.update({
      where: { id: artistId },
      data: { registrationComplete: true, registrationStep: 5 },
    });
    res.json({ success: true, data: { id: artist.id, complete: true } });
  } catch (err) {
    next(err);
  }
});

export default router;
