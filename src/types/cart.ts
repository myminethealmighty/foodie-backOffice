import { Addon, Menu } from "@prisma/client";
export interface CartItem {
  id: string;
  menu: Menu;
  addons: Addon[];
  quantity: number;
}
