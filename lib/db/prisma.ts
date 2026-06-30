import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

type PrismaGlobal = {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

const globalForPrisma = globalThis as unknown as PrismaGlobal;
const fallbackDatabaseUrl = "postgresql://postgres:postgres@localhost:5432/linguaquest_ai?schema=public";

function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? process.env.DIRECT_URL ?? fallbackDatabaseUrl;
}

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    const pool = globalForPrisma.prismaPool ?? new Pool({ connectionString: getDatabaseUrl() });
    const adapter = new PrismaPg(pool);

    globalForPrisma.prismaPool = pool;
    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
    });
  }

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getPrisma(), prop, receiver);
  }
});
