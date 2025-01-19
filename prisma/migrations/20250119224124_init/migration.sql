-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'PAYROLL_ONLY', 'INVITE_SENT');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('CONTRACT', 'FULL_TIME', 'PART_TIME');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeId" TEXT NOT NULL,
    "employeeProfile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "nationality" TEXT NOT NULL,
    "employmentType" "EmploymentType" NOT NULL DEFAULT 'CONTRACT',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
