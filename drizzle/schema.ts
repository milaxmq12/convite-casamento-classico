import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Tabela de confirmações de presença (RSVP)
 * Armazena todas as respostas dos convidados ao convite de casamento.
 */
export const rsvps = mysqlTable("rsvps", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  attendance: mysqlEnum("attendance", ["yes", "no"]).notNull(),
  guests: int("guests").default(1).notNull(),
  dietary: text("dietary"),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Rsvp = typeof rsvps.$inferSelect;
export type InsertRsvp = typeof rsvps.$inferInsert;
