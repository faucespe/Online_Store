INSERT INTO CategoryStatus (Id, [Status])
VALUES
(0, 'Inactive'),
(1, 'Active');
GO

INSERT INTO ProductStatus (Id, [Status])
VALUES
(0, 'Inactive'),
(1, 'Active');
GO

SELECT * FROM CategoryStatus;
SELECT * FROM ProductStatus;