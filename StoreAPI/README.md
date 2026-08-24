## Dependecias
La API requiere de las siguientes dependecias:

	Microsoft.EntityFrameworkCore.Tools - 10.0.11
	Microsoft.EntityFrameworkCore.Desing - 10.0.11
	Microsoft.EntityFrameworkCore.SqlServer - 10.0.11
	AutoMapper - 16.2.0

## Conexión a la Base de datos
La conexión se configura mediante appsettings.json utilizando la sección ConnectionStrings:

  ```json
  "ConnectionStrings": {
    "StoreDB": "Server=(local);Database=StoreDB;trusted_Connection=True;Encrypt=False"
  }
  ```

Se espera que la insntancia este disponible localmente

## Configuración de AutoMapper

Automapper 16.2.0 requiere de una licenseKey que se puede generar en el sitio web https://luckypennysoftware.com.

La API es capas de leer la LicenseKey desde el .appsettings utilizando la sección AutoMapper

```json
 "AutoMapper": {
   "LicenseKey": "Inserte la LicenseKey Aquí"
 }	
 ```