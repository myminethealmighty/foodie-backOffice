import { Addon, Menu } from "@prisma/client";
export interface CartItem {
  id: string;
  menu: Menu;
  addon: Addon[];
  quantity: number;
}
