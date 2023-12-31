import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "PUT") {
    // Data Validation
    const { id, name, street, township, city } = req.body;
    const isValid = id && name && street && township && city;
    if (!isValid) return res.status(400).send("Bad Request.");
    const exist = await prisma.company.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request.");
    const company = await prisma.company.update({
      data: { name, street, township, city },
      where: { id },
    });
    return res.status(200).json({ company });
  }
  res.status(405).send("Method Not Allowed");
}
