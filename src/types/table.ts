import { Location } from "@prisma/client";

export interface TableSlice {
  items: Location[];
  isLoading: boolean;
  error: Error | null;
}

export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
