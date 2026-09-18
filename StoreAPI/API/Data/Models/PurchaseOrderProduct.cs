using System;
using System.Collections.Generic;

namespace API.Data.Models;

public partial class PurchaseOrderProduct
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int PurchaseOrderId { get; set; }

    public int ProductQuantity { get; set; }

    public decimal Price { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual PurchaseOrder PurchaseOrder { get; set; } = null!;
}
