USE StoreDB;
GO

-- Ejecutar primero "status-tables.sql"

-- INSERT DATA: Category
INSERT INTO Category ([Name], CategoryStatusId)
SELECT V.[Name], V.CategoryStatusId
FROM (VALUES
    ('Computadoras', 2),
    ('Periféricos', 2),
    ('Monitores', 2),
    ('Componentes', 2),
    ('Accesorios', 1)
) AS V([Name], CategoryStatusId)
WHERE NOT EXISTS (
    SELECT 1
    FROM Category C
    WHERE C.[Name] = V.[Name]
);
GO

-- INSERT DATA: Product
INSERT INTO Product
(
    [Name],
    [Description],
    ImageUrl,
    Price,
    CategoryId,
    ProductStatusId,
    CreatedAt,
    UpdatedAt,
    Stock
)
SELECT
    V.[Name],
    V.[Description],
    V.ImageUrl,
    V.Price,
    C.Id,
    V.ProductStatusId,
    GETDATE(),
    NULL,
    V.Stock
FROM (VALUES
    ('Laptop Lenovo IdeaPad', 'Laptop para uso académico y profesional','https://m.media-amazon.com/images/I/81RiFsuQynL._AC_SL1500_.jpg', 450000.00, 'Computadoras', 2, 15),
    ('Teclado Mecánico RGB', 'Teclado mecánico con iluminación RGB', '', 35000.00, 'Periféricos', 2, 30),
    ('Monitor LG 27', 'Monitor de 27 pulgadas Full HD', 'https://m.media-amazon.com/images/I/71XVJMTza3L._AC_SX466_.jpg',125000.00, 'Monitores', 2, 10),
    ('Memoria RAM 16GB DDR5', 'Memoria RAM DDR5 de 16GB', '',45000.00, 'Componentes', 2, 25),
    ('Mouse Gamer', 'Mouse óptico para gaming', 'https://m.media-amazon.com/images/I/51+51Ur4jzL._AC_SY300_SX300_QL70_FMwebp_.jpg',22000.00, 'Periféricos', 2, 40),
    ('Tarjeta Gráfica RTX 4060', 'Tarjeta gráfica de 8GB', 'https://m.media-amazon.com/images/I/71wv2w6edAL._AC_SL1500_.jpg',280000.00, 'Componentes', 2, 8),
    ('Webcam Full HD', 'Cámara web Full HD para videollamadas', 'https://m.media-amazon.com/images/I/71A0Pp767BL._AC_SL1500_.jpg',30000.00, 'Accesorios', 2, 20),
    ('Audífonos Gamer', 'Audífonos con micrófono integrado', 'https://m.media-amazon.com/images/I/51Vqs9NufmL._AC_SY300_SX300_QL70_FMwebp_.jpg',55000.00, 'Accesorios', 2, 18),
    ('SSD NVMe 1TB', 'Unidad de almacenamiento SSD NVMe de 1TB', 'https://m.media-amazon.com/images/I/61Z-ruHaMhL._AC_SL1047_.jpg',65000.00, 'Componentes', 2, 20),
    ('Webcam Full HD 2', 'Cámara web Full HD para videollamadas', 'https://m.media-amazon.com/images/I/61WQr6U3mwL._AC_SY300_SX300_QL70_FMwebp_.jpg',30000.00, 'Accesorios', 2, 22),
    ('Audífonos Gamer 2', 'Audífonos con micrófono integrado para videojuegos', 'https://m.media-amazon.com/images/I/81Q5bOpJw+L._AC_SY300_SX300_QL70_FMwebp_.jpg',55000.00, 'Accesorios', 2, 18),
    ('Base para Laptop', 'Base ajustable para laptops', 'https://m.media-amazon.com/images/I/51KyaTB1EKL._AC_SL1500_.jpg',28000.00, 'Accesorios', 2, 14),
    ('Teclado de Oficina', 'Teclado estándar para uso empresarial', '',15000.00, 'Periféricos', 2, 35),
    ('Monitor Curvo 32', 'Monitor curvo de 32 pulgadas para entretenimiento', 'https://shop.samsung.com/latin/cac/pub/media/catalog/product/l/s/ls27bg6_001_front_black_thumb_1.png', 210000.00, 'Monitores', 1, 7),
    ('Tarjeta Madre B650', 'Tarjeta madre compatible con procesadores AMD', 'https://m.media-amazon.com/images/I/71ipZ0RboTL._AC_SL1500_.jpg', 145000.00, 'Componentes', 1, 0)
) AS V(
    [Name],
    [Description],
    ImageUrl,
    Price,
    CategoryName,
    ProductStatusId,
    Stock
)
INNER JOIN Category C
    ON C.[Name] = V.CategoryName
WHERE NOT EXISTS (
    SELECT 1
    FROM Product P
    WHERE P.[Name] = V.[Name]
);
GO

-- INSERT DATA: PurchaseOrder
INSERT INTO PurchaseOrder
(
    CustomerName,
    CustomerPhoneNumber,
    CustomerEmail,
    CustomerAddress,
    PurchaseDate,
    GrandTotal
)
SELECT
    V.CustomerName,
    V.CustomerPhoneNumber,
    V.CustomerEmail,
    V.CustomerAddress,
    V.PurchaseDate,
    V.GrandTotal
FROM (VALUES
    ('Carlos Rodríguez', '88881111', 'carlos.rodriguez@email.com',
     'San José, Costa Rica', '2026-08-01 09:30:00', 507000.00),

    ('María González', '88882222', 'maria.gonzalez@email.com',
     'Alajuela, Costa Rica', '2026-08-03 14:15:00', 147000.00),

    ('Andrés Vargas', '88883333', 'andres.vargas@email.com',
     'Heredia, Costa Rica', '2026-08-05 11:45:00', 345000.00),

    ('Sofía Hernández', '88884444', 'sofia.hernandez@email.com',
     'Cartago, Costa Rica', '2026-08-07 16:20:00', 280000.00),

    ('Daniel Castro', '88885555', 'daniel.castro@email.com',
     'Puntarenas, Costa Rica', '2026-08-10 10:00:00', 95000.00),

    ('Laura Ramírez', '88886666', 'laura.ramirez@email.com',
     'Limón, Costa Rica', '2026-08-12 13:30:00', 160000.00),

    ('José Méndez', '88887777', 'jose.mendez@email.com',
     'Guanacaste, Costa Rica', '2026-08-14 15:45:00', 317000.00),

    ('Miguel Solano', '88889999', 'miguel.solano@email.com',
     'San José, Costa Rica', '2026-08-15 09:20:00', 185000.00),

    ('Daniela Rojas', '88880000', 'daniela.rojas@email.com',
     'Heredia, Costa Rica', '2026-08-16 12:40:00', 117000.00),

    ('Luis Jiménez', '88881122', 'luis.jimenez@email.com',
     'Alajuela, Costa Rica', '2026-08-16 16:10:00', 365000.00)
) AS V(
    CustomerName,
    CustomerPhoneNumber,
    CustomerEmail,
    CustomerAddress,
    PurchaseDate,
    GrandTotal
)
WHERE NOT EXISTS (
    SELECT 1
    FROM PurchaseOrder PO
    WHERE PO.CustomerEmail = V.CustomerEmail
      AND PO.PurchaseDate = V.PurchaseDate
);
GO

-- INSERT DATA: PurchaseOrderProduct
INSERT INTO PurchaseOrderProduct
(
    ProductId,
    PurchaseOrderId,
    ProductQuantity,
    Price
)
SELECT
    P.Id,
    PO.Id,
    V.ProductQuantity,
    V.Price
FROM (VALUES
    -- Order 1
    ('carlos.rodriguez@email.com', '2026-08-01 09:30:00',
     'Laptop Lenovo IdeaPad', 1, 450000.00),

    ('carlos.rodriguez@email.com', '2026-08-01 09:30:00',
     'Monitor LG 27"', 1, 35000.00),

    ('carlos.rodriguez@email.com', '2026-08-01 09:30:00',
     'Memoria RAM 16GB DDR5', 1, 22000.00),

    -- Order 2
    ('maria.gonzalez@email.com', '2026-08-03 14:15:00',
     'Mouse Gamer', 1, 125000.00),

    ('maria.gonzalez@email.com', '2026-08-03 14:15:00',
     'Memoria RAM 16GB DDR5', 1, 22000.00),

    -- Order 3
    ('andres.vargas@email.com', '2026-08-05 11:45:00',
     'Tarjeta Gráfica RTX 4060', 1, 95000.00),

    ('andres.vargas@email.com', '2026-08-05 11:45:00',
     'Audífonos Gamer', 1, 250000.00),

    -- Order 4
    ('sofia.hernandez@email.com', '2026-08-07 16:20:00',
     'Audífonos Gamer', 1, 280000.00),

    -- Order 5
    ('daniel.castro@email.com', '2026-08-10 10:00:00',
     'Tarjeta Gráfica RTX 4060', 1, 95000.00),

    -- Order 6
    ('laura.ramirez@email.com', '2026-08-12 13:30:00',
     'Monitor LG 27"', 2, 35000.00),

    ('laura.ramirez@email.com', '2026-08-12 13:30:00',
     'Audífonos Gamer 2', 1, 55000.00),

    ('laura.ramirez@email.com', '2026-08-12 13:30:00',
     'Base para Laptop', 1, 35000.00),

    -- Order 7
    ('jose.mendez@email.com', '2026-08-14 15:45:00',
     'Mouse Gamer', 2, 125000.00),

    ('jose.mendez@email.com', '2026-08-14 15:45:00',
     'Webcam Full HD', 1, 45000.00),

    ('jose.mendez@email.com', '2026-08-14 15:45:00',
     'Memoria RAM 16GB DDR5', 1, 22000.00),

    -- Order 8
    ('miguel.solano@email.com', '2026-08-15 09:20:00',
     'Monitor Curvo 32"', 1, 185000.00),

    -- Order 9
    ('daniela.rojas@email.com', '2026-08-16 12:40:00',
     'Webcam Full HD', 1, 30000.00),

    ('daniela.rojas@email.com', '2026-08-16 12:40:00',
     'Base para Laptop', 1, 28000.00),

    ('daniela.rojas@email.com', '2026-08-16 12:40:00',
     'Teclado de Oficina', 1, 15000.00),

    ('daniela.rojas@email.com', '2026-08-16 12:40:00',
     'Memoria RAM 16GB DDR5', 2, 22000.00),

    -- Order 10
    ('luis.jimenez@email.com', '2026-08-16 16:10:00',
     'Laptop Lenovo IdeaPad', 1, 450000.00)

) AS V(
    CustomerEmail,
    PurchaseDate,
    ProductName,
    ProductQuantity,
    Price
)
INNER JOIN PurchaseOrder PO
    ON PO.CustomerEmail = V.CustomerEmail
    AND PO.PurchaseDate = V.PurchaseDate
INNER JOIN Product P
    ON P.[Name] = V.ProductName
WHERE NOT EXISTS (
    SELECT 1
    FROM PurchaseOrderProduct POP
    WHERE POP.ProductId = P.Id
      AND POP.PurchaseOrderId = PO.Id
);
GO