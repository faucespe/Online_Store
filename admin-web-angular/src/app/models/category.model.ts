// Formato para obtener la Categoria de un Producto
export class Category {
  id: number;
  name: string;

  constructor(data?: any) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? '';
  }
}
