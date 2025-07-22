import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const resolved = url.searchParams.get('resolved') === 'true'

  const incidents = await prisma.incident.findMany({
    where: { resolved },
    include: { camera: true },
    orderBy: { tsStart: 'desc' },
  })

  return NextResponse.json(incidents)
}
