export class CategoryStatus {
  public id: number;
  public name: string;

  constructor(data: any = null) {
    data = data ? JSON.parse(JSON.stringify(data)) : {};

    this.id = data.id ?? 0;
    this.name = data.name ?? '';
  }
}
