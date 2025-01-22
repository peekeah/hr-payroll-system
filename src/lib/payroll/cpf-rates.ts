import { prisma } from '@/lib/prisma';
import { CPFRateConfig, AgeGroup } from '@/types/payroll';

export class CPFRatesService {
  private static instance: CPFRatesService;
  private rates: CPFRateConfig[] | null = null;
  private lastFetch: Date | null = null;
  private static CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  private constructor() { }

  static getInstance(): CPFRatesService {
    if (!CPFRatesService.instance) {
      CPFRatesService.instance = new CPFRatesService();
    }
    return CPFRatesService.instance;
  }

  private async fetchRates(): Promise<CPFRateConfig[]> {
    const currentDate = new Date();

    const dbRates = await prisma.cPFRate.findMany({
      where: {
        isActive: true,
        effectiveFrom: {
          lte: currentDate,
        },
        OR: [
          {
            effectiveTo: null,
          },
          {
            effectiveTo: {
              gte: currentDate,
            },
          },
        ],
      },
      orderBy: {
        effectiveFrom: 'desc',
      },
    });

    return dbRates.map(rate => ({
      ageGroup: rate.ageGroup as AgeGroup,
      employeeRate: Number(rate.employeeRate),
      employerRate: Number(rate.employerRate),
    }));
  }

  async getRates(): Promise<CPFRateConfig[]> {
    const now = new Date();

    // Fetch new rates if cache is expired or empty
    if (!this.rates || !this.lastFetch ||
      (now.getTime() - this.lastFetch.getTime() > CPFRatesService.CACHE_DURATION)) {
      this.rates = await this.fetchRates();
      this.lastFetch = now;
    }

    return this.rates;
  }

  async getRateForAgeGroup(ageGroup: AgeGroup): Promise<CPFRateConfig | null> {
    const rates = await this.getRates();
    return rates.find(rate => rate.ageGroup === ageGroup) || null;
  }
}
