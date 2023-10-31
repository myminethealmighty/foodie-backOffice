// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send("Unauthorized.");
    const user = session.user;
    const name = user?.name as string;
    const email = user?.email as string;
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) {
      // Create New Company

      const newCompanyName = "Awa Sarr";
      const newCompanyAddress = "73 x 38 street";
      const company = await prisma.company.create({
        data: { name: newCompanyName, address: newCompanyAddress },
      });

      // Create New User

      await prisma.user.create({
        data: { name, email, companyId: company.id },
      });

      // Create New Menu Category

      const newMenuCategoryName = "Default Menu Category";
      const menuCategory = await prisma.menuCategory.create({
        data: { name: newMenuCategoryName, companyId: company.id },
      });

      // Create New Menu

      const newMenuName = "Default Menu ";
      const menu = await prisma.menu.create({
        data: { name: newMenuName, price: 1000 },
      });

      // Create new row in MenuCategoryMenu

      const menuCategoryMenu = await prisma.menuCategoryMenu.create({
        data: { menuCategoryId: menuCategory.id, menuId: menu.id },
      });

      // Create New AddonCategory

      const newAddonCategoryName = "Default Addon Category";
      const addonCategory = await prisma.addonCategory.create({
        data: { name: newAddonCategoryName },
      });

      // Create new row in MenuAddonCategory

      const menuAddonCategory = await prisma.menuAddonCategory.create({
        data: { menuId: menu.id, addonCategoryId: addonCategory.id },
      });

      // Create New Addon

      const newAddonName1 = "Default Addon 1";
      const newAddonName2 = "Default Addon 2";
      const newAddonName3 = "Default Addon 3";
      const newAddonsData = [
        { name: newAddonName1, addonCategoryId: addonCategory.id },
        { name: newAddonName2, addonCategoryId: addonCategory.id },
        { name: newAddonName3, addonCategoryId: addonCategory.id },
      ];
      const addons = await prisma.$transaction(
        newAddonsData.map((addon) => prisma.addon.create({ data: addon }))
      );

      // Create New Location

      const newLocationName = "Ma Har Aung Myay Township";
      const location = await prisma.location.create({
        data: {
          name: newLocationName,
          companyId: company.id,
          address: newCompanyAddress,
        },
      });

      // Create New Table

      const newTableName = "Default Table";
      const table = await prisma.table.create({
        data: { name: newTableName, locationId: location.id },
      });

      res.status(200).json({
        location,
        menuCategory,
        menu,
        menuCategoryMenu,
        addonCategory,
        menuAddonCategory,
        addons,
        table,
      });
    } else {
      const companyId = dbUser.companyId;
      const locations = await prisma.location.findMany({
        where: { companyId },
      });
      const locationIds = locations.map((item) => item.id);
      const menuCategories = await prisma.menuCategory.findMany({
        where: { companyId },
      });
      const menuCategoryIds = menuCategories.map((item) => item.companyId);
      const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: menuCategoryIds } },
      });
      const menuIds = menuCategoryMenus.map((item) => item.menuId);
      const menus = await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchived: false },
      });
      const menuAddonCategories = await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIds } },
      });
      const addonCategoryIds = menuAddonCategories.map(
        (item) => item.addonCategoryId
      );
      const addonCategories = await prisma.addonCategory.findMany({
        where: { id: { in: addonCategoryIds } },
      });
      const addons = await prisma.addon.findMany({
        where: { addonCategoryId: { in: addonCategoryIds } },
      });
      const tables = await prisma.table.findMany({
        where: { locationId: { in: locationIds } },
      });
      return res.status(200).json({
        locations,
        menus,
        addonCategories,
        addons,
        menuAddonCategories,
        menuCategoryMenus,
        menuCategories,
        tables,
      });
    }
  }
  res.status(405).send("Method Not Allowed!");
}
