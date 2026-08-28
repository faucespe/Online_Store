export class Product{
    public id: number;
    public name: string;
    public description: string;
    public imageUrl: string;
    public price: number;
    public idCategory: number;
    public idStatus: number;
    public dateTimeCreatedAt: Date;
    public dateTimeUpdatedAt: Date;
    public stock: number;

    constructor(data: any = null) {
      //Deep Copy
      data = data ? JSON.parse(JSON.stringify(data)) : null;

      this.id = data.id ?? null;
      this.name = data.name ?? null;
      this.description = data.description ?? null;
      this.imageUrl = data.imageUrl ?? null;
      this.price = data.price ?? null;
      this.idCategory = data.idCategory ?? null;
      this.idStatus = data.idStatus ?? null;
      this.dateTimeCreatedAt = data.dateTimeCreatedAt ?? null;
      this.dateTimeUpdatedAt = data.dateTimeUpdatedAt ?? null;
      this.stock = data.stock ?? null;
    }
}
