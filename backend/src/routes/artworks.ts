import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createError } from "../middleware/errorHandler.js";

const router = Router();
const prisma = new PrismaClient();

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
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(createError("Images only", 400));
  },
});

// ── GET /api/artworks ─────────────────────────────────────────────
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { material, certLevel, search, page = "1", limit = "20" } = req.query as Record<string, string>;

    const where: Record<string, unknown> = { status: "LISTED" };
    if (material) where.material = { contains: material, mode: "insensitive" };
    if (certLevel) where.artist = { certificationLevel: certLevel };
    if (search) where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];

    const skip = (Number(page) - 1) * Number(limit);
    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          images: { orderBy: { isPrimary: "desc" } },
          artist: { select: { displayName: true, certificationLevel: true, location: true } },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.artwork.count({ where }),
    ]);

    res.json({ success: true, data: artworks, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/artworks/:id ─────────────────────────────────────────
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: { id: req.params.id },
      include: {
        images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] },
        artist: {
          select: {
            id: true, displayName: true, certificationLevel: true, location: true,
            bio: true, profileImageUrl: true,
          },
        },
      },
    });
    if (!artwork) return next(createError("Artwork not found", 404));
    res.json({ success: true, data: artwork });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/artworks ────────────────────────────────────────────
router.post(
  "/",
  upload.array("images", 6),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];
      const body = req.body;

      if (!body.artistId) return next(createError("artistId is required", 400));
      if (!body.title || !body.material || !body.price) return next(createError("title, material, price are required", 400));

      const artwork = await prisma.artwork.create({
        data: {
          artistId: body.artistId,
          title: body.title,
          description: body.description,
          material: body.material,
          materialsUsed: body.materialsUsed,
          dimensions: body.dimensions,
          weight: body.weight ? Number(body.weight) : undefined,
          price: Number(body.price),
          currency: body.currency || "EUR",
          status: "PENDING_REVIEW",
          images: {
            create: files?.map((f, i) => ({
              url: `/uploads/${f.filename}`,
              isPrimary: i === 0,
              sortOrder: i,
            })) ?? [],
          },
        },
        include: { images: true },
      });

      res.status(201).json({ success: true, data: artwork });
    } catch (err) {
      next(err);
    }
  }
);

// ── DELETE /api/artworks/:id ──────────────────────────────────────
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: { id: req.params.id },
      include: { images: true },
    });
    if (!artwork) return next(createError("Artwork not found", 404));

    // Clean up image files
    for (const img of artwork.images) {
      const filePath = path.join(uploadDir, path.basename(img.url));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await prisma.artwork.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Artwork deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
