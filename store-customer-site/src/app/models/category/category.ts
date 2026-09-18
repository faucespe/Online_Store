import { CategoryStatus } from "./categoryStatus";

export interface Category {
  id: number;
  name: string;
  categoryStatus: CategoryStatus;
}
