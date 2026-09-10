## Dependencies
The API requires the following dependencies:

	Microsoft.EntityFrameworkCore.Tools - 10.0.11
	Microsoft.EntityFrameworkCore.Design - 10.0.11
	Microsoft.EntityFrameworkCore.SqlServer - 10.0.11
	AutoMapper - 16.2.0
  swashbuckle.aspnetcore - 10.2.3

## Database Connection
the connection is configured via appsettings.json using the ConnectionStrings section:

  ```json
  "ConnectionStrings": {
    "StoreDB": "Server=(local);Database=StoreDB;trusted_Connection=True;Encrypt=False"
  }
  ```

The instance is expected to be available locally

## AutoMapper Configuration

Automapper 16.2.0 requires a licenseKey which can be generated on the website https://luckypennysoftware.com.

The API is able to read the LicenseKey from the .appsettings file using the AutoMapper Section:

```json
 "AutoMapper": {
   "LicenseKey": "Insert the licencekey here"
 }	
 ```

## Using Swagger

to access this functionality, with the program running, go to the following URL https://localhost:XXXX/swagger/index.html 

Replace the XXXX with the localhost port generated in the terminal

e.g.
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7044

Swagger automatically generates new CRUDs added to the API

To request a CRUD

Select the desired Category, then click on the response type you want to request to open the request panel 

Click on "Try it Out" fill in the required parameters, and click "Execute" to open the request 