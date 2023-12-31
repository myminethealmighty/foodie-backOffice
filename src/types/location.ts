import { Location } from "@prisma/client";
import { BaseOptions } from "./app";

export interface LocationSlice {
  items: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: Error | null;
}

export interface CreateLocationOptions extends BaseOptions {
  name: string;
  street: string;
  township: string;
  city: string;
  companyId: number;
}
// export interface UpdateLocationOptions extends BaseOptions {
//   id: number;
//   name: string;
//   companyId: number;
// }
// export interface DeleteLocationOptions extends BaseOptions {
//   id: number;
// }
