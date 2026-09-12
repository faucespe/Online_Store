using System;
using System.Collections.Generic;

namespace API.Data.Models;

public class CartProduct
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public partial class PurchaseOrderCustom
{
    public int Id { get; set; }

    public string CustomerName { get; set; } = null!;

    public string CustomerPhoneNumber { get; set; } = null!;

    public string CustomerEmail { get; set; } = null!;

    public string CustomerAddress { get; set; } = null!;

    public DateTime PurchaseDate { get; set; }

    public decimal GrandTotal { get; set; }

    public List<CartProduct> CartProducts { get; set; } = new();

}
