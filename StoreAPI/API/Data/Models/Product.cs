using System;
using System.Collections.Generic;

namespace API.Data.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? ImageUrl { get; set; }

    public decimal Price { get; set; }

    public int? CategoryId { get; set; }

    public int ProductStatusId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int Stock { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ProductStatus ProductStatus { get; set; } = null!;

    public virtual ICollection<PurchaseOrderProduct> PurchaseOrderProduct { get; set; } = new List<PurchaseOrderProduct>();
}
