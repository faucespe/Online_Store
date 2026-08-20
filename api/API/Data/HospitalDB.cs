using System;
using System.Collections.Generic;
using API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public partial class HospitalDB : DbContext
{
    public HospitalDB()
    {
    }

    public HospitalDB(DbContextOptions<HospitalDB> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Category { get; set; }

    public virtual DbSet<CategoryStatus> CategoryStatus { get; set; }

    public virtual DbSet<Product> Product { get; set; }

    public virtual DbSet<ProductStatus> ProductStatus { get; set; }

    public virtual DbSet<PurchaseOrder> PurchaseOrder { get; set; }

    public virtual DbSet<PurchaseOrderProduct> PurchaseOrderProduct { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=StoreDB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(e => e.Name)
                .HasMaxLength(60)
                .IsUnicode(false);

            entity.HasOne(d => d.IdStatusNavigation).WithMany(p => p.Category)
                .HasForeignKey(d => d.IdStatus)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CategoryStatus_Category");
        });

        modelBuilder.Entity<CategoryStatus>(entity =>
        {
            entity.HasIndex(e => e.Id, "UX_CategoryStatusId").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Status)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.ImageUrl).IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.IdCategoryNavigation).WithMany(p => p.Product)
                .HasForeignKey(d => d.IdCategory)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Category_Product");

            entity.HasOne(d => d.IdStatusNavigation).WithMany(p => p.Product)
                .HasForeignKey(d => d.IdStatus)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductStatus_Product");
        });

        modelBuilder.Entity<ProductStatus>(entity =>
        {
            entity.HasIndex(e => e.Id, "UX_ProductStatusId").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Status)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PurchaseOrder>(entity =>
        {
            entity.Property(e => e.CustomerAddress)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerEmail)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CustomerName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CustomerPhoneNumber)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.GrandTotal).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<PurchaseOrderProduct>(entity =>
        {
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.PurchaseOrderProduct)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_PurchaseOrderProduct");

            entity.HasOne(d => d.IdPurchaseOrderNavigation).WithMany(p => p.PurchaseOrderProduct)
                .HasForeignKey(d => d.IdPurchaseOrder)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PurchaseOrder_PurchaseOrderProduct");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
