import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    orderId: v.string(),
    m_payment_id: v.string(),
    items: v.array(
      v.record(
        v.string(),
        v.union(v.string(), v.number(), v.record(v.string(), v.string())),
      ),
    ),
    totalPrice: v.number(),
    customer_details: v.record(v.string(), v.string()),
    shipping_details: v.record(v.string(), v.union(v.string(), v.number())),
    status: v.union(
      v.literal("received"),
      v.literal("pending"),
      v.literal("delivered"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    const rOrderId = await ctx.db.insert("orders", args);

    return rOrderId;
  },
});

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
