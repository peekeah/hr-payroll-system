import { prisma } from "@/lib/prisma"
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        employeeId: true,
        employeeName: true,
        employeeProfile: true,
        email: true,
        role: true,
        status: true,
        nationality: true,
        employmentType: true,
        dateOfBirth: true,
        basicSalary: true,
        allowances: true,
        residencyStatus: true
      }
    })

    const formattedEmployees = employees.map(emp => ({
      ...emp,
      dateOfBirth: emp.dateOfBirth ?
        new Date(emp.dateOfBirth).toLocaleString().split(",")[0] : null,
      basicSalary: emp.basicSalary.toString(),
      allowances: emp.allowances.toString(),
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedEmployees, {
      dateNF: 'mm/dd/yyyy',
      cellDates: true,
    });
    const columnWidths = [
      { wch: 10 },  // employeeId
      { wch: 50 },  // employeeName
      { wch: 30 },  // employeeProfile
      { wch: 15 },  // role
      { wch: 30 },  // email
      { wch: 15 },  // status
      { wch: 15 },  // nationality
      { wch: 15 },  // employmentType
      { wch: 15 },  // dateOfBirth
      { wch: 15 },  // basicSalary
      { wch: 15 },  // allowances
      { wch: 15 }   // residencyStatus
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
