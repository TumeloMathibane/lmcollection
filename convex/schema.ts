import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  category: defineTable({
    name: v.string(),
    no_of_items: v.number(),
    image: v.optional(v.string()),
  }).searchIndex("search_category", { searchField: "name" }),
  product: defineTable({
    name: v.string(),
    price: v.number(),
    discount: v.number(),
    shortDescription: v.string(),
    quantity: v.number(),
    category: v.string(),
    images: v.array(v.string()),
    // additional_options: v.record(
    //   v.string(),
    //   v.union(v.string(), v.array(v.union(v.string(), v.number())))
    // ),
    additional_options: v.array(
      v.record(v.string(), v.union(v.string(), v.array(v.string()))),
    ),
  })
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_description", { searchField: "shortDescription" }),
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
