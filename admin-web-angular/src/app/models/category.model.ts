import { CategoryStatus } from './category-status.model';

export class Category {
  id: number;
  name: string;
  categoryStatus: CategoryStatus;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.categoryStatus = new CategoryStatus(data.categoryStatus);
  } 
}

export interface UpdateCategory {
  name: string;
  categoryStatusId: number;
}