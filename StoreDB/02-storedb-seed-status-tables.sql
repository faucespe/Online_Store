USE StoreDB;
GO

-- INSERT DATA: CategoryStatus
INSERT INTO CategoryStatus (Id, [Name])
SELECT V.Id, V.[Name]
FROM (VALUES
    (1, 'Inactive'),
    (2, 'Active')
) AS V(Id, [Name])
WHERE NOT EXISTS (
    SELECT 1
    FROM CategoryStatus CS
    WHERE CS.Id = V.Id
);
GO

-- INSERT DATA: ProductStatus
INSERT INTO ProductStatus (Id, [Name])
SELECT V.Id, V.[Name]
FROM (VALUES
    (1, 'Inactive'),
    (2, 'Active')
) AS V(Id, [Name])
WHERE NOT EXISTS (
    SELECT 1
    FROM ProductStatus PS
    WHERE PS.Id = V.Id
);
GO