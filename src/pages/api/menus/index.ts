// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, price, menuCategoryIds } = req.body;
    const isValid = name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request.");
    const menu = await prisma.menu.create({ data: { name, price } });
    const newMenuCategoryMenu: { menuCategoryId: number; menuId: number }[] =
      menuCategoryIds.map((item: number) => ({
        menuCategoryId: item,
        menuId: menu.id,
      }));
    const menuCategoryMenus = await prisma.$transaction(
      newMenuCategoryMenu.map((item) =>
        prisma.menuCategoryMenu.create({
          data: { menuCategoryId: item.menuCategoryId, menuId: item.menuId },
        })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenus });
  } else if (method === "PUT") {
    const { id, name, price, menuCategoryIds } = req.body;
    const isValid =
      id && name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request.");
    const menu = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });
    // update menuCategoryMenu table
    await prisma.menuCategoryMenu.deleteMany({ where: { menuId: id } });
    const menuCategoryMenusData: { menuId: number; menuCategoryId: number }[] =
      menuCategoryIds.map((item: number) => ({
        menuId: id,
        menuCategoryId: item,
      }));
    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryMenusData.map((item) =>
        prisma.menuCategoryMenu.create({
          data: item,
        })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenus });
  } else if (method === "DELETE") {
    const menuId = Number(req.query.id);
    const menu = await prisma.menu.findFirst({ where: { id: menuId } });
    if (!menu) return res.status(400).send("Bad request.");
    await prisma.menu.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
    return res.status(200).send("Deleted.");
  }
  res.status(405).send("Method not allowed.");
}
