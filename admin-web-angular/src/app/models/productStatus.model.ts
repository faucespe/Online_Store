// Formato para obtener los datos de los Estados de un Producto
export class ProductStatus {
  id: number;
  name: string;

  constructor(data?: any) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? '';
  }
}
