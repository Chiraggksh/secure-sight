// src/app/api/incidents/[id]/resolve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } } // ✅ Correct inline type
) {
  const { id } = params;

  const incident = await prisma.incident.update({
    where: { id: Number(id) }, // ✅ Convert string to number
    data: { resolved: true },
    include: { camera: true },
  });

  return NextResponse.json(incident);
}
