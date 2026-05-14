/**
 * Testes das procedures tRPC de RSVP
 * Usa mocks para isolar o banco de dados.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";

// Mock do módulo db.ts
vi.mock("./db.js", () => ({
  insertRsvp: vi.fn().mockResolvedValue(undefined),
  listRsvps: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@example.com",
      attendance: "yes",
      guests: 2,
      dietary: null,
      message: "Mal posso esperar!",
      createdAt: new Date("2025-08-01T10:00:00Z"),
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@example.com",
      attendance: "no",
      guests: 1,
      dietary: null,
      message: null,
      createdAt: new Date("2025-08-02T10:00:00Z"),
    },
  ]),
  deleteRsvp: vi.fn().mockResolvedValue(undefined),
  getRsvpStats: vi.fn().mockResolvedValue({
    total: 2,
    confirmed: 1,
    declined: 1,
    totalGuests: 2,
  }),
}));

const caller = appRouter.createCaller({});

describe("rsvp.submit", () => {
  it("deve aceitar confirmação válida com presença confirmada", async () => {
    const result = await caller.rsvp.submit({
      name: "Ana Costa",
      email: "ana@example.com",
      attendance: "yes",
      guests: 2,
      dietary: "Vegetariana",
      message: "Que alegria!",
    });
    expect(result).toEqual({ success: true });
  });

  it("deve aceitar confirmação válida com presença recusada", async () => {
    const result = await caller.rsvp.submit({
      name: "Carlos Lima",
      email: "carlos@example.com",
      attendance: "no",
      guests: 1,
    });
    expect(result).toEqual({ success: true });
  });

  it("deve rejeitar nome muito curto", async () => {
    await expect(
      caller.rsvp.submit({
        name: "A",
        email: "a@example.com",
        attendance: "yes",
        guests: 1,
      })
    ).rejects.toThrow();
  });

  it("deve rejeitar email inválido", async () => {
    await expect(
      caller.rsvp.submit({
        name: "Nome Válido",
        email: "email-invalido",
        attendance: "yes",
        guests: 1,
      })
    ).rejects.toThrow();
  });

  it("deve rejeitar número de convidados fora do intervalo", async () => {
    await expect(
      caller.rsvp.submit({
        name: "Nome Válido",
        email: "valido@example.com",
        attendance: "yes",
        guests: 15, // máximo é 10
      })
    ).rejects.toThrow();
  });
});

describe("rsvp.list", () => {
  it("deve retornar lista de convidados", async () => {
    const result = await caller.rsvp.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ name: "Maria Silva", attendance: "yes" });
  });
});

describe("rsvp.stats", () => {
  it("deve retornar estatísticas corretas", async () => {
    const stats = await caller.rsvp.stats();
    expect(stats.total).toBe(2);
    expect(stats.confirmed).toBe(1);
    expect(stats.declined).toBe(1);
    expect(stats.totalGuests).toBe(2);
  });
});

describe("rsvp.delete", () => {
  it("deve deletar convidado pelo ID", async () => {
    const result = await caller.rsvp.delete({ id: 1 });
    expect(result).toEqual({ success: true });
  });

  it("deve rejeitar ID inválido (não inteiro)", async () => {
    await expect(
      caller.rsvp.delete({ id: 1.5 })
    ).rejects.toThrow();
  });
});
