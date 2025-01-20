import { prisma } from "@/lib/prisma"

export async function GET() {
  const employees = await prisma.employee.findMany();
  return new Response(JSON.stringify({
    status: true,
    data: employees
  }))
}
