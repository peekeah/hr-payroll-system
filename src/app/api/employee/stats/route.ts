import { prisma } from "@/lib/prisma"

export async function GET() {
  try {

    const employees = await prisma.employee.findMany();

    const employmentType: Record<string, number> = {};
    const status: Record<string, number> = {};
    const nationality: Record<string, number> = {};

    employees.forEach(employee => {

      // Update employmentType count
      employmentType[employee["employmentType"]] = employmentType[employee["employmentType"]] ? employmentType[employee["employmentType"]] + 1 : 1;

      // Update status count
      status[employee["status"]] = status[employee["status"]] ? status[employee["status"]] + 1 : 1;

      // Update nationality count
      if (employee.nationality === "Singaporean") {
        nationality["singaporean"] = nationality["singaporean"] ? nationality["singaporean"] + 1 : 1;
      } else {
        nationality["foreigners"] = nationality["foreigners"] ? nationality["foreigners"] + 1 : 1;
      }
    })

    // #NOTE: Hardcoded values, need to update later
    nationality["PR"] = 5;
    nationality["Others"] = 10;

    return Response.json({
      status: true,
      data: {
        nationality,
        employmentType,
        status,
        totalCount: employees.length
      }
    });
  } catch (err) {
    return Response.json({
      status: false,
      message: "Internal server error"
    }, { status: 500 });
  }
}
