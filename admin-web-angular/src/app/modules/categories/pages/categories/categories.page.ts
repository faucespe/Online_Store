import { Component, OnInit, inject, signal } from '@angular/core'
import { Category, UpdateCategory } from '@models/category/category.model';
import { CategoryStatus } from '@models/category/category-status.model';
import { CategoryFilters } from 'src/app/types/category/category-filters.model';
import { CategoryService } from '@services/category/category.service';
import { TableColumn } from '@shared/components/table/table.component';
import { ApiResponse } from 'src/app/types/http/http.types';
import { ValidationTranslatorService } from '@shared/translator/validation-translator.service';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.css',
})
export class CategoriesPage implements OnInit {
  private categoryService = inject(CategoryService);
  private validationTranslator = inject(ValidationTranslatorService);

  public categories = signal<Category[]>([]);
  public statuses = signal<CategoryStatus[]>([]);
  public showModal = signal(false);
  public saving = signal(false);
  public editMode = signal(true);
  public selectedCategoryId = signal<number | null>(null);

  public editName = signal<string>('');
  public editStatus = signal<CategoryStatus | null>(null);

  public filterName = signal<string>('');
  public filterStatusId = signal<number | null>(null);
  public backendError = signal<string |null>(null);

  // Arreglo que esta vinculado con el componente compartido de table,
  // que define la estructura que va tener la tabla que se va generar en
  // el HTML de categories.page
  public columns: TableColumn<Category>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'categoryStatus.name', header: 'Estado' },
  ];

  ngOnInit(): void {
    this.loadCategories();
    this.loadStatuses();
  }

  // carga las categorias segun la respuesta HTTP del category.service.ts
  loadCategories(): void {
    const filters: CategoryFilters = {
      name: this.filterName() || undefined,
      categoryStatusId: this.filterStatusId() ?? undefined,
    };

    this.categoryService.getCategories(filters).subscribe({
      next: (response) => {this.categories.set(response.data.flat());},
      error: (error) => console.error(error),
    });
  }

  // carga los estados de las categorias segun la respuesta HTTP del category.service.ts
  // la solicitud esta vinculada a CategoryStatus del backend
  loadStatuses(): void {
    this.categoryService.getCategoryStatuses().subscribe({
      next: (response) => {this.statuses.set(response.data.flat());},
      error: (error) => console.error(error),
    });
  }

  openCreateModal(): void {
    this.selectedCategoryId.set(null);
    this.editName.set('');
    this.editStatus.set({ id: 2, name: 'Active' } as CategoryStatus);
    this.editMode.set(false);
    this.showModal.set(true);
    this.backendError.set(null);
  }

  onEditCategory(category: Category): void {
    this.selectedCategoryId.set(category.id);
    this.editName.set(category.name);
    this.editStatus.set(category.categoryStatus);
    this.editMode.set(true);
    this.backendError.set(null);
    this.showModal.set(true);
  }

  clearFilters(): void {
    this.filterName.set('');
    this.filterStatusId.set(null);
    this.loadCategories();
  }

  saveCategory(): void {
    this.backendError.set(null);
    this.saving.set(true);

    const data: UpdateCategory = {
      name: this.editName().trim(),
    categoryStatusId: this.editStatus()?.id as number,
    };

    const request$ = this.editMode()
      ? this.categoryService.updateCategory(this.selectedCategoryId() as number, data)
      : this.categoryService.createCategory(data);

    request$.subscribe({
      next: (response) => {
        if (!response.success) {
          const rawMessage = response.messages?.[0] ?? 'Ocurrió un error al guardar la categoría.';
          this.backendError.set(this.validationTranslator.translate(rawMessage));
          this.saving.set(false);
          return;
        }
        else {
          this.loadCategories();
          this.showModal.set(false);
          this.saving.set(false);
        }
      },
      error: (error: { error: ApiResponse }) => {
        const rawMessage = error.error?.messages?.[0] ?? 'Ocurrió un error al guardar la categoría.';
        this.backendError.set(this.validationTranslator.translate(rawMessage));
        this.saving.set(false);
      },
    });
  }
}
