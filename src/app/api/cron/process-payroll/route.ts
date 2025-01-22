import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PayrollCalculator } from '@/lib/payroll/calculator';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const calculator = new PayrollCalculator();

    // Fetch active employees
    const employees = await prisma.employee.findMany({
      where: {
        status: 'ACTIVE',
      },
    });

    // Process each employee
    const payrollResults = await Promise.all(
      employees?.map(async (emp) => {
        try {
          return await calculator?.calculatePayroll(emp);
        } catch (error) {
          console.error(`Failed to process payroll for employee ${emp.employeeId}:`, error);
          return null;
        }
      })
    );

    // Filter out failed calculations
    const successfulResults = payrollResults?.filter((result): result is PayrollResult =>
      result !== null
    );

    const records = successfulResults.map((item) => ({
      employeeId: item.id,
      grossSalary: new Prisma.Decimal(item.grossSalary),
      cpfEmployee: new Prisma.Decimal(item.cpfEmployee),
      cpfEmployer: new Prisma.Decimal(item.cpfEmployer),
      netSalary: new Prisma.Decimal(item.netSalary),
    }));

    await prisma.payrollRecord.createMany({
      data: records,
      skipDuplicates: true, // Skip duplicates if necessary
    });

    return NextResponse.json({
      success: true,
      processedCount: successfulResults?.length,
      failedCount: payrollResults?.length - successfulResults?.length,
      results: successfulResults
    });
  } catch (error) {
    console.error('Payroll processing failed:', error);
    return NextResponse.json(
      { error: 'Failed to process payroll' },
      { status: 500 }
    );
  }
}
