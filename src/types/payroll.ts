export enum AgeGroup {
  BELOW_55 = 'BELOW_55',
  FROM_55_TO_60 = 'FROM_55_TO_60',
  FROM_60_TO_65 = 'FROM_60_TO_65',
  ABOVE_65 = 'ABOVE_65'
}

export interface CPFRateConfig {
  ageGroup: AgeGroup;
  employeeRate: number;
  employerRate: number;
}

export interface PayrollResult {
  id: number;
  employeeId: string;
  employeeName: string;
  grossSalary: number;
  cpfEmployee: number;
  cpfEmployer: number;
  netSalary: number;
}
