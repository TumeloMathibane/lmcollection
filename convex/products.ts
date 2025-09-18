import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: list all or n product/s
export const get = query({
  args: { category: v.optional(v.string()), count: v.optional(v.number()) },
  handler: async (ctx, { category, count }) => {
    if (count) return await ctx.db.query("product").take(count);

    if (category)
      return await ctx.db
        .query("product")
        .filter((product) => product.eq(product.field("category"), category))
        .collect();

    if (category && count)
      return await ctx.db
        .query("product")
        .filter((product) => product.eq(product.field("category"), category))
        .take(count);

    return await ctx.db.query("product").collect();
  },
});

// Query: get all products of a category
export const getCategoryProducts = query({
  args: { category: v.string(), count: v.optional(v.number()) },
  handler: async (ctx, { category, count }) => {
    if (count)
      return await ctx.db
        .query("product")
        .filter((product) => product.eq(product.field("category"), category))
        .take(count);

    return await ctx.db
      .query("product")
      .filter((product) => product.eq(product.field("category"), category))
      .collect();
  },
});

// Query: get one specific product...
export const getProduct = query({
  args: {
    id: v.id("product"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Add many products (array of products)
export const addMany = mutation({
  args: {
    products: v.array(
      v.object({
        itemCode: v.string(),
        name: v.string(),
        price: v.number(),
        discount: v.number(),
        shortDescription: v.string(),
        availableSizes: v.array(v.string()),
        availableQuantity: v.number(),
        category: v.string(),
        image: v.string(),
        additional_options: v.optional(v.record(v.string(), v.any())),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const product of args.products) {
      await ctx.db.insert("product", product);
    }
    return { inserted: args.products.length };
  },
});
