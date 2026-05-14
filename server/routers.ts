import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { deleteRsvp, getRsvpStats, insertRsvp, listRsvps } from "./db.js";

const t = initTRPC.create({ transformer: superjson });

export const appRouter = t.router({
  rsvp: t.router({
    /** Envia confirmação de presença (público — qualquer convidado pode usar) */
    submit: t.procedure
      .input(
        z.object({
          name:       z.string().min(2).max(255),
          email:      z.string().email().max(320),
          attendance: z.enum(["yes", "no"]),
          guests:     z.number().int().min(1).max(10).default(1),
          dietary:    z.string().max(500).optional(),
          message:    z.string().max(1000).optional(),
        })
      )
      .mutation(async ({ input }) => {
        await insertRsvp({
          name:       input.name,
          email:      input.email,
          attendance: input.attendance,
          guests:     input.guests,
          dietary:    input.dietary ?? null,
          message:    input.message ?? null,
        });
        return { success: true };
      }),

    /** Lista todos os convidados (público — página admin sem senha) */
    list: t.procedure.query(async () => {
      return listRsvps();
    }),

    /** Estatísticas (público) */
    stats: t.procedure.query(async () => {
      return getRsvpStats();
    }),

    /** Remove um convidado pelo ID (público — admin sem senha) */
    delete: t.procedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        await deleteRsvp(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
