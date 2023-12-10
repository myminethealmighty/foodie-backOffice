// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import { getQrCodeUrl, qrCodeImageUpload } from "@/utils/fileUpload";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

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
    const dbUser = await prisma.user.findFirst({ where: { email } });
    if (!dbUser) {
      // Create New Company

      const newCompanyName = "Awa Sarr";
      const newCompanyStreet = "73 x 38 street";
      const newCompanyTownship = "Mahar Aung Myay";
      const newCompanyCity = "Mandalay";
      const company = await prisma.company.create({
        data: {
          name: newCompanyName,
          street: newCompanyStreet,
          township: newCompanyTownship,
          city: newCompanyCity,
        },
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

      const newLocationName = "Mahar Aung Myay";
      const newLocationStreet = "73 x 38 street";
      const newLocationTownship = "Mahar Aung Myay";
      const newLocationCity = "Mandalay";
      const location = await prisma.location.create({
        data: {
          name: newLocationName,
          companyId: company.id,
          street: newLocationStreet,
          township: newLocationTownship,
          city: newLocationCity,
        },
      });

      // Create New Table

      const newTableName = "Default Table";
      let table = await prisma.table.create({
        data: { name: newTableName, locationId: location.id, assetUrl: "" },
      });
      await qrCodeImageUpload(table.id);
      const assetUrl = getQrCodeUrl(table.id);
      table = await prisma.table.update({
        data: { assetUrl },
        where: { id: table.id },
      });

      res.status(200).json({
        location: [location],
        menuCategory: [menuCategory],
        menu: [menu],
        menuCategoryMenu: [menuCategoryMenu],
        addonCategory: [addonCategory],
        menuAddonCategory: [menuAddonCategory],
        table: [table],
        disabledLocationMenuCategories: [],
        disabledLocationMenus: [],
        addons,
        orders: [],
        company,
      });
    } else {
      const companyId = dbUser.companyId;
      const company = await prisma.company.findFirst({
        where: { id: companyId },
      });
      const locations = await prisma.location.findMany({
        where: { companyId, isArchived: false },
      });
      const locationIds = locations.map((item) => item.id);
      const menuCategories = await prisma.menuCategory.findMany({
        where: { companyId, isArchived: false },
      });

      // A 3-hour long bug happened here! LOL (item.companyId)
      const menuCategoryIds = menuCategories.map((item) => item.id);
      const disabledLocationMenuCategories =
        await prisma.disabledLocationMenuCategory.findMany({
          where: { menuCategoryId: { in: menuCategoryIds } },
        });
      const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: menuCategoryIds }, isArchived: false },
      });

      const menuIds = menuCategoryMenus.map((item) => item.menuId);
      const menus = await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchived: false },
      });

      const disabledLocationMenus = await prisma.disabledLocationMenu.findMany({
        where: { menuId: { in: menuIds } },
      });

      const menuAddonCategories = await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIds }, isArchived: false },
      });
      const addonCategoryIds = menuAddonCategories.map(
        (item) => item.addonCategoryId
      );
      const addonCategories = await prisma.addonCategory.findMany({
        where: { id: { in: addonCategoryIds }, isArchived: false },
      });
      const addons = await prisma.addon.findMany({
        where: {
          addonCategoryId: { in: addonCategoryIds },
          isArchived: false,
        },
      });
      const tables = await prisma.table.findMany({
        where: { locationId: { in: locationIds }, isArchived: false },
      });
      const orders = await prisma.order.findMany({
        where: { tableId: { in: tables.map((item) => item.id) } },
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
        disabledLocationMenuCategories,
        disabledLocationMenus,
        orders,
        company,
      });
    }
  }
  res.status(405).send("Method Not Allowed!");
}
