// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send("Unauthorized.");
    const user = session.user;
    const email = user?.email as string;
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) return res.status(401).send("Unauthorized.");
    const companyId = dbUser.companyId;
    const { name, address } = req.body;

    // Data Validation

    const isValid = name && address;
    if (!isValid) return res.status(400).send("Bad Request.");
    const createdLocation = await prisma.location.create({
      data: { name, address, companyId },
    });
    return res.status(200).json(createdLocation);

  } else if (method === "PUT") {
    const { id, name } = req.body;
    const isValid =
      id && name;
    if (!isValid) return res.status(400).send("Bad request.");
    const exist = await prisma.location.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad request.");

    const menuCategory = await prisma.location.update({
      data: { name },
      where: { id },
    });

    return res.status(200).json({ menuCategory });

  } else if (method === "DELETE") {
    const locationId = Number(req.query.id);
    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    if (!location) return res.status(400).send("Bad request.");
    await prisma.location.update({
      data: { isArchived: true },
      where: { id: locationId },
    });
    return res.status(200).send("Deleted.");
  }
  res.status(405).send("Method Not Allowed!");
}
