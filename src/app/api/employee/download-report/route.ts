import { prisma } from "@/lib/prisma"
import * as XLSX from "xlsx";

export async function GET() {
  try {
    // Download report;
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        employeeId: true,
        employeeName: true,
        employeeProfile: true,
        email: true,
        role: true,
        nationality: true,
        employmentType: true,
      }
    })

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(employees);

    const columnWidths = [
      { wch: 10 },
      { wch: 50 },
      { wch: 30 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 }
    ];
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

    const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    return new Response(xlsxData, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename=employees.xlsx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    })
  } catch (err) {
    console.log("Error:", err)
    return Response.json({
      status: false,
      message: "Internal server error"
    }, { status: 500 })
  }
}
