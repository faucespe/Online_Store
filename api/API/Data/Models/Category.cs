using System;
using System.Collections.Generic;

namespace API.Data.Models;

public partial class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int IdStatus { get; set; }

    public virtual CategoryStatus IdStatusNavigation { get; set; } = null!;

    public virtual ICollection<Product> Product { get; set; } = new List<Product>();
}
