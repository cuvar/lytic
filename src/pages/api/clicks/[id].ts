import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    res.status(400).json("Invalid request");
    return;
  }

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
    const { clicks } = req.body;

    try {
      const successful = await prisma.lytic.update({
        where: {
          name: id,
        },
        data: {
          clicks: clicks,
        },
      });
      console.log(successful);

      successful
        ? res.status(200).json("Analytics updated")
        : res.status(404).json("Analytics not found");
    } catch (error) {
      console.log(error);
      res.status(500).json("An error occurred");
    }
  } else {
    res.status(405).json("Method not allowed");
  }
}
