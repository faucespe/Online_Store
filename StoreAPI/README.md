## Dependecias
La API requiere de las siguientes dependecias:

	Microsoft.EntityFrameworkCore.Tools - 10.0.11
	Microsoft.EntityFrameworkCore.Desing - 10.0.11
	Microsoft.EntityFrameworkCore.SqlServer - 10.0.11
	AutoMapper - 16.2.0
  swashbuckle.aspnetcore - 10.2.3

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

## Utilización de Swagger

Para poder utilizar la funcionalidad, con el programa en ejecución y a la siguien URL https://localhost:XXXX/swagger/index.html 
Cambiar las XXXX por el localhost que se genera en la terminal 

ej 
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7044

Swagger se encarga de generar automaticamente nuevos CRUDs agregados a la API
Para Solicitar un CRUD

Seleciona la Categoría deseada, despues se hace click en el tipo de respuesta que se quiere solicitar para abrir el panel del request
Despues click en "Try it Out" se colocan los parametros requeridos y despúes click en "Execute"