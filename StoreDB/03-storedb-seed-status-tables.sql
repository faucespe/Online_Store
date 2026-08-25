USE StoreDB;
GO

-- INSERT DATA: CategoryStatus
INSERT INTO CategoryStatus (Id, [Status])
SELECT V.Id, V.[Status]
FROM (VALUES
    (0, 'Inactive'),
    (1, 'Active')
) AS V(Id, [Status])
WHERE NOT EXISTS (
    SELECT 1
    FROM CategoryStatus CS
    WHERE CS.Id = V.Id
);
GO

-- INSERT DATA: ProductStatus
INSERT INTO ProductStatus (Id, [Status])
SELECT V.Id, V.[Status]
FROM (VALUES
    (0, 'Inactive'),
    (1, 'Active')
) AS V(Id, [Status])
WHERE NOT EXISTS (
    SELECT 1
    FROM ProductStatus PS
    WHERE PS.Id = V.Id
);
GO