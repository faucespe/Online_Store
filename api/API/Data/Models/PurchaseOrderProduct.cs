using System;
using System.Collections.Generic;

namespace API.Data.Models;

public partial class PurchaseOrderProduct
{
    public int Id { get; set; }

    public int IdProduct { get; set; }

    public int IdPurchaseOrder { get; set; }

    public int ProductQuantity { get; set; }

    public decimal Price { get; set; }

    public virtual Product IdProductNavigation { get; set; } = null!;

    public virtual PurchaseOrder IdPurchaseOrderNavigation { get; set; } = null!;
}
