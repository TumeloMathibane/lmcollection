import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  category: defineTable({
    name: v.string(),
    no_of_items: v.number(),
    image: v.optional(v.string()),
  }).searchIndex("search_name", { searchField: "name" }),
  product: defineTable({
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
  })
    .searchIndex("search_brand", { searchField: "brand" })
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_description", { searchField: "shortDescription" })
    .searchIndex("search_category", { searchField: "category" })
    .searchIndex("search_sale", { searchField: "sale" }),
  orders: defineTable({
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
  }),
  customers: defineTable({
    name_first: v.string(),
    name_last: v.string(),
    contact: v.string(),
    secondary_contact: v.string(),
    address: v.record(v.string(), v.string()),
  }),
});
