/*
  Warnings:

  - Added the required column `dateOfBirth` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residencyStatus` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AgeGroupType" AS ENUM ('BELOW_55', 'FROM_55_TO_60', 'FROM_60_TO_65', 'ABOVE_65');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "allowances" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "basicSalary" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "residencyStatus" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PayrollRecord" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" INTEGER NOT NULL,
    "grossSalary" DECIMAL(65,30) NOT NULL,
    "cpfEmployee" DECIMAL(65,30) NOT NULL,
    "cpfEmployer" DECIMAL(65,30) NOT NULL,
    "netSalary" DECIMAL(65,30) NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayrollRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayrollRecord" ADD CONSTRAINT "PayrollRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
