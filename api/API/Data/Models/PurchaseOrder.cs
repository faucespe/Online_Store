using System;
using System.Collections.Generic;

namespace API.Data.Models;

public partial class PurchaseOrder
{
    public int Id { get; set; }

    public string CustomerName { get; set; } = null!;

    public string CustomerPhoneNumber { get; set; } = null!;

    public string CustomerEmail { get; set; } = null!;

    public string CustomerAddress { get; set; } = null!;

    public DateTime PurchaseDate { get; set; }

    public decimal GrandTotal { get; set; }

    public virtual ICollection<PurchaseOrderProduct> PurchaseOrderProduct { get; set; } = new List<PurchaseOrderProduct>();
}
