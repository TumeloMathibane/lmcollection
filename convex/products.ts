import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
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
    id: v.id("product") || v.string(),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

// Query: search products by name and description
export const searchProducts = query({
  args: {
    searchTerm: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { searchTerm, limit = 10 } = args;
    if (!searchTerm || searchTerm.trim() === "") {
      return await ctx.db.query("product").order("desc").take(limit);
    }

    // search by name
    const nameResults = await ctx.db
      .query("product")
      .withSearchIndex("search_name", (q) => q.search("name", searchTerm))
      .take(limit);

    // search by description
    const descriptionResults = await ctx.db
      .query("product")
      .withSearchIndex("search_description", (q) =>
        q.search("shortDescription", searchTerm),
      )
      .take(limit);

    // combine and deduplicate results
    const combinedResults = [...nameResults, ...descriptionResults];
    const uniqueResults = Array.from(
      new Map(combinedResults.map((item) => [item._id, item])).values(),
    );

    // Sort by relevence (name  matches first)
    const sorted = uniqueResults.sort((a, b) => {
      const aNameMatch = a.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const bNameMatch = b.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });

    return sorted.slice(0, limit);
  },
});

// Get search suggestions
export const getSearchSuggestion = query({
  args: {
    searchTerm: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { searchTerm, limit = 10 }) => {
    if (!searchTerm || searchTerm.trim() === "") return [];

    const results = await ctx.db
      .query("product")
      .withSearchIndex("search_name", (q) => q.search("name", searchTerm))
      .take(limit);

    return results.map((product) => ({
      _id: product._id,
      name: product.name,
    }));
  },
});

// Add many products (array of products)
export const addMany = mutation({
  args: {
    products: v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        discount: v.number(),
        shortDescription: v.string(),
        quantity: v.number(),
        category: v.string(),
        images: v.array(v.string()),
        additional_options: v.record(v.string(), v.array(v.string())),
      }),
    ),
  },
  handler: async (ctx, args) => {
    for (const product of args.products) {
      await ctx.db.insert("product", product);
    }
    return { inserted: args.products.length };
  },
});
