const { z } = require("zod");

// Define validation schemas
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required and cannot be empty"),
});

const typeSchema = z.object({
  name: z.string().min(1, "Type name is required and cannot be empty"),
});

const channelSchema = z.object({
  name: z.string().min(1, "Channel name is required and cannot be empty"),
});

const movieSchema = z.object({
  title: z.string().min(1, "Title is required and cannot be empty"),
  duration: z.number().int().positive("Duration must be a positive integer"),
  videoUrl: z.string().url("Invalid URL format"),
  channelId: z.number().int().positive("Channel ID must be a positive integer"),
  typeId: z.number().int().positive("Type ID must be a positive integer"),
  categoryId: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
});

const userSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const favoriteSchema = z.object({
  userId: z.number(),
  movieId: z.number(),
});

const watchLaterSchema = z.object({
  userId: z.number(),
  movieId: z.number(),
});

module.exports = { categorySchema, typeSchema, channelSchema, movieSchema,userSchema, loginSchema, favoriteSchema, watchLaterSchema };
