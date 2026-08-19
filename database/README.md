\# StoreDB - Database Scripts



SQL scripts for creating, configuring, and populating the `StoreDB` database.



\## Requirements



\- SQL Server

\- SQL Server Management Studio (SSMS) or any compatible SQL client

\- Permission to create databases



\## Scripts



| Script | Description |

|---|---|

| `database.sql` | Creates the `StoreDB` database and its tables. |

| `status-tables.sql` | Inserts the initial category and product status data. |

| `sample-data.sql` | Inserts sample data for development and testing. |



\## Database Setup



Follow these steps in the specified order.



\### Step 1 - Create the Database



Open `database.sql` in SQL Server Management Studio and execute the script.



This script creates the `StoreDB` database and the following tables:



\- `CategoryStatus`

\- `ProductStatus`

\- `Category`

\- `Product`

\- `PurchaseOrder`

\- `PurchaseOrderProduct`



The IDs for the main entities are generated automatically using `IDENTITY(1,1)`.



\### Step 2 - Insert Status Data



Open `status-tables.sql` and execute the script.



This script inserts the initial statuses required by the database:



| Id | Status |

|---:|---|

| 0 | Inactive |

| 1 | Active |



These records are required by the foreign key relationships in the `Category` and `Product` tables.



\### Step 3 - Insert Sample Data



Open `sample-data.sql` and execute the script.



This script inserts sample data for:



\- Categories

\- Products

\- Purchase orders

\- Purchase order details



The script checks whether the records already exist before inserting them, preventing duplicate data when the script is executed multiple times.



\## Execution Order



The scripts must be executed in the following order:



```text

1\. database.sql

&#x20;      ↓

2\. status-tables.sql

&#x20;      ↓

3\. sample-data.sql

