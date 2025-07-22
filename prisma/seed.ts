import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const cameras = await prisma.camera.createMany({
    data: [
      { name: "Shop Floor A", location: "Ground Floor" },
      { name: "Vault", location: "Basement" },
      { name: "Entrance", location: "Main Gate" },
    ],
  });

  const cameraList = await prisma.camera.findMany();

  await prisma.incident.createMany({
    data: Array.from({ length: 12 }, (_, i) => ({
      cameraId: cameraList[i % 3].id,
      type: ["Unauthorised Access", "Gun Threat", "Face Recognised"][i % 3],
      tsStart: new Date(Date.now() - i * 3600000),
      tsEnd: new Date(Date.now() - i * 3600000 + 60000),
      thumbnailUrl: `/images/thumb${(i % 3) + 1}.jpg`,
      resolved: false,
    })),
  });
}

main();
