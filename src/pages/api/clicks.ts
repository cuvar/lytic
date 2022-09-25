import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await prisma.lytic.findMany({
      select: {
        name: true,
        website: true,
        clicks: true,
      },
    });

    res.status(200).json(result);
  } catch (_error) {
    res.status(500).json("An error occurred");
  }
}
