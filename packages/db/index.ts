import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { Pool } from "pg";
const pool=new Pool(
    {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "mysecretpassword",
  database: "postgres",
}
)

const adapter=new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}


export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({adapter})

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
