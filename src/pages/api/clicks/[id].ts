import { isAnalyticEntry } from "@/utils/data";
import { trpc } from "@/utils/trpc";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method == "GET") {
    const result = await prisma.lytic.findUnique({
      where: {
        name: id,
      },
      select: {
        name: true,
        website: true,
        clicks: true,
      },
    });
    res.status(200).json(result);
  } else if (req.method == "POST") {
    const { name, website, clicks } = req.body;
    const newAnalytics = { name, website, clicks };

    if (!isAnalyticEntry(newAnalytics)) {
      res.status(400).json("Invalid data");
      return;
    }

    if (name !== id) return new Response("Invalid request", { status: 400 });
    const successful = await prisma.lytic.update({
      where: {
        name: newAnalytics.name,
      },
      data: {
        clicks: newAnalytics.clicks,
      },
    });
    if (successful) {
      res.status(200).json("Analytics updated");
      return;
    } else {
      res.status(404).json("Analytics not found");
      return;
    }
  } else {
    res.status(405).json("Method not allowed");
  }
}
