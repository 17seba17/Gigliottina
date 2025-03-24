import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define Story schema
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  content: text("content").notNull(),
  timestamp: integer("timestamp").notNull(),
});

export const insertStorySchema = createInsertSchema(stories).pick({
  username: true,
  content: true,
  timestamp: true,
});

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;
