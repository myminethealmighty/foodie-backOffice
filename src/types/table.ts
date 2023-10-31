import { Location } from "@prisma/client";

export interface TableSlice {
  items: Location[];
  isLoading: boolean;
  error: Error | null;
}
