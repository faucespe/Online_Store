using System;
using System.Collections.Generic;

namespace API.Data.Models;

public partial class ProductStatus
{
    public int Id { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Product> Product { get; set; } = new List<Product>();
}
