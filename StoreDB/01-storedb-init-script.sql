-- Create Data Base
IF NOT EXISTS (SELECT * FROM sys.databases where name = 'StoreDB')
BEGIN
	CREATE DATABASE StoreDB
END
GO

USE StoreDB
go

-- Create table CategoryStatus
IF NOT EXISTS (SELECT * FROM sys.sysobjects where name = 'CategoryStatus' AND xtype = 'U')
BEGIN
	CREATE TABLE CategoryStatus (
		Id INT NOT NULL,
		[Name] VARCHAR(15) NOT NULL,
		CONSTRAINT PK_CategoryStatusId PRIMARY KEY (Id),
	)
END
GO

-- Create table ProductStatus
IF NOT EXISTS (SELECT * FROM sys.sysobjects where name = 'ProductStatus' AND xtype = 'U')
BEGIN
	CREATE TABLE ProductStatus (
		Id INT NOT NULL,
		[Name] VARCHAR(15) NOT NULL,
		CONSTRAINT PK_ProductStatusId PRIMARY KEY (Id),
	)
END
GO

-- Create table Category
IF NOT EXISTS (SELECT * FROM sys.sysobjects where name = 'Category' AND xtype = 'U')
BEGIN
	CREATE TABLE Category (
		Id INT  IDENTITY(1,1) NOT NULL,
		[Name] VARCHAR(60) NOT NULL,
		CategoryStatusId INT NOT NULL,
		CONSTRAINT PK_Category PRIMARY KEY (Id),
		CONSTRAINT FK_CategoryStatus_Category FOREIGN KEY (CategoryStatusId) REFERENCES CategoryStatus (Id),
	)
END
GO

-- Create table Product
IF NOT EXISTS (SELECT * FROM sys.sysobjects where name = 'Product' AND xtype = 'U')
BEGIN
	CREATE TABLE [Product] (
		Id INT IDENTITY(1,1) NOT NULL,
		[Name] VARCHAR(60) NOT NULL,
		[Description] VARCHAR(500) NOT NULL,
		ImageUrl VARCHAR(MAX),
		Price DECIMAL(10,2) NOT NULL,
		CategoryId INT NULL,
		ProductStatusId INT NOT NULL,
		CreatedAt DATETIME2 (7),
		UpdatedAt DATETIME2 (7),
		Stock INT NOT NULL,
		CONSTRAINT PK_Product PRIMARY KEY (Id),
		CONSTRAINT FK_Category_Product FOREIGN KEY (CategoryId) REFERENCES Category (Id),
		CONSTRAINT FK_ProductStatus_Product FOREIGN KEY (ProductStatusId) REFERENCES ProductStatus (Id),
	)
END
GO

-- Create table Purchase Order
IF NOT EXISTS (SELECT * FROM sys.sysobjects where name = 'PurchaseOrder' AND xtype = 'U')
BEGIN
	CREATE TABLE PurchaseOrder (
		Id INT IDENTITY(1,1) NOT NULL,
		CustomerName VARCHAR(50) NOT NULL,
		CustomerPhoneNumber VARCHAR(8) NOT NULL,
		CustomerEmail VARCHAR(100) NOT NULL,
		CustomerAddress VARCHAR(100) NOT NULL,
		PurchaseDate DATETIME2(7) NOT NULL,
		GrandTotal DECIMAL(10,2) NOT NULL,
		CONSTRAINT PK_PurchaseOrder PRIMARY KEY (Id)
	)
END
GO

-- Create table Purchase Order Product
IF NOT EXISTS (SELECT * FROM sys.sysobjects where name = 'PurchaseOrderProduct' AND xtype = 'U')
BEGIN
	CREATE TABLE PurchaseOrderProduct (
		Id INT IDENTITY(1,1) NOT NULL,
		ProductId INT NOT NULL,
		PurchaseOrderId INT NOT NULL,
		ProductQuantity INT NOT NULL,
		Price DECIMAL(10,2) NOT NULL,
		CONSTRAINT PK_PurchaseOrderProduct PRIMARY KEY (Id),
		CONSTRAINT FK_Product_PurchaseOrderProduct FOREIGN KEY (ProductId) REFERENCES [Product] (Id),
		CONSTRAINT FK_PurchaseOrder_PurchaseOrderProduct FOREIGN KEY (PurchaseOrderId) REFERENCES PurchaseOrder (Id),
	)
END
GO	


