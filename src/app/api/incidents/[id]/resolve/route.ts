// src/app/api/incidents/[id]/resolve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const incident = await prisma.incident.update({
    where: { id },
    data: { resolved: true },
    include: { camera: true },
  });

  return NextResponse.json(incident);
}
