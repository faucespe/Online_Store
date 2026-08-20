#Comando para ejecutar DbScaffol: .\API\DbScaffol.ps1

Scaffold-DbContext "Name=StoreDB" Microsoft.EntityFrameworkCore.SqlServer -Context HospitalDB -ContextDir Data -OutPutDir Data\Models -Force -NoPluralize