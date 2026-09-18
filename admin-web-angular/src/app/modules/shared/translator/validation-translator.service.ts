import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class ValidationTranslatorService {
    private readonly translations: Record<string, string> = {

        // Validaciones Generales
        'Name is required.': 'Nombre es obligatorio.',
        'Name must be less than or equal to 60 characters.' : 'Nombre debe tener 60 caracteres o menos.',
        'Status is required.' : 'Estado es obligatorio.',
        
        // Validaciones de Categoria
        'A category with this name already exists.' : 'Ya existe una categoría con el mismo nombre.',
        'Invalid status provided.' : 'Estado inválido.',
        
        // Validaciones de Productos
        'Description is required.' : 'La descripción es obligatoria.',
        'Description must be less than or equal to 500 characters.' : 'Descripción debe tener 500 caracteres o menos.',
        'Price is required.' : 'Precio es obligatorio.',
        'Price must be greater than 0.' : 'Precio debe ser mayor a 0.',
        'Category is required.' : 'Categoría es obligatoria.',
        'Category must be a valid category.' : 'Categoría debe ser válida.',
        'Category does not exist, you need to select a valid category.' : 'Categoría no existe, seleccione una categoría válida.',
        'Status does not exist, you need to select a valid status.': 'Estado no existe, selecciona un estado válido.',
        'Stock must be greater than or equal to 0.' : 'Stock debe ser mayor o igual a 0.',
        'CreatedAt must be less than or equal to the current date/time.' : 'Fecha de creación no puede ser posterior a la fecha/hora actual.',
        'UpdatedAt must be less than or equal to the current date/time.' : 'Fecha de actualización no puede ser posterior a la fecha/hora actual.',
        'UpdatedAt must be later than CreatedAt.' : 'Fecha de actualización debe ser posterior a Fecha de creación',
        'Minimum price must be greater than or equal to 0.': 'El precio mínimo debe ser mayor o igual a 0.',
        'Minimum price must be less than or equal to 99,999,999.99.': 'El precio mínimo debe ser menor o igual a 99,999,999.99.',
        'Maximum price must be greater than or equal to 0.': 'El precio máximo debe ser mayor o igual a 0.',
        'Maximum price must be less than or equal to 99,999,999.99.': 'El precio máximo debe ser menor o igual a 99,999,999.99.',
        'Minimum price cannot be greater than maximum price.': 'El precio mínimo no puede ser mayor al máximo.',

        // Filtro de órdenes de compra
        'Minimum total must be greater than or equal to 0.': 'El total mínimo debe ser mayor o igual a 0.',
        'Minimum total must be less than or equal to 99,999,999.99.': 'El total mínimo debe ser menor o igual a 99,999,999.99.',
        'Maximum total must be greater than or equal to 0.': 'El total máximo debe ser mayor o igual a 0.',
        'Maximum total must be less than or equal to 99,999,999.99.': 'El total máximo debe ser menor o igual a 99,999,999.99.',
        'Minimum total cannot be greater than maximum total.': 'El total mínimo no puede ser mayor al máximo.',
    };
    
    translate(message: string): string {
        const translated = this.translations[message.trim()]
        if(!translated) {
            console.warn('[ValidationTranslator] Mensaje sin traducción', message);
        }
        return translated ?? message;
        }
    }
