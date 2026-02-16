// convex/users.js
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return user;
  },
});

// Create new user
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    hashedPassword: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("User already exists with this email");
    }

    // Create user
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      hashedPassword: args.hashedPassword,
      role: args.role,
      createdAt: Date.now(),
    });

    return userId;
  },
});

// Get user by ID
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});
