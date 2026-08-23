using API;
using API.Data;
using API.Services;
using API.Services.PurchaseOrderProductService;
using API.Validators;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using API.Validators.ProductValidator;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


builder.Services.AddAutoMapper(cfg =>
{
    cfg.LicenseKey = builder.Configuration["AutoMapper:LicenseKey"];
    cfg.AddMaps(typeof(Program));
});
builder.Services.AddDbContext<StoreDB>();

// Model Validation Errors
builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var response = HttpErrors.HandleModelState(context.ModelState);
        return new BadRequestObjectResult(response);
    };
});


//Services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryStatusService, CategoryStatusService>();
builder.Services.AddScoped<IProductStatusService, ProductStatusService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IPurchaseOrderService, PurchaseOrderService>();
builder.Services.AddScoped<IPurchaseOrderProductService, PurchaseOrderProductService>();

//Validators
builder.Services.AddScoped<IProductValidator, ProductValidator>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors(options => 
{
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

app.UseExceptionHandler("/errors/500");
app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.MapControllers();

app.Run();