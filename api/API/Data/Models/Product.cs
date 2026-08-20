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

    public int IdCategory { get; set; }

    public int IdStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int Stock { get; set; }

    public virtual Category IdCategoryNavigation { get; set; } = null!;

    public virtual ProductStatus IdStatusNavigation { get; set; } = null!;

    public virtual ICollection<PurchaseOrderProduct> PurchaseOrderProduct { get; set; } = new List<PurchaseOrderProduct>();
}
