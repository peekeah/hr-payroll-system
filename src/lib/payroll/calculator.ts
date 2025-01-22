import { prisma } from '@/lib/prisma';
import { PayrollResult, AgeGroup } from '@/types/payroll';
import { CPFRatesService } from './cpf-rates';

export class PayrollCalculator {
  private static readonly CONTRIBUTION_CEILING = 6000.00;
  private cpfRatesService: CPFRatesService;

  constructor() {
    this.cpfRatesService = CPFRatesService.getInstance();
  }

  private getAgeGroup(dateOfBirth: Date): AgeGroup {
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    if (age < 55) return AgeGroup.BELOW_55;
    if (age < 60) return AgeGroup.FROM_55_TO_60;
    if (age < 65) return AgeGroup.FROM_60_TO_65;
    return AgeGroup.ABOVE_65;
  }

  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  async calculatePayroll(employee: any): Promise<PayrollResult> {
    const totalWage = Math.min(
      employee.basicSalary + employee.allowances,
      PayrollCalculator.CONTRIBUTION_CEILING
    );

    const ageGroup = this.getAgeGroup(employee.dateOfBirth);
    const cpfRate = await this.cpfRatesService.getRateForAgeGroup(ageGroup);

    if (!cpfRate) {
      throw new Error(`No CPF rates found for age group: ${ageGroup}`);
    }

    const cpfEmployee = this.roundToTwoDecimals(totalWage * cpfRate.employeeRate);
    const cpfEmployer = this.roundToTwoDecimals(totalWage * cpfRate.employerRate);
    const grossSalary = this.roundToTwoDecimals(employee.basicSalary + employee.allowances);
    const netSalary = this.roundToTwoDecimals(grossSalary - cpfEmployee);

    return {
      id: employee.id,
      employeeId: employee.employeeId,
      employeeName: employee.employeeName,
      grossSalary,
      cpfEmployee,
      cpfEmployer,
      netSalary
    };
  }
}
