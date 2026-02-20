import { boolean, integer, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const matches = pgTable("matches", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: timestamp("date").notNull().defaultNow(),
  opponent: text("opponent").notNull(),
  location: text("location"),
  status: text("status", { enum: ["scheduled", "in_progress", "completed"] }).notNull().default("scheduled"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchId: uuid("match_id").references(() => matches.id, { onDelete: 'cascade' }).notNull(),
  url: text("url").notNull(), // Change to URL (e.g., Google Drive)
  title: text("title"),
  status: text("status", { enum: ["pending", "processed", "error"] }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sets = pgTable("sets", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchId: uuid("match_id").references(() => matches.id, { onDelete: 'cascade' }).notNull(),
  setNumber: integer("set_number").notNull(),
  scoreTeam: integer("score_team").notNull().default(0),
  scoreOpponent: integer("score_opponent").notNull().default(0),
  isFinished: boolean("is_finished").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const gameEvents = pgTable("game_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchId: uuid("match_id").references(() => matches.id, { onDelete: 'cascade' }).notNull(),
  setId: uuid("set_id").references(() => sets.id, { onDelete: 'cascade' }),
  videoId: uuid("video_id").references(() => videos.id, { onDelete: 'set null' }),

  // Temporal Sync
  videoTimestamp: real("video_timestamp"), // Time in seconds in the video

  // Event Details
  actionType: text("action_type", {
    enum: ["serve", "reception", "set", "attack", "block", "dig", "freeball"]
  }),
  evaluation: text("evaluation", { enum: ["#", "+", "!", "-", "/", "="] }), // Standard Volley Scout Ratings
  playerId: text("player_id"), // Can be a string ID for now, later a separate players table

  // Spatial Data (Heuristics/CV Output)
  startX: real("start_x"),
  startY: real("start_y"),
  endX: real("end_x"),
  endY: real("end_y"),

  // AI Confidence & Review Process
  aiConfidence: real("ai_confidence"), // 0.0 to 1.0
  reviewStatus: text("review_status", { enum: ["pending", "confirmed", "user_created"] }).notNull().default("pending"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});
