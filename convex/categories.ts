import { query } from "./_generated/server";

// Query: list all categories
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("category").collect();
  },
});
