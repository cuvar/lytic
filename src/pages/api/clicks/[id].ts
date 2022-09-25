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
    let result = null;
    try {
      result = await prisma.lytic.findUnique({
        where: {
          name: id,
        },
        select: {
          clicks: true,
        },
      });
    } catch (error) {
      res.status(500).json("An error occurred while fetching");
    }

    if (result == null) {
      res.status(500).json("No data to update");
      return;
    }

    const clicksInc = result.clicks + 1;

    try {
      await prisma.lytic.update({
        where: {
          name: id,
        },
        data: {
          clicks: clicksInc,
        },
      });
      res.status(200).json("Analytics updated");
    } catch (error) {
      console.log(error);
      res.status(500).json("An error occurred");
    }
  } else {
    res.status(405).json("Method not allowed");
  }
}
