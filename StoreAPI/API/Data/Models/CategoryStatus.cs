using System;
using System.Collections.Generic;

namespace API.Data.Models;

public partial class CategoryStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<Category> Category { get; set; } = new List<Category>();
}
