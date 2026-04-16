import "dotenv/config";
import { createApp } from "./app.js";
import { prisma } from "./db.js";

const PORT = parseInt(process.env.PORT || "3001", 10);

const app = createApp();

app.listen(PORT, () => {
  console.log(`🎨 ERA Artist Portal Backend running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});
