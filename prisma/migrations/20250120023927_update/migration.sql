/*
  Warnings:

  - Added the required column `employeeName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "employeeName" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
