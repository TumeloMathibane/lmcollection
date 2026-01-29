import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const generateUploadURL = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createProduct = mutation({
  args: {
    brand: v.string(),
    name: v.string(),
    price: v.number(),
    discount: v.number(),
    shortDescription: v.string(),
    quantity: v.number(),
    category: v.string(),
    images: v.array(v.id("_storage")),
    additional_options: v.array(
      v.record(
        v.string(),
        v.union(
          v.string(),
          v.array(v.string()),
          v.record(v.string(), v.string()),
        ),
      ),
    ),
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
    });
  },
});

export const getProduct = query({
  args: { id: v.id("product") },
  handler: async (ctx, args) => {
    // return await ctx.db.get("product", args.id);

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
        .filter((p) => p.eq("category", args.category))
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
