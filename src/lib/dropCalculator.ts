import { specialDrops } from '../data/specialDropData';
import { CoreModule, goldenTimeDuration, goldenTimeUptime } from './coreModules';
import { oreSpawnChance, chanceIncreasePerLevel } from './oreProbability';

export type CalculatorInput = { level: number; hours: number; minutes: number; speed: number; module: CoreModule; goldenRequirementsMet: boolean };
export type Calculation = { oreChance: number; blocks: number; expected: Record<string, number>; total: number; chanceIncrease: number; goldenDuration: number; goldenUptime: number };

export function calculate(input: CalculatorInput): Calculation {
  const hours = Math.max(0, input.hours) + Math.max(0, input.minutes) / 60;
  const blocks = Math.max(0, input.speed) * hours;
  const oreChance = oreSpawnChance(input.level) / 100;
  const multiplier = input.module === 'pumpkin' ? 1.25 : 1;
  const duration = input.module === 'golden' && input.goldenRequirementsMet ? goldenTimeDuration(input.level) : 0;
  const uptime = duration > 0 ? goldenTimeUptime(input.level) : 0;
  const expected: Record<string, number> = {};
  for (const drop of specialDrops) {
    // Per-ore spawn shares are not available, so these are not computable from total ore chance.
    // Golden Time contributes its known gold-generator uptime to Gold Ore opportunity only.
    const goldOpportunity = drop.key === 'graphene' ? uptime : 0;
    const effectiveOreChance = drop.key === 'graphene' ? Math.min(1, oreChance + (1 - oreChance) * goldOpportunity) : oreChance;
    expected[drop.key] = blocks * effectiveOreChance * drop.chance / 100 * multiplier;
  }
  const total = Object.values(expected).reduce((sum, value) => sum + value, 0);
  return { oreChance, blocks, expected, total, chanceIncrease: chanceIncreasePerLevel(input.level), goldenDuration: duration, goldenUptime: uptime };
}
