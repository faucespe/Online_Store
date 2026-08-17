-- TEST DATA: SELEC ALL TABLES
SELECT * FROM CategoryStatus;
SELECT * FROM ProductStatus;
SELECT * FROM Category;
SELECT * FROM Product;
SELECT * FROM PurchaseOrder;
SELECT * FROM PurchaseOrderProduct;

-- TEST DATA: by Category
SELECT * FROM Category WHERE Id = 3;
SELECT * FROM Category WHERE CategoryName = 'Monitores';
SELECT * FROM Category WHERE [Status] = 2;

INSERT INTO Category (Id, CategoryName, [Status])
VALUES (6, 'Audio', 1);
SELECT * FROM Category;

UPDATE Category
SET [Status] = 2
WHERE Id = 6;
SELECT * FROM Category;

UPDATE Category
SET CategoryName = 'Audio y Sonido'
WHERE Id = 6;
SELECT * FROM Category;

INSERT INTO Category (Id, CategoryName, [Status])
VALUES (6, 'Uso Personal', 1);

DELETE FROM Category;
SELECT * FROM Category;

INSERT INTO Category (CategoryName, [Status])
VALUES ('Uso Personal', 1);

-- TEST DATA: by Products
SELECT * FROM Product;
SELECT * FROM Product WHERE Id = 2;
SELECT * FROM Product WHERE ProductName = 'Teclado de Oficina';
SELECT * FROM Product WHERE CategoryId = 4;
SELECT * FROM Product WHERE [Status] = 2;

SELECT *
FROM Product
WHERE Price BETWEEN 35000.00 AND 40000.00;
DELETE FROM Product WHERE Id = 1;

-- TEST DATA: Product UpdateAt Changes
UPDATE Product
SET UpdatedAt = '2026-08-10 10:30:00'
WHERE Id = 1;

UPDATE Product
SET UpdatedAt = '2026-08-11 14:15:00'
WHERE Id = 3;

UPDATE Product
SET UpdatedAt = '2026-08-12 09:45:00'
WHERE Id = 5;

UPDATE Product
SET UpdatedAt = '2026-08-14 11:00:00'
WHERE Id = 7;
GO
SELECT * FROM Product;

-- TEST DATA: Product Status Changes
UPDATE Product
SET [Status] = 2
WHERE Id = 2;

UPDATE Product
SET [Status] = 2
WHERE Id = 4;

UPDATE Product
SET [Status] = 2
WHERE Id = 6;

UPDATE Product
SET [Status] = 2
WHERE Id = 8;
GO
SELECT * FROM Product;

-- TEST DATA: Product to Category
SELECT
    p.Id AS ProductId,
    p.ProductName,
    p.Price,
    p.Stock,
    c.CategoryName
FROM Product p
INNER JOIN Category c
    ON p.CategoryId = c.Id
WHERE c.Id = 2;

SELECT *
FROM Category
WHERE Id = 2;

-- TEST DATA: PurchaseOrderProducts by PurchaseOrder
SELECT *
FROM PurchaseOrder
WHERE Id = 7;

SELECT *
FROM PurchaseOrderProduct
WHERE PurchaseOrderId = 7;

-- TEST DATA: Calculate GrandTotal by PurchaseOrders
SELECT
    pop.Id,
    pop.PurchaseOrderId,
    pop.ProductId,
    p.ProductName,
    pop.ProductQuantity,
    pop.Price
FROM PurchaseOrderProduct pop
INNER JOIN Product p
    ON pop.ProductId = p.Id
WHERE pop.PurchaseOrderId = 7;

-- TEST DATA: Calculate GrandTotal all PurchaseOrders
SELECT
    SUM(ProductQuantity * Price) AS CalculatedTotal
FROM PurchaseOrderProduct
WHERE PurchaseOrderId = 1;

SELECT
    po.Id AS PurchaseOrderId,
    po.GrandTotal,
    SUM(pop.ProductQuantity * pop.Price) AS CalculatedTotal
FROM PurchaseOrder po
INNER JOIN PurchaseOrderProduct pop
    ON po.Id = pop.PurchaseOrderId
GROUP BY
    po.Id,
    po.GrandTotal;

-- TEST DATA: PurchaseOrder by Date
SELECT *
FROM PurchaseOrder
WHERE PurchaseDate BETWEEN '2026-08-01' AND '2026-08-3';

-- TEST DATA: PurchaseOrder by GrandTotal
SELECT *
FROM PurchaseOrder
WHERE GrandTotal BETWEEN 100000 AND 200000;

DELETE FROM PurchaseOrderProduct;
DELETE FROM PurchaseOrder;
DELETE FROM Product;
DELETE FROM Category;
DELETE FROM ProductStatus;
DELETE FROM CategoryStatus;