# Cert_CodeMinds_08-26

Este proyecto es la evalucion final del curso de CodeMinds, donde se aplican los conocimientos aprendidos durante todo el curso 

## lenguajes utilizados:

- C# para Api 
- SQL para la base de datos
- Angular, typeScript, Signals para la estructura del frontend 
- HTML y CSS para la creacion de las paginas web

## Estructura

El repositorio cuenta con 4 modulos principales 

- Admin-Web-Angular: Frontend donde se gestiona de manera administrativa los CRUD de las entidades
- Store-Customer-site: Frontend donde potenciales customers puede acceder a la vista de products en venta y agregarlos a un carro de compras 
- StoreApi: Backend donde se encuentra la funcionalidad del projecto, manejando Mappers, services, controladores, DTOs, filtros, validaciones, y errores  
- StoreDB: Base de datos que funciona con un servicio local de SQL, en el proyecto se encuentran los script necesarios para la inicializacion y poblacion de la base de datos

Para mas informacion de la funcionalidad de cada modulo consultar Readme internos en las carpetas correspondientes 

## Inicializacion

1. `StoreDB` — inicializar y poblar la base de datos
2. `StoreApi` — Ejecucion la API para la funcionalidad
3. `Admin-Web-Angular` — Panel administrativo
4. `Store-Customer-Site` — Sitio de tienda