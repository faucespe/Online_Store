import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class ValidationTranslatorService {
    private readonly translations: Record<string, string> = {
        // Filtro de productos
        'Minimum price must be greater than or equal to 0.': 'El precio mínimo debe ser mayor o igual a 0.',
        'Minimum price must be less than or equal to 99,999,999.99.': 'El precio mínimo debe ser menor o igual a 99,999,999.99.',
        'Maximum price must be greater than or equal to 0.': 'El precio máximo debe ser mayor o igual a 0.',
        'Maximum price must be less than or equal to 99,999,999.99.': 'El precio máximo debe ser menor o igual a 99,999,999.99.',
        'Minimum price cannot be greater than maximum price.': 'El precio mínimo no puede ser mayor al máximo.',
        'Price must be less than or equal to 99,999,999.99.': 'El precio debe ser menor o igual a 99,999,999.99.',  
                
        "There is a product that doesn't exist.": 'Hay un producto que ya no existe.',
        "There is a product that doesn't have enough stock.": 'Hay un producto sin suficiente stock.',
        'Cart products list can not be empty.': 'El carrito no puede estar vacío.',
        "Cart can't contain duplicated products.": 'El carrito no puede tener productos duplicados.',

        // Datos del cliente
        'CustomerName is required.': 'El nombre es obligatorio.',
        'CustomerName must be less than or equal to 50 characters.': 'El nombre debe tener 50 caracteres o menos.',
        'CustomerPhoneNumber is required.': 'El teléfono es obligatorio.',
        'CustomerPhoneNumber must be less than or equal to 8 characters.': 'El teléfono debe tener 8 caracteres o menos.',
        'CustomerAddress is required.': 'La dirección es obligatoria.',
        'CustomerAddress must be less than or equal to 100 characters.': 'La dirección debe tener 100 caracteres o menos.',
        'CustomerEmail is required.': 'El correo es obligatorio.',
        'CustomerEmail must be less than or equal to 100 characters.': 'El correo debe tener 100 caracteres o menos.',
        'CustomerEmail must have a valid email format.': 'El correo debe tener un formato válido.',    };
    
    translate(message: string): string {
        const translated = this.translations[message.trim()]
        if(!translated) {
            console.warn('[ValidationTranslator] Mensaje sin traducción', message);
        }
        return translated ?? message;
        }
    }