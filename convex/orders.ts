import { query } from "./_generated/server";

export const getOrders = query({
  handler: async (ctx) => {
    return ctx.db.query("orders").collect();
  },
});

export const orderCount = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    return orders.length;
  },
});
