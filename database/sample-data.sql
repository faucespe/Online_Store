USE StoreDB;
GO

-- Ejecutar primero "status-tables.sql"

-- INSERT DATA: Category
INSERT INTO Category (Id, [Name], IdStatus)
VALUES
(1, 'Computadoras', 1),
(2, 'Periféricos', 1),
(3, 'Monitores', 1),
(4, 'Componentes', 1),
(5, 'Accesorios', 1);
GO

-- INSERT DATA: Product
INSERT INTO Product
(
    Id,
    [Name],
    [Description],
    Price,
    IdCategory,
    IdStatus,
    CreatedAt,
    UpdatedAt,
    Stock
)
VALUES
(1, 'Laptop Lenovo IdeaPad', 'Laptop para uso académico y profesional', 450000.00, 1, 1, GETDATE(), NULL, 15),
(2, 'Teclado Mecánico RGB', 'Teclado mecánico con iluminación RGB', 35000.00, 2, 1, GETDATE(), NULL, 30),
(3, 'Monitor LG 27"', 'Monitor de 27 pulgadas Full HD', 125000.00, 3, 1, GETDATE(), NULL, 10),
(4, 'Memoria RAM 16GB DDR5', 'Memoria RAM DDR5 de 16GB', 45000.00, 4, 1, GETDATE(), NULL, 25),
(5, 'Mouse Gamer', 'Mouse óptico para gaming', 22000.00, 2, 1, GETDATE(), NULL, 40),
(6, 'Tarjeta Gráfica RTX 4060', 'Tarjeta gráfica de 8GB', 280000.00, 4, 1, GETDATE(), NULL, 8),
(7, 'Webcam Full HD', 'Cámara web Full HD para videollamadas', 30000.00, 5, 1, GETDATE(), NULL, 20),
(8, 'Audífonos Gamer', 'Audífonos con micrófono integrado', 55000.00, 5, 1, GETDATE(), NULL, 18),
(9, 'SSD NVMe 1TB', 'Unidad de almacenamiento SSD NVMe de 1TB', 65000.00, 4, 1, GETDATE(), NULL, 20),
(10, 'Webcam Full HD', 'Cámara web Full HD para videollamadas', 30000.00, 5, 1, GETDATE(), NULL, 22),
(11, 'Audífonos Gamer', 'Audífonos con micrófono integrado para videojuegos', 55000.00, 5, 1, GETDATE(), NULL, 18),
(12, 'Base para Laptop', 'Base ajustable para laptops', 28000.00, 5, 1, GETDATE(), NULL, 14),
(13, 'Teclado de Oficina', 'Teclado estándar para uso empresarial', 15000.00, 2, 1, GETDATE(), NULL, 35),
(14, 'Monitor Curvo 32"', 'Monitor curvo de 32 pulgadas para entretenimiento', 210000.00, 3, 1, GETDATE(), NULL, 7),
(15, 'Tarjeta Madre B650', 'Tarjeta madre compatible con procesadores AMD', 145000.00, 4, 0, GETDATE(), NULL, 0);
GO

-- INSERT DATA: PurchaseOrder
INSERT INTO PurchaseOrder
(
    Id,
    CustomerName,
    CustomerPhoneNumber,
    CustomerEmail,
    CustomerAddress,
    PurchaseDate,
    GrandTotal
)
VALUES
(1, 'Carlos Rodríguez', '88881111', 'carlos.rodriguez@email.com',
 'San José, Costa Rica', '2026-08-01 09:30:00', 507000.00),

(2, 'María González', '88882222', 'maria.gonzalez@email.com',
 'Alajuela, Costa Rica', '2026-08-03 14:15:00', 147000.00),

(3, 'Andrés Vargas', '88883333', 'andres.vargas@email.com',
 'Heredia, Costa Rica', '2026-08-05 11:45:00', 345000.00),

(4, 'Sofía Hernández', '88884444', 'sofia.hernandez@email.com',
 'Cartago, Costa Rica', '2026-08-07 16:20:00', 280000.00),

(5, 'Daniel Castro', '88885555', 'daniel.castro@email.com',
 'Puntarenas, Costa Rica', '2026-08-10 10:00:00', 95000.00),

(6, 'Laura Ramírez', '88886666', 'laura.ramirez@email.com',
 'Limón, Costa Rica', '2026-08-12 13:30:00', 160000.00),

(7, 'José Méndez', '88887777', 'jose.mendez@email.com',
 'Guanacaste, Costa Rica', '2026-08-14 15:45:00', 317000.00),

(8, 'Miguel Solano', '88889999', 'miguel.solano@email.com',
 'San José, Costa Rica', '2026-08-15 09:20:00', 185000.00),

(9, 'Daniela Rojas', '88880000', 'daniela.rojas@email.com',
 'Heredia, Costa Rica', '2026-08-16 12:40:00', 117000.00),

(10, 'Luis Jiménez', '88881122', 'luis.jimenez@email.com',
 'Alajuela, Costa Rica', '2026-08-16 16:10:00', 365000.00);
GO

-- INSERT DATA: PurchaseOrderProduct
INSERT INTO PurchaseOrderProduct
(
    Id,
    IdProduct,
    IdPurchaseOrder,
    ProductQuantity,
    Price
)
VALUES
-- Order 1
(1, 1, 1, 1, 450000.00),
(2, 3, 1, 1, 35000.00),
(3, 4, 1, 1, 22000.00),

-- Order 2
(4, 5, 2, 1, 125000.00),
(5, 4, 2, 1, 22000.00),

-- Order 3
(6, 6, 3, 1, 95000.00),
(7, 8, 3, 1, 250000.00),

-- Order 4
(8, 8, 4, 1, 280000.00),

-- Order 5
(9, 6, 5, 1, 95000.00),

-- Order 6
(10, 3, 6, 2, 35000.00),
(11, 11, 6, 1, 55000.00),
(12, 12, 6, 1, 35000.00),

-- Order 7
(13, 5, 7, 2, 125000.00),
(14, 7, 7, 1, 45000.00),
(15, 4, 7, 1, 22000.00),

-- Order 8
(16, 14, 8, 1, 185000.00),

-- Order 9
(17, 7, 9, 1, 30000.00),
(18, 12, 9, 1, 28000.00),
(19, 13, 9, 1, 15000.00),
(20, 4, 9, 2, 22000.00),

-- Order 10
(21, 1, 10, 1, 450000.00);
GO

SELECT * FROM Category;
SELECT * FROM Product;
SELECT * FROM PurchaseOrder;
SELECT * FROM PurchaseOrderProduct;