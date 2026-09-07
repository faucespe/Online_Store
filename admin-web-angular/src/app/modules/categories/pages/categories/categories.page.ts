// el Import traen codigo de archivos externos al componente actual 
import { Component, OnInit, inject, signal } from '@angular/core'
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Category, UpdateCategory } from '@models/category.model';
import { CategoryStatus } from '@models/category-status.model';
import { CategoryFilters } from '@models/category-filters.model';
import { CategoryService } from '@services/category/category.service';  
import { TableColumn } from '@shared/components/table/table.component';
import { ApiResponse } from '@models/http.types';

// Component vincula el html, el css y el ts, del page de categories
@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.css',
})

// el export permite que otros archivos puedan accder a funciones definidas en este ts
// implements asegura que la clase vaya a tener un metodo llamado OnInit
export class CategoriesPage implements OnInit {

// se injecta en el categories.page.ts el contenido de category.service.ts
  private categoryService = inject(CategoryService);

// signal es un estado reactivo parecido a las variables de un valor predefinido
// que angular va a modificar automaticamente en pantalla 
  public categories = signal<Category[]>([]);
  public statuses = signal<CategoryStatus[]>([]);
  public showModal = signal(false);
  public saving = signal(false);
  public editMode = signal(true);
  public selectedCategoryId = signal<number | null>(null);

  public editName = signal<string>('');
  public editStatusId = signal<number | null>(null);

  public filterName = signal<string>('');
  public filterStatusId = signal<number | null>(null);
  public backendError = signal<string |null>(null);

  // subject es parecido a un event listener que va a funcionar segun se use
  // next() para mandar informacion y el subcribe() para recibirla
  public nameFilterChanged = new Subject<string>()

  // Arreglo que esta vinculado con el componente compartido de table,
  // que define la estructura que va tener la tabla que se va generar en
  // el HTML de categories.page
  public columns: TableColumn<Category>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'categoryStatus.name', header: 'Estado' },
  ];

  // ng: prefijo estandar de la libreria de Angular, que vincula la funcion con el 
  // implements OnInit de la class
  ngOnInit(): void {
    this.loadCategories();
    this.loadStatuses();

    // este es el subject que se creo antes
    this.nameFilterChanged
      .pipe(                    // filtra el contenido antes de ejecutarlo
        debounceTime(400),      
        distinctUntilChanged()
      )
      .subscribe(() => {        // devuelve el contenido filtrado y lo agrega a loadCategories 
        this.loadCategories();
      });
  }

  // carga las categorias segun la respuesta HTTP del category.service.ts
  // ademas de aplicar los filtros si son solicitados 
  // la solicitud esta vinculada a Category del backend
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

  // Crea el modal al precionar el botón "Crear Categoría" y resetea los valores
  openCreateModal(): void {
    this.selectedCategoryId.set(null);
    this.editName.set('');
    this.editStatusId.set(null);
    this.editMode.set(false);
    this.showModal.set(true);
    this.backendError.set(null);
  }

  // Crea el modal al precionar el botón "Actualizar" y resetea los valores
  onEditCategory(category: Category): void {
    this.selectedCategoryId.set(category.id);
    this.editName.set(category.name);
    this.editStatusId.set(category.categoryStatus.id);
    this.editMode.set(true);
    this.backendError.set(null);
    this.showModal.set(true);
  }

  // Se llama en el HTML cuando se da clik en el buscador de categoria por nombre
  onNameFilterInput(value: string): void {
    this.filterName.set(value);
    this.nameFilterChanged.next(value);
  }

  // Se llama en el HTML cuando se da clik selecionador del estado de categoria
  onStatusFilterChange(value: number | null): void {
    this.filterStatusId.set(value);
    this.loadCategories();
  }

// diccionario que traduce los errores del backend al español en el front 
private translateValidations(message: string): string {
  const translations: Record<string, string> = {
    'Name is required.': 'El nombre es obligatorio.',
    'Name must be less than or equal to 60 characters.': 'El nombre debe tener 60 caracteres o menos.',
    'A category with this name already exists.': 'Ya existe una categoría con este nombre.',
    'Status is required.': 'El estado es obligatorio.',
    'Invalid status provided.': 'Estado inválido.',
  };
  return translations[message] ?? message;
}

saveCategory(): void {
  this.backendError.set(null);
  this.saving.set(true);

  const data: UpdateCategory = {
    name: this.editName().trim(),
    categoryStatusId: this.editStatusId() as number,
  };

  const request$ = this.editMode()
    ? this.categoryService.updateCategory(this.selectedCategoryId() as number, data)
    : this.categoryService.createCategory(data);

  request$.subscribe({
    next: (response) => {
      if (!response.success) {
        const rawMessage = response.messages?.[0] ?? 'Ocurrió un error al guardar la categoría.';
        this.backendError.set(this. translateValidations(rawMessage));
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
      this.backendError.set(this.translateValidations(rawMessage));
      this.saving.set(false);
    },
  });
}
}
