import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class ValidationTranslatorService {
    private readonly translations: Record<string, string> = {
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
