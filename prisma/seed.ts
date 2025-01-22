import { PrismaClient, AgeGroupType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Delete existing rates
  await prisma.cPFRate.deleteMany();

  // Current CPF Contribution Rates (as of 2024)
  // Source: https://www.cpf.gov.sg/employer/employer-obligations/how-much-cpf-contributions-to-pay
  const rates = [
    // Age ≤ 55 years
    {
      ageGroup: AgeGroupType.BELOW_55,
      employeeRate: 0.2000,    // 20%
      employerRate: 0.1700,    // 17%
      effectiveFrom: new Date('2024-01-01'),
      effectiveTo: null,
      isActive: true
    },

    // Age > 55-60 years
    {
      ageGroup: AgeGroupType.FROM_55_TO_60,
      employeeRate: 0.1300,    // 13%
      employerRate: 0.1300,    // 13%
      effectiveFrom: new Date('2024-01-01'),
      effectiveTo: null,
      isActive: true
    },

    // Age > 60-65 years
    {
      ageGroup: AgeGroupType.FROM_60_TO_65,
      employeeRate: 0.0750,   // 7.5%
      employerRate: 0.0900,   // 9%
      effectiveFrom: new Date('2024-01-01'),
      effectiveTo: null,
      isActive: true
    },

    // Age > 65 years
    {
      ageGroup: AgeGroupType.ABOVE_65,
      employeeRate: 0.0500,    // 5%
      employerRate: 0.0750,    // 7.5%
      effectiveFrom: new Date('2024-01-01'),
      effectiveTo: null,
      isActive: true
    }
  ];

  console.log('Starting to seed CPF rates...');

  for (const rate of rates) {
    const createdRate = await prisma.cPFRate.create({
      data: rate
    });
    console.log(`Created CPF rate for age group ${createdRate.ageGroup}`);
  }

  // Verify the seeded data
  const seededRates = await prisma.cPFRate.findMany();
  console.log(`Successfully seeded ${seededRates.length} CPF rates`);

  // Log the rates for verification
  seededRates.forEach(rate => {
    console.log(`
      Age Group: ${rate.ageGroup}
      Employee Rate: ${rate.employeeRate}
      Employer Rate: ${rate.employerRate}
      Effective From: ${rate.effectiveFrom}
      Is Active: ${rate.isActive}
    `);
  });
}

main()
  .catch((e) => {
    console.error('Error seeding CPF rates:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
