import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const generateUploadURL = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const deleteFile = mutation({
  args: { id: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.id);
  },
});

export const createProduct = mutation({
  args: {
    brand: v.string(),
    name: v.string(),
    price: v.number(),
    discount: v.optional(v.number()),
    shortDescription: v.string(),
    quantity: v.number(),
    category: v.string(),
    images: v.array(v.id("_storage")),
    additional_options: v.array(v.record(v.string(), v.string())),
    dynamic_pricing: v.boolean(),
    pricing_by: v.string(),
    sale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("product", {
      brand: args.brand,
      name: args.name,
      price: args.price,
      discount: args.discount,
      shortDescription: args.shortDescription,
      quantity: args.quantity,
      category: args.category,
      images: args.images,
      additional_options: args.additional_options,
      dynamic_pricing: args.dynamic_pricing,
      pricing_by: args.pricing_by,
      sale: args.sale,
    });
  },
});

export const getProduct = query({
  args: { id: v.id("product") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get("product", args.id);

    if (!product) {
      return null;
    }

    const imgUrls = await Promise.all(
      product.images.map(async (imgId) => {
        const url = await ctx.storage.getUrl(imgId as Id<"_storage">);
        return url as string;
      }),
    );

    return { ...product, images: imgUrls };
  },
});

export const updateProduct = mutation({
  args: {
    _id: v.id("product"),
    brand: v.optional(v.string()),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    discount: v.optional(v.number()),
    shortDescription: v.optional(v.string()),
    quantity: v.optional(v.number()),
    category: v.optional(v.string()),
    images: v.optional(v.array(v.id("_storage"))),
    additional_options: v.optional(v.array(v.record(v.string(), v.string()))),
    dynamic_pricing: v.optional(v.boolean()),
    pricing_by: v.optional(v.string()),
    sale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get("product", args._id);
    if (!existing) {
      throw new Error("Product not found");
    }

    const updated = {
      brand: args.brand ?? existing.brand,
      name: args.name ?? existing.name,
      price: args.price ?? existing.price,
      discount: args.discount ?? existing.discount,
      shortDescription: args.shortDescription ?? existing.shortDescription,
      quantity: args.quantity ?? existing.quantity,
      category: args.category ?? existing.category,
      images: args.images ?? existing.images,
      additional_options:
        args.additional_options ?? existing.additional_options,
      dynamic_pricing: existing.dynamic_pricing,
      pricing_by: args.pricing_by ?? existing.pricing_by,
      sale: args.sale ?? existing.sale,
    };

    try {
      await ctx.db.patch("product", args._id, updated);
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  },
});

export const deleteProduct = mutation({
  args: { id: v.id("product") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get("product", args.id);
    if (!product) {
      throw new Error("Product not found");
    }

    for (const imgId of product.images) {
      await ctx.storage.delete(imgId as Id<"_storage">);
    }

    await ctx.db.delete("product", args.id);
  },
});

export const getProducts = query({
  args: { count: v.optional(v.number()), category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.count) {
      const products = await ctx.db.query("product").take(args.count);

      return await Promise.all(
        products.map(async (product) => {
          const imgUrls = await Promise.all(
            product.images.map(async (imgId) => {
              const url = await ctx.storage.getUrl(imgId as Id<"_storage">);
              return url as string;
            }),
          );

          return { ...product, images: imgUrls };
        }),
      );
    }

    if (args.category) {
      const products = await ctx.db
        .query("product")
        .filter((p) => p.eq(p.field("category"), args?.category))
        .collect();

      return await Promise.all(
        products.map(async (product) => {
          const imgUrls = await Promise.all(
            product.images.map(async (imgId) => {
              const url = await ctx.storage.getUrl(imgId as Id<"_storage">);
              return url as string;
            }),
          );

          return { ...product, images: imgUrls };
        }),
      );
    }

    const products = await ctx.db.query("product").collect();

    return await Promise.all(
      products.map(async (product) => {
        const imgUrls = await Promise.all(
          product.images.map(async (imgId) => {
            const url = await ctx.storage.getUrl(imgId as Id<"_storage">);
            return url as string;
          }),
        );

        return { ...product, images: imgUrls };
      }),
    );
  },
});

export const searchProducts = query({
  args: { searchTerm: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const term = (args.searchTerm ?? "").trim().toLowerCase();
    if (!term) return [];

    const products = await ctx.db.query("product").collect();

    const matched = products.filter((p) => {
      const name = (p.name ?? "").toString().toLowerCase();
      const brand = (p.brand ?? "").toString().toLowerCase();
      const category = (p.category ?? "").toString().toLowerCase();
      const shortDescription = (p.shortDescription ?? "")
        .toString()
        .toLowerCase();
      return (
        name.includes(term) ||
        brand.includes(term) ||
        category.includes(term) ||
        shortDescription.includes(term)
      );
    });

    const limited =
      typeof args.limit === "number" ? matched.slice(0, args.limit) : matched;

    return await Promise.all(
      limited.map(async (product) => {
        const img =
          product.images && product.images.length > 0 ?
            product.images[0]
          : null;
        const image =
          img ? await ctx.storage.getUrl(img as Id<"_storage">) : null;

        return {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: image as string | null,
          category: product.category,
        };
      }),
    );
  },
});

export const getSearchSuggestion = query({
  args: { searchTerm: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const term = (args.searchTerm ?? "").trim().toLowerCase();
    if (!term) return [];

    const products = await ctx.db.query("product").collect();

    const names: string[] = [];
    for (const p of products) {
      const name = (p.name ?? "").toString();
      if (name.toLowerCase().includes(term) && !names.includes(name)) {
        names.push(name);
        if (typeof args.limit === "number" && names.length >= args.limit) break;
      }
    }

    return names.map((n) => ({ name: n }));
  },
});
