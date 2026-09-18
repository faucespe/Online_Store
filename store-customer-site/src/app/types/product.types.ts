export class ProductFilter {
  public name: string;
  public minPrice: number;
  public maxPrice: number;
  public categoryId: number | string;

  constructor(data: any = null) {
    // Técnica de deep copy para eliminar referencias de memoria
    data = data ? JSON.parse(JSON.stringify(data)) : {};

    this.name = data.name ?? '';
    this.minPrice = data.minPrice ?? '';
    this.maxPrice = data.maxPrice ?? '';
    this.categoryId = data.categoryId ?? '';
  }
}