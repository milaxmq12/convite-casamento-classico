import { drizzle } from "drizzle-orm/mysql2";
import { desc, eq } from "drizzle-orm";
import { InsertRsvp, rsvps } from "../drizzle/schema.js";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/** Insere uma nova confirmação de presença */
export async function insertRsvp(data: InsertRsvp) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(rsvps).values(data);
}

/** Lista todas as confirmações, da mais recente para a mais antiga */
export async function listRsvps() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(rsvps).orderBy(desc(rsvps.createdAt));
}

/** Remove uma confirmação pelo ID */
export async function deleteRsvp(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(rsvps).where(eq(rsvps.id, id));
}

/** Estatísticas rápidas */
export async function getRsvpStats() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const all = await db.select().from(rsvps);
  const confirmed = all.filter((r) => r.attendance === "yes");
  const declined  = all.filter((r) => r.attendance === "no");
  const totalGuests = confirmed.reduce((sum, r) => sum + (r.guests ?? 1), 0);
  return {
    total:       all.length,
    confirmed:   confirmed.length,
    declined:    declined.length,
    totalGuests,
  };
}
