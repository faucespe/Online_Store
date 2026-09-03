import { Component, OnInit, inject, signal } from '@angular/core'
import { Category, UpdateCategory } from '@models/category.model';
import { CategoryStatus } from '@models/category-status.model';
import { CategoryService } from '@services/category/category.service';  
import { TableColumn } from '@shared/components/table/table.component';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.css',
})

export class CategoriesPage implements OnInit {
  private categoryService = inject(CategoryService);

  public categories = signal<Category[]>([]);
  public statuses = signal<CategoryStatus[]>([]);

  public showModal = signal(false);
  public saving = signal(false);

  public isEditMode = signal(true);

  public selectedCategoryId = signal<number | null>(null);
  public editName = signal<string>('');
  public editStatusId = signal<number | null>(null);

  public columns: TableColumn<Category>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'categoryStatus.name', header: 'Estado' },
  ];

  ngOnInit(): void {
    this.loadCategories();
    this.loadStatuses();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {this.categories.set(response.data.flat());},
      error: (error) => console.error(error),
    });
  }

  loadStatuses(): void {
    this.categoryService.getCategoryStatuses().subscribe({
      next: (response) => {this.statuses.set(response.data.flat());},
      error: (error) => console.error(error),
    });
  }

  openCreateModal(): void {
    this.selectedCategoryId.set(null);
    this.editName.set('');
    this.editStatusId.set(null);
    this.isEditMode.set(false);
    this.showModal.set(true);
  }

  onEditCategory(category: Category): void {
    this.selectedCategoryId.set(category.id);
    this.editName.set(category.name);
    this.editStatusId.set(category.categoryStatus.id);
    this.isEditMode.set(true);
    this.showModal.set(true);
  }

  saveCategory(): void {
    const statusId = this.editStatusId();

    if (!this.editName() || !statusId) {
      alert('Todos los campos son obligatorios');
      return;
    };

    if(this.isEditMode() && !this.selectedCategoryId()) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.saving.set(true);

    const data: UpdateCategory = {
      name: this.editName(),
      categoryStatusId: statusId
    };

    const request$ = this.isEditMode()
      ? this.categoryService.updateCategory(this.selectedCategoryId() as number, data)
      : this.categoryService.createCategory(data);  

      request$.subscribe({
        next: (response) => {
          this.loadCategories();
          this.showModal.set(false);
          this.saving.set(false);
        },
        error: (error) => {
          this.saving.set(false);
          console.error(error);
        }
      });
  }
}
