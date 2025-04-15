import {
  pgTable,
  serial,
  varchar,
  text,
  pgEnum,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

// ENUMs
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const planEnum = pgEnum("plan", ["basic", "premium"]);
export const voteTypeEnum = pgEnum("vote_type", ["upvote", "downvote"]);

// Reusable timestamps
const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();

const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

// Users table definition
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_user_id").notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: roleEnum("role").notNull().default("user"),
  plan: planEnum("plan").notNull().default("basic"),
  createdAt,
  updatedAt,
});

// Tags table definition
export const tagsTable = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
  createdAt,
  updatedAt,
});

// Questions table definition
export const questionsTable = pgTable("questions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

// Question-Tags junction table (many-to-many)
export const questionTagsTable = pgTable("question_tags", {
  questionId: integer("question_id")
    .notNull()
    .references(() => questionsTable.id, { onDelete: "cascade" }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tagsTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

// Answers table definition
export const answersTable = pgTable("answers", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  questionId: integer("question_id")
    .notNull()
    .references(() => questionsTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  isAiGenerated: boolean("is_ai_generated").notNull().default(false),
  score: integer("score").notNull().default(0),
  createdAt,
  updatedAt,
});

// Feedback table definition
export const feedbackTable = pgTable("feedback", {
  id: serial("id").primaryKey(),
  answerId: integer("answer_id")
    .notNull()
    .references(() => answersTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  voteType: voteTypeEnum("vote_type"),
  comment: text("comment"),
  createdAt,
  updatedAt,
});
