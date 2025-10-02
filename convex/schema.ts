import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  category: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.string(),
  }),
  product: defineTable({
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
  }),
  orders: defineTable({
    orderNumber: v.optional(v.string()),
    items: v.array(v.record(v.string(), v.string())),
    totalPrice: v.number(),
  }),
  customers: defineTable({
    contact: v.string(),
    name_first: v.string(),
    name_last: v.string(),
    secondary_contact: v.string(),
    address: v.string(),
  }),
});
